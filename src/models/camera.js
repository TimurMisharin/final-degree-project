const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const cameraSchema = new mongoose.Schema({
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

cameraSchema.pre('save', async function (next) {
    const camera = this

    if (camera.isModified('mac_address')) {
        camera.mac_address = await bcrypt.hash(camera.mac_address, 8)
    }

    next()
})


const Camera = mongoose.model('Camera', cameraSchema)

module.exports = Camera