const mongoose = require('mongoose')
const validator = require('validator')

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
    },
    name: {
        type: String,
        require: true
    }
})

module.exports = Camera