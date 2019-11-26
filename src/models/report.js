const mongoose = require('mongoose')
const validator = require('validator')

const reportSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // create rs with user
        ref: 'User'
    }
})

const Report = mongoose.model('Report', reportSchema)

module.exports = Report