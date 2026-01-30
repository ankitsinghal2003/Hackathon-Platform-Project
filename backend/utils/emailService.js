const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `${process.env.EMAIL_FROM || 'HackFlow 2025'} <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html || options.message,
      text: options.text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Email error:', error);
    throw new Error('Email could not be sent');
  }
};

// Welcome email
exports.sendWelcomeEmail = async (user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #6366f1;">Welcome to HackFlow 2025! 🚀</h1>
      <p>Hi ${user.firstName},</p>
      <p>Welcome to <strong>HackFlow 2025 - Where Innovation Meets Intelligence</strong>!</p>
      <p>Your account has been successfully created. You're now ready to:</p>
      <ul>
        <li>Create or join a team</li>
        <li>Choose your category</li>
        <li>Submit your project</li>
        <li>Compete for amazing prizes</li>
      </ul>
      <p><strong>Hackathon Details:</strong></p>
      <ul>
        <li>📅 Duration: 72 hours (March 1-3, 2025)</li>
        <li>🏆 Total Prize Pool: $21,000</li>
        <li>🎯 5 Categories to choose from</li>
      </ul>
      <p>Get started by logging in and exploring the platform!</p>
      <a href="${process.env.CLIENT_URL}/login" style="display: inline-block; padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">Login to Dashboard</a>
      <p>Good luck and happy hacking! 💻✨</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px;">
        <strong>Team HackFlow</strong><br>
        Need help? Contact us at ${process.env.EMAIL_USER}
      </p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: 'Welcome to HackFlow 2025! 🚀',
    html
  });
};

// Team invitation email
exports.sendTeamInviteEmail = async (user, team, inviteCode) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #6366f1;">Team Invitation 🎯</h1>
      <p>Hi ${user.firstName},</p>
      <p>You've been invited to join team <strong>${team.name}</strong>!</p>
      <p><strong>Invite Code:</strong> <code style="background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 18px;">${inviteCode}</code></p>
      <p>Use this code to join the team on the platform.</p>
      <a href="${process.env.CLIENT_URL}/teams/join" style="display: inline-block; padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">Join Team</a>
      <p>Good luck! 🚀</p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: `Invitation to join ${team.name}`,
    html
  });
};

// Submission confirmation email
exports.sendSubmissionConfirmationEmail = async (user, project, team) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #10b981;">Submission Received! ✅</h1>
      <p>Hi ${user.firstName},</p>
      <p>Your project <strong>"${project.title}"</strong> has been successfully submitted!</p>
      <p><strong>Team:</strong> ${team.name}</p>
      <p><strong>Category:</strong> ${project.category?.name || 'N/A'}</p>
      <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
      <p>Your project is now under review by our judges. You can track the status from your dashboard.</p>
      <a href="${process.env.CLIENT_URL}/dashboard" style="display: inline-block; padding: 12px 24px; background-color: #10b981; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">View Dashboard</a>
      <p>Best of luck! 🍀</p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: `Project Submission Confirmed - ${project.title}`,
    html
  });
};

// Evaluation completed email
exports.sendEvaluationCompletedEmail = async (user, project, score) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #6366f1;">Evaluation Update 📊</h1>
      <p>Hi ${user.firstName},</p>
      <p>Your project <strong>"${project.title}"</strong> has been evaluated!</p>
      <p><strong>Current Average Score:</strong> ${score.toFixed(2)}/100</p>
      <p>Check your dashboard for detailed feedback from judges.</p>
      <a href="${process.env.CLIENT_URL}/dashboard" style="display: inline-block; padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">View Details</a>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: `Evaluation Update - ${project.title}`,
    html
  });
};

// Results announcement email
exports.sendResultsEmail = async (user, project, isWinner, prize) => {
  const html = isWinner ? `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #f59e0b;">🏆 Congratulations! You Won! 🎉</h1>
      <p>Hi ${user.firstName},</p>
      <p>We're thrilled to announce that your project <strong>"${project.title}"</strong> has won!</p>
      <p><strong>Position:</strong> ${prize.position}</p>
      <p><strong>Prize:</strong> $${prize.amount}</p>
      <p>Congratulations to you and your team! 🎊</p>
      <p>We'll contact you shortly with details about claiming your prize.</p>
      <a href="${process.env.CLIENT_URL}/dashboard" style="display: inline-block; padding: 12px 24px; background-color: #f59e0b; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">View Results</a>
    </div>
  ` : `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #6366f1;">Thank You for Participating! 🙏</h1>
      <p>Hi ${user.firstName},</p>
      <p>Thank you for participating in HackFlow 2025!</p>
      <p>While your project <strong>"${project.title}"</strong> didn't win this time, we appreciate your effort and creativity.</p>
      <p>Keep building amazing things! 🚀</p>
      <a href="${process.env.CLIENT_URL}/dashboard" style="display: inline-block; padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">View Results</a>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: isWinner ? '🏆 You Won HackFlow 2025!' : 'Thank You for Participating in HackFlow 2025',
    html
  });
};

module.exports = {
  sendEmail
};