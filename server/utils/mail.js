const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true, 
  auth: {
    user: 'razumjohn@mail.ru',
    pass: 'jxGV3Nkt01MfP1tsNpRF'
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: 'razumjohn@mail.ru',
      to,
      subject,
      text
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };