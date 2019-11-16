const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILPASS
    }
});

exports.sendMail = (subject, body, emailTo, callback) => {
    const mailOptions = {
        from: process.env.EMAILFROM,
        to: emailTo,
        subject: subject,
        text: body
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(err) {
        if (err) return callback(err);
        callback(null, true);
    });

};