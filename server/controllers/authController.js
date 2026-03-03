import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import crypto from 'crypto';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/sendEmail.js';

// 1. Standard Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    // Agar user database me hai
    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ message: 'User already exists. Please log in.' });
      } 
      
      // Case B: Unverified User
      const newVerificationToken = crypto.randomBytes(20).toString('hex');
      user.name = name;
      user.password = password; 
      user.verificationToken = newVerificationToken;
      await user.save(); 

      // ⚡ FAST MOVE: Response pehle bhej do
      res.status(200).json({ 
        message: 'Account exists but was unverified. A NEW verification link is being sent.' 
      });

      // 📧 BACKGROUND MOVE: await hata diya
      sendVerificationEmail(user.email, newVerificationToken)
        .catch(err => console.error("Background Email Error (Case B):", err));
      
      return; // Function yahan khatam
    }

    // Case C: Bilkul Naya User
    const verificationToken = crypto.randomBytes(20).toString('hex');
    user = await User.create({ name, email, password, verificationToken });

    // ⚡ FAST MOVE: Response turant
    res.status(201).json({ 
      message: 'Signup successful. Please check your email to verify your account.' 
    });

    // 📧 BACKGROUND MOVE: Bina intezaar kiye mail fire karo
    sendVerificationEmail(user.email, verificationToken)
      .catch(err => console.error("Background Email Error (Case C):", err));

  } catch (error) {
    // Agar response abhi tak nahi gaya hai tabhi error bhejien
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
};

// 2. Verify Email
export const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully! You can now log in.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Standard Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (!user.isVerified) return res.status(401).json({ message: 'Please verify your email first' });
      
      const token = generateToken(user._id);

      // TOKEN KO COOKIE MEIN SET KAREIN
      res.cookie('jwt', token, {
        httpOnly: true,    // Security ke liye zaroori hai
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',         // Taaki poori site pe cookie accessible ho
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 din
        });

      // Ab response mein token bhejne ki zaroorat nahi
      res.json({ _id: user._id, name: user.name, email: user.email }); 
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ek Naya Logout function bhi add kar lein:
export const logout = (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully' });
};

// 4. Google Authentication
export const googleAuth = async (req, res) => {
  try {
    const { name, email, image } = req.body;

    // 1. Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // 2. Create new user if not found
      user = await User.create({
        name,
        email,
        image,
        password: Math.random().toString(36).slice(-8), // Dummy password for Google users
        isVerified: true
      });
    }

    // 3. Generate Token
    const token = generateToken(user._id);

    // 4. Set Cookie (Sabse important)
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,      // Local par shayad ye kaam na kare, lekin Vercel par iske bina login nahi hoga
      sameSite: 'none',  // Cross-site cookie ke liye mandatory hai
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Server error during Google Login" });
  }
};

// 5. Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 mins

    await user.save();
    await sendPasswordResetEmail(user.email, resetToken);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Reset Password
export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    // req.user humare 'protect' middleware se aata hai
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    // req.user._id authMiddleware se milega
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password; 
        // Note: Agar aapne User model mein pre('save') lagaya hai toh bcrypt se auto-hash ho jayega
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        // Yahan token dobara bhejna zaroori hai taaki session valid rahe
        token: generateToken(updatedUser._id), 
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};