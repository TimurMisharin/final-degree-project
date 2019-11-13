const mongoose = require('mongoose')
const validator = require('validator')

const Report = mongoose.model('Report', {
    date: {
        type: Date,
        require: true
    },
    description: {
        type: String
    }
})

module.exports = Report
