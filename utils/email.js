import nodemailer from 'nodemailer';

const sendEmail = async (subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: process.env.USER,
            subject: subject,
            html: text,
        });
    } catch (error) {
        console.log("email not sent", error);
    }
};

export {
    sendEmail,
}