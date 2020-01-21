const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'timormi@ac.sce.ac.il',
        subject: 'Thanks for join us!',
        text: `Welcome to fall detection app, ${name}. Let's start!`
    })
}

const sendFallDetectedEmail = (email,text,target) => {
    sgMail.send({
        to: email,
        from: 'timormi@ac.sce.ac.il',
        subject: 'Falling Detected!!',
        text: `${target} ${text}!!! Check if all right!`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendFallDetectedEmail
}