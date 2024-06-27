import nodemailer from "nodemailer";
import nl2br from "nl2br"



let mailer = nodemailer.createTransport({
    host: "127.0.0.1",  // can add smtp host
    port: 25,           // can add port for smtp
    secure: false,
})

export const  sendMail = async ( email )=>{
    await mailer.sendMail({
        from: 'admin@admin.com', 
        to: "userr@gmail.com",
        subject: "Action completed", 
        text: email,
        html:`<h1>Action completed</h1><p>${nl2br(email)}</p>`
    });

    console.log('Email sent.');
};