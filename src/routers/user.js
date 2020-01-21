const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const {
    sendWelcomeEmail
} = require('../emails/account')

const router = new express.Router()

/**
 * USERS
 */

/**
 * register user request
 */
router.post('/users', async (req, res) => {
    /**
     * create user by params from fronend
     */
    const user = new User(req.body)
    /**
     * save new user  in db by mangoose
     */
    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken(user)
        res.status(201).send({
            user,
            token
        })
    } catch (e) {
        console.log('create user:', e.message)
        res.status(400).send()
    }
})

router.post('/users/login', async (req, res) => {
    try {
        console.log(req.body.email)
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({
            user,
            token
        })
    } catch (e) {
        console.log('User Login:', e.message)
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.status(200).send()
    } catch (e) {
        console.log('User Logout:', e.message)
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await res.user.save()
        res.status(200).send()
    } catch (e) {
        console.log('All User Logout:', e.message)
        res.status(500).send()
    }
})


/**
 * get users from db
 */
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})


router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['first_name', 'last_name', 'phone', 'email', 'target_name', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        res.status(200).send(req.user)
    } catch (e) {
        console.log('user update:', e.message)
        res.status(400).send()
    }
})

//delete user
router.delete('/users/me', auth, async (req, res) => {
    try {
        // remove user from db with mangoose
        await req.user.remove()
        // send deleted user
        res.status(200).send(req.user)
    } catch (e) {
        console.log('db get delete user error:', e.message)
        res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})


router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({
        width: 250,
        height: 250
    }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.status(200).send()
}, (error, req, res, next) => {
    console.log('Avatar upload:', error.message)
    res.status(400).send(e.message)
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await res.user.save()
    res.send()
}, (error, req, res, next) => {
    console.log('Remove avatar:', error.message)
    res.status(400).send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar)
    } catch (e) {
        console.log('Show avatar:', e.message)
        res.status(400).send()
    }
})

module.exports = router