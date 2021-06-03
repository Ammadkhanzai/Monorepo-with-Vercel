// const { response } = require("express");
const nodemailer = require("nodemailer");


exports.sendmail = async (req, res, next) => {
    console.log("send mail");
    res.status(200).json({
            success: true,
            message: "email"
          });
    // try {

    //     let transporter = nodemailer.createTransport({
    //         sendmail: true,
    //         newline: 'windows',
    //         logger: false
    //     }); 
    //     let message = {
    //         from: 'Node <nodetesting@mail.com>',

    //         // Comma separated list of recipients
    //         to: 'Andris Reinman <alykhan2212@gmail.com>',

    //         // Subject of the message
    //         subject: 'Nodemailer is unicode friendly ✔',

    //         // plaintext body
    //         text: 'Hello to myself!',

    //         // HTML body
    //         html:
    //             '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
    //             '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',


    //     };

    //     let info = await transporter.sendMail(message);
    //     console.log('Message sent successfully as %s', info.messageId);


    //   res.status(200).json({
    //     success: true
    //   });

    // } catch (err) {
    //   // Sending error response
    //   res.status(400).json({
    //     success: false,
    //     error: err,
    //     message: "invalid data"
    //   });
    // }

    // const firstname = req.body.firstname
    // const lastname = req.body.lastname
    // const email = req.body.email
    // const advtype = req.body.advtype

    // try {
    //     let transporter = nodemailer.createTransport({
    //         sendmail: true,
    //         newline: 'windows',
    //         logger: true
    //         // path: '/usr/sbin/sendmail'
    //     });
    //     let info = await transporter.sendMail({
    //         from: 'hello@mail.com',
    //         to: 'alykhan2212@gmail.com',
    //         subject: 'Advertise',
    //         text: 'Firstname : {firstname}  \n Lastname : {lastname} \n Advertisement : {advtype}',
    //         html:
    //             '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
    //             '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',
    //     });
    //     console.log("send mail");
    //     console.log('Message sent successfully as %s', info.messageId);
    // }
    // catch (err) {
    //     console.log(err)
    // }
};