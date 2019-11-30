const express = require('express')
const Camera = require('../models/camera')
const auth = require('../middleware/auth')
const router = new express.Router()


/**
 * Cameras
 */

/**
 * add new camera request
 */
router.post('/cameras', auth, async (req, res) => {
    const camera = new Camera(req.body)

    try {
        await camera.save()
        res.status(201).send(camera)
    } catch (e) {
        res.status(201).send(camera)
    }
})

router.get('/cameras', auth, async (req, res) => {
    try {
        const cameras = await Camera.find({})
        res.status(200).send(cameras)
    } catch (e) {
        console.log('db get all cameras error:', e.message)
        res.status(500).send()
    }
})

router.get('/cameras/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const camera = await Camera.findById(_id)
        res.status(200).send(camera)
    } catch (e) {
        console.log('db get camera error:', e.message)
        res.status(500).send()
    }
})

router.patch('/cameras/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }

    const _id = req.params.id
    const data = req.body

    try {
        const camera = await Camera.findByIdAndUpdate(_id)

        if (!camera) {
            return res.status(404).send({
                error: "Invalid updates!"
            });
        }

        updates.forEach((update) => camera[update] = data[update])

        await camera.save()

        res.status(200).send(camera)
    } catch (e) {
        console.log('camera update:', e.message)
        res.status(400).send()
    }
})

router.delete('/cameras/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const camera = await Camera.findByIdAndDelete(_id)
        if (!camera) {
            return res.status(404).send()
        }
        res.status(200).send()
    } catch (e) {
        console.log('db get delete user error:', e.message)
        res.status(500).send()
    }
})

module.exports = router