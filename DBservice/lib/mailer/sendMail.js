import nodemailer from "nodemailer";
import nl2br from "nl2br"



let mailer = nodemailer.createTransport({
    host: "smtp4dev",  // can add smtp host
    port: 25,           // can add port for smtp
    secure: false,
})

export const  sendMail = async ( email )=>{
    await mailer.sendMail({
        from: 'admin@admin.com', 
        to: "user@gmail.com",
        subject: "Action completed", 
        text: email,
        html:`<h1>Action completed</h1><p>${nl2br(email)}</p>`
    });

    console.log('Email sent.');
};