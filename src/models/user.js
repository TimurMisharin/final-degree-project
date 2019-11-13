const mongoose = require('mongoose')
const validator = require('validator')
require('../db/mongoose')

const User = mongoose.model('User', {
    first_name: {
        type: String,
        require: true,
        trim: true
    },
    last_name: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password" ')
            }
        }
    },
    phone: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    target_name: {
        type: String,
        trim: true
    }
})

module.exports = User