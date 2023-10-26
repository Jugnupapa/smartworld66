import { IncomingForm } from 'formidable';
import nodemailer from 'nodemailer';


const emailUser = process.env.GMAIL_USER;
const emailPass = process.env.GMAIL_PASS;

export default async (req, res) => {
  try {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ status: 'Error' });
        return;
      }

      const { name, email, mobile, message } = fields;

      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const mailOptions = {
        from: emailUser,
        to: 'papajugnu@gmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          res.status(500).json({ status: 'Error' });
        } else {
          console.log(info);
          res.status(200).json({ status: 'OK', body: fields });
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Error' });
  }
};