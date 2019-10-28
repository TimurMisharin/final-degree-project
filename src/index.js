const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

//port to listen
const port =  process.env.PORT || 3000
//path to public files
const publicDirectory = path.join(__dirname, '../public')

app.use(express.static(publicDirectory))

//connection with socket (each connection)
/**
 * socket is client connection
 */
io.on('connection', (socket) => {
    console.log('New WebSocket connection')
    
    socket.on('falled',(data)=>{
        //send data to client. 
        console.log(data);
        socket.emit('reported')
    })
})

//run server
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})