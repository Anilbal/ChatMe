const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port:  process.env.SMTP_PORT,
  auth: {
    user:  process.env.SMTP_USER,
    pass:  process.env.SMTP_PASSWORD,
  },
});


async function sendEmail(mailOptions) {
  const info = await transporter.sendMail({
    from: mailOptions.from, // sender address
    to: mailOptions.to, // list of receivers
    subject: mailOptions.subject, // Subject line
    text: mailOptions.text, // plain text body
    html: mailOptions.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
}
module.exports=sendEmail