const express = require('express')

const router = new express.Router()


router.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page'
    })
})

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page'
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register Page'
    })
})

router.get('/home', (req,res)=>{
    res.render('home',{
       title:'Welcome' 
    })
})




router.get('*', (req, res) => {
    res.send('404 page not exist')
})

module.exports = router