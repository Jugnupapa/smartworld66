const nodemailer = require('nodemailer');


const emailUser = process.env.GMAIL_USER;
const emailPass = process.env.GMAIL_PASS;

export default async (req, res) => {
  try {
    console.log('Received request:', req);

    const body = req.body;

    // Check if 'name' is defined, and if not, provide a default value or handle it as needed.
    // const senderName = name || 'Anonymous';

    // Log some information for debugging
    console.log('Received a request with the following data:');
    console.log('Request: ', req)
    console.log('Body: ', body)
    // console.log('Name:', name);
    // console.log('Email:', email);
    // console.log('Mobile:', mobile);
    // console.log('Message:', message);

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
    // text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
    text: `Name: ${body}\nEmail: \nMobile: \nMessage: `,
  };

    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.error(err);
              reject(err);
          } else {
              console.log(info);
              resolve(info);
          }
      });
  });
  
  res.status(200).json({ status: "OK", body: body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error" });
  }
};