const express = require('express')
const Report = require('../models/report')
const auth = require('../middleware/auth')
const router = new express.Router()


/**
 * Reports
 */

// add new report
router.post('/reports', auth, async (req, res) => {
    // create new report and copy all info from body
    const report = new Report({
        ...req.body,
        owner: req.user._id
    })

    try {
        // save to db
        await report.save()
        res.status(201).send(report)
    } catch (e) {
        console.log('New report:', e.message)
        res.status(400).send()
    }
})


router.get('/reports', auth, async (req, res) => {
    try {
        const reports = await Report.find({})
        res.status(200).send(reports)
    } catch (e) {
        console.log('db get all reports error:', e.message)
        res.status(500).send()
    }
})

router.get('/reports/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const report = await Report.findById(_id)
        res.status(200).send(report)
    } catch (e) {
        console.log('db get report error:', e.message)
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
        console.log('db get delete user error:', e.message)
        res.status(500).send()
    }
})

module.exports = router