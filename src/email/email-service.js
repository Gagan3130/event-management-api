const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
});

const sendEventRegistrationMail =  (params) => {
  const mailOptions = {
    from: `Gagan <${process.env.EMAIL_FROM}>`,
    to: params.email,
    subject: "Registration Success",
    text: params.name,
    html: "<b>Hey There! </b><br> You have successfully registered for this event<br/>",
  };
   transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

module.exports = { sendEventRegistrationMail };
