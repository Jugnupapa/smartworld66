const nodemailer = require('nodemailer');


const emailUser = process.env.GMAIL_USER;
const emailPass = process.env.GMAIL_PASS;

module.exports = async (req, res) => {
  console.log('Request: ', req)
  console.log('Response: ', res)
  const { email, mobile, message } = req.body;

  // Log some information for debugging
  console.log('Received a request with the following data:');
  console.log('Request: ', req)
  // console.log('Name:', name);
  console.log('Email:', email);
  console.log('Mobile:', mobile);
  console.log('Message:', message);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // Specify Gmail's SMTP server
    port: 465,               // Gmail SMTP uses port 465
    secure: true,            // Use a secure connection
    auth: {
        user: emailUser,
        pass: emailPass
    },
  });

  const mailOptions = {
    from: emailUser,
    to: 'papajugnu@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Email: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    res.status(500).send('Failed to send email.');
    console.error('Error sending email:', error);
  }
};
