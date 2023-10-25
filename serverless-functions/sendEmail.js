const nodemailer = require('nodemailer');


const emailUser = process.env.GMAIL_USER;
const emailPass = process.env.GMAIL_PASS;

module.exports = async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com', // Your Gmail email address
      pass: 'your-password', // Your Gmail password or App Password (if 2FA is enabled)
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient@example.com', // Recipient's email address
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    res.status(500).send('Failed to send email.');
  }
};
