const mongoose = require('mongoose')
const validator = require('validator')

const reportSchema = new mongoose.Schema({
    date: {
        type: Date,
        require: true
    },
    description: {
        type: String
    }
})

const Report = mongoose.model('Report', reportSchema)

module.exports = Report