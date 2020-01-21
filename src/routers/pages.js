const express = require('express')
const auth = require('../middleware/auth')

const router = new express.Router()


router.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        login: false
    })
})

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page',
        login: false
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register Page',
        login: false,
    })
})

router.get('/home', auth, (req, res) => {
    res.render('home', {
        title: 'Welcome',
        login: true,
        name: req.user.first_name
    })
})

router.get('/stream', auth, (req, res) => {
    res.render('stream', {
        title: 'Stream',
        login: true,
        email: req.user.email
    })
})

router.get('/pastReports', auth, (req, res) => {
    res.render('pastReports', {
        title: 'pastReports',
        login: true,
        email: req.user.email
    })
    
})



router.get('*', (req, res) => {
    res.send('404 page not exist')
})

module.exports = router