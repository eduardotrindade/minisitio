require('dotenv').config();

module.exports = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
};

// Para gerar senha de aplicativo do Gmail:
// https://myaccount.google.com/apppasswords