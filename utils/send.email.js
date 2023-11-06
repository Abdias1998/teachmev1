const nodemailer = require("nodemailer");
const path = require("path");
const transporter = nodemailer.createTransport({
  host: process.env.host,
  service: process.env.service,
  port: Number(process.env.email_port),
  secure: Boolean(process.env.secure),
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

module.exports.send_email = async (email, subject, text) => {
  try {
    await transporter.sendMail({
      from: `TeachMe`,
      to: email,
      subject: subject,
      html: text,
    });
    console.log(`Email envoyé`);
  } catch (error) {
    console.log(`Email non envoyé ${error}`);
  }
};
