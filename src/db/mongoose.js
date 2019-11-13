const mongoose = require('mongoose')
const validator = require('validator')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'fall-detection'

mongoose.connect(`${connectionURL}/${databaseName}`, {
    useNewUrlParser: true,
    useCreateIndex: true
})

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
        minlength: 7,
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

const Camera = mongoose.model('Camera', {
    mac_address: {
        type: String,
        require: true,
        uppercase: true,
        validate(value) {
            if (!validator.isMACAddress(value)) {
                throw new Error('MAC address is invalid');
            }
        }
    }
})

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

report.save().then(() => {
    console.log(report)
}).catch((error) => {
    console.log(errpor)
})

