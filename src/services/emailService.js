import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create transporter (Gmail example - you can change to your email service)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Fallback transporter for development (doesn't actually send)
const devTransporter = {
  sendMail: async (options) => {
    console.log("📧 [DEV MODE] Email would be sent:");
    console.log(`To: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`HTML: ${options.html}`);
    return { messageId: "dev-mode" };
  },
};

const isDevMode = !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD;

export const sendInvitationEmail = async (
  recipientEmail,
  eventTitle,
  eventDate,
  eventTime,
  movieTitle,
  hostName
) => {
  const formatter = isDevMode ? devTransporter : transporter;

  const eventDateFormatted = new Date(eventDate).toDateString();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; background: #f5f7fa; padding: 20px; border-radius: 10px; }
          .header { background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: white; padding: 25px; margin: 20px 0; border-radius: 8px; }
          .event-detail { background: #ecf0f1; padding: 15px; border-left: 5px solid #f39c12; margin: 15px 0; border-radius: 6px; }
          .event-detail p { margin: 8px 0; color: #2c3e50; }
          .button { display: inline-block; background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 15px; font-weight: 600; }
          .footer { text-align: center; color: #7f8c8d; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎬 You're Invited!</h1>
          </div>

          <div class="content">
            <p>Hi there,</p>
            <p><strong>${hostName}</strong> has invited you to a Movie Night!</p>

            <div class="event-detail">
              <p><strong>📽️ Event:</strong> ${eventTitle}</p>
              <p><strong>📅 Date:</strong> ${eventDateFormatted}</p>
              <p><strong>🕐 Time:</strong> ${eventTime}</p>
              ${movieTitle ? `<p><strong>🎥 Movie:</strong> ${movieTitle}</p>` : ""}
            </div>

            <p>Click the button below to RSVP and see more details:</p>
            <a href="${process.env.APP_URL || "http://localhost:3000"}/events" class="button">View Event</a>

            <p style="color: #7f8c8d; font-size: 14px; margin-top: 20px;">
              This is an automated message from Movie Night Mayhem. Please don't reply to this email.
            </p>
          </div>

          <div class="footer">
            <p>&copy; 2026 Movie Night Mayhem. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await formatter.sendMail({
      from: process.env.EMAIL_USER || "noreply@movienight.com",
      to: recipientEmail,
      subject: `🎬 You're invited to ${eventTitle}`,
      html: htmlContent,
    });

    console.log(`✅ Invitation email sent to ${recipientEmail}`);
    return info;
  } catch (error) {
    console.error(`❌ Failed to send email to ${recipientEmail}:`, error.message);
    throw error;
  }
};
