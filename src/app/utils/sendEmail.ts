import nodemailer from 'nodemailer';
import config from '../config';

const generateResetPasswordEmail = (token: string): string => `
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
    <div style="text-align: center;">
      <h2 style="color: #333333;">Reset Your Password</h2>
      <p style="font-size: 16px; color: #666666;">You have requested to reset your password. Use the verification code below to proceed.</p>
    </div>
    <div style="text-align: center; margin: 20px 0;">
      <div style="display: inline-block; padding: 15px; background-color: #1ABC9C; color: #ffffff; font-size: 24px; border-radius: 8px;">
        ${token}
      </div>
    </div>
    <div style="text-align: center;">
      <p style="font-size: 14px; color: #999999;">This code will expire in 10 minutes.</p>
    </div>
    <hr style="border: none; border-top: 1px solid #dddddd; margin: 20px 0;">
    <div style="text-align: center;">
      <p style="font-size: 12px; color: #999999;">If you didn’t request a password reset, you can ignore this email.</p>
    </div>
  </div>
`;

export const sendEmail = async (to: string, token: string) => {
    const emailHtml = generateResetPasswordEmail(token);
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: config.node_env === 'production', // Use true if you're using port 465
        auth: {
            user: 'tanviremon726@gmail.com', // Your Gmail email
            pass: 'oyuv cbeh hxin maha', // Use the generated App Password here
        },
    });

    try {
        const info = await transporter.sendMail({
            from: 'tanviremon726@gmail.com', // sender address
            to, // list of receivers
            subject: 'Verification Code', // Subject line
            text: '', // plain text body
            html: emailHtml, // html body (your token as an HTML string)
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};
