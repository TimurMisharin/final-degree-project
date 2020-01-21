const express = require('express')
const Report = require('../models/report')
const auth = require('../middleware/auth')
const router = new express.Router()
const {
    sendFallDetectedEmail
} = require('../emails/account')

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
    sendFallDetectedEmail(req.user.email, req.body, req.user.target_name)

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
        //pagination
        //limit of reports per page
        let limit = parseInt(req.query.limit)
        // skip for some page
        let skip = parseInt(req.query.skip)
        if (!limit || limit < 1) {
            limit = 5
        }
        if (!skip || skip < 0) {
            skip = 0
        }
        await req.user.populate({
            path: 'reports',
            options: {
                limit,
                skip,
                sort: {
                    createdAt: -1
                }
            }
        }).execPopulate()
        res.status(200).send(req.user.reports)
    } catch (e) {
        console.log('db get all reports error:', e.message)
        res.status(500).send()
    }
})

router.get('/reports/:id', auth, async (req, res) => {
    try {
        const report = await Report.findOne({
            _id: req.params.id,
            owner: req.user._id
        })
        if (!report) {
            return res.status(404).send()
        }
        res.status(200).send(report)
    } catch (e) {
        console.log('db get report error:', e.message)
        res.status(500).send()
    }
})

router.delete('/reports/:id', auth, async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete({
            _id: req.params.id,
            owner: req.user._id
        })
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