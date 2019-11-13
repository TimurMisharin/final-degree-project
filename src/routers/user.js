const express = require('express')
const User = require('../models/user')
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

/**
 * get users from db
 */
router.get('/users', async (req, res) => {
    /**
     * find users on db
     */
    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch (e) {
        console.log('db get users error:', e.message)
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        console.log('db get user error:', e.message)
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['first_name', 'last_name', 'phone', 'email', 'target_name', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }

    const _id = req.params.id
    const data = req.body
    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send();
        }

        updates.forEach((update) => user[update] = data[update])

        await user.save()

        res.status(200).send(user)
    } catch (e) {
        console.log('user update:', e.message)
        res.status(400).send()
    }
})


router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send()
    } catch (e) {
        console.log('db get delete user error:', e.message)
        res.status(500).send()
    }
})

module.exports = router