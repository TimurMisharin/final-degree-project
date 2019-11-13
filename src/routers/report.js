const express = require('express')
const Report = require('../models/report')
const router = new express.Router()


/**
 * Reports
 */

router.get('/reports', async (req, res) => {
    try {
        const reports = await Report.find({})
        res.status(200).send(reports)
    } catch (e) {
        console.log('db get all reports error:', e)
        res.status(500).send()
    }
})

router.get('/reports/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const report = await Report.findById(_id)
        res.status(200).send(report)
    } catch (e) {
        console.log('db get report error:', e)
        res.status(500).send()
    }
})

router.delete('/reports/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const report = await Report.findByIdAndDelete(_id)
        if (!report) {
            return res.status(404).send()
        }
        res.status(200).send()
    } catch (e) {
        console.log('db get delete user error:', e)
        res.status(500).send()
    }
})

module.exports = router