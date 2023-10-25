const nodemailer = require('nodemailer');


const emailUser = process.env.GMAIL_USER;
const emailPass = process.env.GMAIL_PASS;

module.exports = async (req, res) => {
  const { name, email, mobile, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: emailUser,
        pass: emailPass
    },
  });

  const mailOptions = {
    from: emailUser,
    to: 'papajugnu@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    res.status(500).send('Failed to send email.');
  }
};
