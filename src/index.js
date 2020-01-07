const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const hbs = require('hbs')


require('./db/mongoose')
const userRouter = require('./routers/user')
const reportRouter = require('./routers/report')
const pagesRouter = require('./routers/pages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//port to listen
const port = process.env.PORT
//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))




app.use(express.json())
app.use(userRouter)
app.use(reportRouter)
app.use(pagesRouter)

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