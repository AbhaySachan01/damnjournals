import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import crypto from 'crypto';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/sendEmail.js';
// --- DYNAMIC HELPER: Detects Local vs Production ---
const getCookieOptions = (req) => {
    const host = req.get('host');
    const isLocal = host.includes('localhost');

    const options = {
        httpOnly: true,
        path: '/',
        // Localhost par Secure hamesha FALSE, Production (HTTPS) par TRUE
        secure: !isLocal, 
        // Localhost par 'Lax', Production par 'None' (Cross-site cookies ke liye)
        sameSite: isLocal ? 'lax' : 'none',
    };

    // Agar website (.shop) par ho, toh domain set karna zaroori hai
    if (!isLocal && host.includes('damnjournals.shop')) {
        options.domain = '.damnjournals.shop';
    }

    return options;
};

// --- LOGOUT (The Cookie Killer) ---
export const logoutUser = (req, res) => {
    const host = req.get('host') || '';
    const isLocal = host.includes('localhost') || host.includes('127.0.0.1');

    const baseOptions = {
        httpOnly: true,
        path: '/',
        secure: !isLocal, 
        sameSite: isLocal ? 'lax' : 'none',
    };

    // 1. Normal Clear (Jo tu pehle kar raha tha)
    res.clearCookie('jwt', baseOptions);

    // 2. Manual Overwrite (Expiry ko past date me bhej do aur maxAge 0 kar do)
    res.cookie('jwt', '', {
        ...baseOptions,
        maxAge: 0,
        expires: new Date(0) // 1 Jan 1970
    });

    // 3. Localhost Specific Clear (Kabhi kabhi browser domain ko explicitly 'localhost' save kar leta hai)
    if (isLocal) {
        res.clearCookie('jwt', { ...baseOptions, domain: 'localhost' });
        res.clearCookie('jwt', { ...baseOptions, domain: '127.0.0.1' });
    } else if (host.includes('damnjournals.shop')) {
        // Production ke liye
        res.clearCookie('jwt', { ...baseOptions, domain: '.damnjournals.shop' });
    }

    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// --- LOGIN (Same Options Use Karo) ---
// Standard Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. User ko email se find karo
        const user = await User.findOne({ email });

        // 2. Check karo user exist karta hai aur password match hota hai ya nahi
        if (user && (await user.matchPassword(password))) {
            
            // 3. Email verification check
            if (!user.isVerified) {
                return res.status(401).json({ message: 'Please verify your email first' });
            }
            
            // 4. Token generate karo
            const token = generateToken(user._id);
            
            // 5. Naye cookie options use karo jo humne banaye the
            const options = getCookieOptions(req);

            res.cookie('jwt', token, {
                ...options,
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
            });

            // 6. JSON send karo (Yahi tera frontend expect kar raha hai)
            res.json({ 
                _id: user._id, 
                name: user.name, 
                email: user.email, 
                isAdmin: user.isAdmin 
            }); 
            
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("Login Error: ", error); // Console me error print karo debugging ke liye
        res.status(500).json({ message: error.message });
    }
};
// 1. Standard Signup
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            if (user.isVerified) {
                return res.status(400).json({ message: 'User already exists. Please log in.' });
            } 
            const newVerificationToken = crypto.randomBytes(20).toString('hex');
            user.name = name;
            user.password = password; 
            user.verificationToken = newVerificationToken;
            await user.save(); 

            await sendVerificationEmail(user.email, newVerificationToken).catch(console.error);
            res.status(200).json({ message: 'Verification link sent to your email.' });
            return;
        }

        const verificationToken = crypto.randomBytes(20).toString('hex');
        user = await User.create({ name, email, password, verificationToken });

        
        await sendVerificationEmail(user.email, verificationToken).catch(console.error);
        res.status(201).json({ message: 'Signup successful. Please verify your email.' });
    } catch (error) {
        if (!res.headersSent) res.status(500).json({ message: error.message });
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

        res.status(200).json({ message: 'Email verified! You can now log in.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Standard Login
// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });

//         if (user && (await user.matchPassword(password))) {
//             if (!user.isVerified) return res.status(401).json({ message: 'Please verify your email first' });
            
//             const token = generateToken(user._id);
//             res.cookie('jwt', token, {
//                 ...getCookieOptions(req),
//                 maxAge: 30 * 24 * 60 * 60 * 1000
//             });

//             res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }); 
//         } else {
//             res.status(401).json({ message: 'Invalid email or password' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// 4. Google Authentication
export const googleAuth = async (req, res) => {
    try {
        const { name, email, image } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name, email, image,
                password: crypto.randomBytes(10).toString('hex'),
                isVerified: true
            });
        }

        const token = generateToken(user._id);
        res.cookie('jwt', token, {
            ...getCookieOptions(req),
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ _id: user._id, name: user.name, email: user.email, image: user.image, isAdmin: user.isAdmin });
    } catch (error) {
        res.status(500).json({ message: "Google Auth Failed" });
    }
};

// 5. Logout (CLEARS COOKIE FROM ALL DOMAINS)
// export const logoutUser = (req, res) => {
//     const options = getCookieOptions(req);
    
//     // Clear cookie with exact same options as login
//     res.clearCookie('jwt', options);

//     // Manual overwrite for deep cleaning
//     res.cookie('jwt', '', {
//         ...options,
//         expires: new Date(0),
//     });

//     res.status(200).json({ success: true, message: 'Logged out successfully' });
// };

// 6. Get Current User (Refresh Check)
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 7. Update Profile
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = req.body.password; 
            }

            const updatedUser = await user.save();

            // Refresh token and cookie so session stays alive
            const token = generateToken(updatedUser._id);
            res.cookie('jwt', token, {
                ...getCookieOptions(req),
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 8. Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; 

        await user.save();
        await sendPasswordResetEmail(user.email, resetToken);
        res.status(200).json({ message: 'Reset link sent!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 9. Reset Password
export const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        // Auto-login after password reset
        const token = generateToken(user._id);
        res.cookie('jwt', token, {
            ...getCookieOptions(req),
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: 'Password reset successful!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};