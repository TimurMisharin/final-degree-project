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

const report = new Report({
    date: new Date(),
    description: 'OPS OPS OPS'
})

module.exports = Report
