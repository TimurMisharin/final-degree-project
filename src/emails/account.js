const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'timormi@ac.sce.ac.il',
        subject: 'Thanks for join us!',
        text: `Welcome to fall detection app, ${name}. Let's start!`
    })
}

const sendFallDetectedEmail = (email) => {
    //TODO
}


module.exports = {
    sendWelcomeEmail
}