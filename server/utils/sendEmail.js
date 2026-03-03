import nodemailer from 'nodemailer';

// Email function
export const sendVerificationEmail = async (email, token) => {
  // 1. TRANSPORTER KO FUNCTION KE ANDAR BANAO (Fresh Connection Logic)
  // Isse Vercel/Serverless par delay nahi hoga
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;

  const mailOptions = {
    from: `"Damn Journals" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your Damn Journals Account",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #2F4F4F;">Welcome to the Club!</h2>
        <p>Apna email verify karne ke liye niche click karein:</p>
        <a href="${verifyUrl}" style="background: #DAA520; color: white; padding: 12px 25px; text-decoration: none; display: inline-block; font-weight: bold; border-radius: 4px;">Verify Email</a>
      </div>
    `,
  };

  try {
    // Await lagana zaroori hai
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Verification Email sent instantly to:", email);
    return info;
  } catch (error) {
    console.error("❌ Verification Email Failed:", error);
    throw error;
  }
};

// Password Reset ke liye bhi same pattern use karein (Transporter andar)
export const sendPasswordResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

  const mailOptions = {
    from: `"Damn Journals" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Request",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #2F4F4F;">Password Reset</h2>
        <p>Click below to reset password:</p>
        <a href="${resetUrl}" style="background: #2F4F4F; color: white; padding: 12px 25px; text-decoration: none; display: inline-block; font-weight: bold; border-radius: 4px;">Reset Password</a>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Password Reset email sent to:", email);
    return info;
  } catch (error) {
    console.error("❌ Password Reset Email Failed:", error);
    throw new Error("Email sending failed");
  }
};