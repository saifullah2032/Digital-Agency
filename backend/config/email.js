const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  // For development, use Gmail SMTP (you'll need to configure this)
  // For production, use a service like SendGrid, AWS SES, etc.
  
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Use App Password for Gmail
      },
    });
  }
  
  // Ethereal email for testing (fake SMTP service)
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || 'test@example.com',
      pass: process.env.EMAIL_PASSWORD || 'test123',
    },
  });
};

// Send email function
const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Digital Agency'}" <${process.env.EMAIL_FROM || 'noreply@digitalagency.com'}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    
    // For testing with Ethereal, get preview URL
    if (process.env.NODE_ENV === 'development') {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Email templates
const emailTemplates = {
  // Welcome email when client first signs up
  welcome: (clientName) => ({
    subject: 'Welcome to Digital Agency!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1E40AF 0%, #EA580C 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #1E40AF; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Digital Agency!</h1>
          </div>
          <div class="content">
            <p>Hi ${clientName},</p>
            <p>Thank you for choosing Digital Agency for your project needs. We're excited to work with you!</p>
            <p>Your client dashboard is now ready. You can:</p>
            <ul>
              <li>Track your project progress in real-time</li>
              <li>Communicate directly with our team</li>
              <li>Share and download files</li>
              <li>View project milestones and updates</li>
            </ul>
            <p style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/client-dashboard" class="button">Go to Dashboard</a>
            </p>
            <p>If you have any questions, feel free to reach out to us anytime.</p>
            <p>Best regards,<br>The Digital Agency Team</p>
          </div>
          <div class="footer">
            <p>© 2024 Digital Agency. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Hi ${clientName},\n\nWelcome to Digital Agency! Your client dashboard is ready. Visit ${process.env.FRONTEND_URL || 'http://localhost:5173'}/client-dashboard to get started.\n\nBest regards,\nThe Digital Agency Team`,
  }),

  // New message notification
  newMessage: (clientName, subject, sender) => ({
    subject: `New Message: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1E40AF; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #EA580C; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .message-box { background: white; padding: 15px; border-left: 4px solid #1E40AF; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📬 New Message</h2>
          </div>
          <div class="content">
            <p>Hi ${clientName},</p>
            <p>You have a new message from <strong>${sender}</strong>:</p>
            <div class="message-box">
              <strong>Subject:</strong> ${subject}
            </div>
            <p style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/client-dashboard" class="button">View Message</a>
            </p>
            <p>Best regards,<br>The Digital Agency Team</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Hi ${clientName},\n\nYou have a new message from ${sender}.\nSubject: ${subject}\n\nView it at: ${process.env.FRONTEND_URL || 'http://localhost:5173'}/client-dashboard\n\nBest regards,\nThe Digital Agency Team`,
  }),

  // Project update notification
  projectUpdate: (clientName, projectTitle, updateMessage) => ({
    subject: `Project Update: ${projectTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #EA580C; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #1E40AF; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .update-box { background: white; padding: 15px; border-left: 4px solid #EA580C; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🚀 Project Update</h2>
          </div>
          <div class="content">
            <p>Hi ${clientName},</p>
            <p>There's an update on your project: <strong>${projectTitle}</strong></p>
            <div class="update-box">
              ${updateMessage}
            </div>
            <p style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/client-dashboard" class="button">View Project Details</a>
            </p>
            <p>Best regards,<br>The Digital Agency Team</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Hi ${clientName},\n\nProject Update: ${projectTitle}\n\n${updateMessage}\n\nView details at: ${process.env.FRONTEND_URL || 'http://localhost:5173'}/client-dashboard\n\nBest regards,\nThe Digital Agency Team`,
  }),

  // File uploaded notification
  fileUploaded: (clientName, fileName, uploadedBy) => ({
    subject: `New File Uploaded: ${fileName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1E40AF; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #EA580C; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📁 New File Uploaded</h2>
          </div>
          <div class="content">
            <p>Hi ${clientName},</p>
            <p><strong>${uploadedBy}</strong> has uploaded a new file:</p>
            <p><strong>File:</strong> ${fileName}</p>
            <p style="text-align: center;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/client-dashboard" class="button">Download File</a>
            </p>
            <p>Best regards,<br>The Digital Agency Team</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Hi ${clientName},\n\n${uploadedBy} has uploaded a new file: ${fileName}\n\nDownload it at: ${process.env.FRONTEND_URL || 'http://localhost:5173'}/client-dashboard\n\nBest regards,\nThe Digital Agency Team`,
  }),
};

module.exports = {
  sendEmail,
  emailTemplates,
};
