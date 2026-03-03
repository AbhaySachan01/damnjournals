

import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, token) => {
  // 1. Pehle spaces saaf karo (19 chars se wapas 16 kar do)
  const cleanPass = process.env.EMAIL_PASS;
  const userEmail = process.env.EMAIL_USER;

  console.log("DEBUG: Creating transporter with:", userEmail);

  // 2. Transporter ko FUNCTION KE ANDAR create karo
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: userEmail,
      pass: cleanPass, 
    },
  });

  const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;

  const mailOptions = {
    from: `"Damn Journals" <${userEmail}>`,
    to: email,
    subject: "Verify your Damn Journals Account",
    html: `<h3>Welcome to the Club!</h3><p>Click here: <a href="${verifyUrl}">${verifyUrl}</a></p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    return info;
  } catch (error) {
    console.error("Nodemailer Error inside function:", error);
    throw error;
  }
};

// 2. Password Reset Email
export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

  const mailOptions = {
    from: `"Damn Journals" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Request",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #2F4F4F;">Password Reset</h2>
        <p>Kya aap apna password bhool gaye? Koi baat nahi, niche click karke naya password banayein:</p>
        <a href="${resetUrl}" style="background: #2F4F4F; color: white; padding: 12px 25px; text-decoration: none; display: inline-block; font-weight: bold; border-radius: 4px;">Reset Password</a>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">Ye link sirf 15 minute tak valid hai.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reset email sent to:", email);
  } catch (error) {
    console.error("Nodemailer Error:", error);
    throw new Error("Email sending failed");
  }
};