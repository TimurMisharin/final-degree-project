const express = require('express')
const Camera = require('../models/camera')
const router = new express.Router()


/**
 * Cameras
 */

/**
 * add new camera request
 */
router.post('/cameras', async (req, res) => {
    const camera = new Camera(req.body)

    try {
        await camera.save()
        res.status(201).send(camera)
    } catch (e) {
        res.status(201).send(camera)
    }
})

router.get('/cameras', async (req, res) => {
    try {
        const cameras = await Camera.find({})
        res.status(200).send(cameras)
    } catch (e) {
        console.log('db get all cameras error:', e)
        res.status(500).send()
    }
})

router.get('/cameras/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const camera = await Camera.findById(_id)
        res.status(200).send(camera)
    } catch (e) {
        console.log('db get camera error:', e)
        res.status(500).send()
    }
})

router.patch('/cameras/:id', async (req, res) => {
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
        res.status(400).send(e)
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
        console.log('db get delete user error:', e)
        res.status(500).send()
    }
})

module.exports = router