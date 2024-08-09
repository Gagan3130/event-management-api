const nodemailer = require("nodemailer");
const pug = require('pug');

module.exports = class Email {
  constructor(user) {
    this.firstName = user.name.split(" ")[0];
    this.from = `Gagan <${process.env.EMAIL_FROM}>`;
    this.to = user.email;
  }

  newTransport() {
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    return transport;
  }

  async sendEmail(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      firstName: this.firstName,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: "Event Registration",
    };
    await this.newTransport().sendMail(mailOptions);
  }
  async sendEventRegistrationMail() {
    await this.sendEmail("eventRegistration", "Event Registration Successfull");
  }
};
