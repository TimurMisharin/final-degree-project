const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

require('./db/mongoose')
const User = require('./models/user')
const Camera = require('./models/camera')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//port to listen
const port = process.env.PORT || 3000
//path to public files
const publicDirectory = path.join(__dirname, '../public')

app.use(express.static(publicDirectory))
app.use(express.json())

/**
 * register user request
 */
app.post('/register', async (req, res) => {
    /**
     * create user by params from fronend
     */
    const user = new User(req.body)
    /**
     * save new user  in db by mangoose
     */
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users)
    } catch (e) {
        console.log('db get users error:', e)
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        console.log('db get user error:', e)
        res.status(500).send()
    }
})

/**
 * add new camera request
 */
app.post('/new-camera', (req, res) => {
    const camera = new Camera(req.body)

    camera.save().then(() => {
        res.status(201).send(camera)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/all-cameras', (req, res) => {
    Camera.find({}).then((cameras) => {
        res.status(200).send(cameras)
    }).catch((e) => {
        console.log('db get all cameras error:', e)
        res.status(500).send()
    })
})



//connection with socket (each connection)
/**
 * socket is client connection
 */
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('falled', (data) => {
        //send data to client. 
        console.log(data);
        socket.emit('reported')
    })
})

//run server
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})