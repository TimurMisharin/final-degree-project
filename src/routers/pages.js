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
        login: false
    })
})

router.get('/home', auth, (req, res) => {
    res.render('home', {
        title: 'Welcome',
        login: true
    })
})

router.get('/stream', auth, (req, res) => {
    res.render('stream', {
        title: 'Stream',
        login: true
    })
})



router.get('*', (req, res) => {
    res.send('404 page not exist')
})

module.exports = router