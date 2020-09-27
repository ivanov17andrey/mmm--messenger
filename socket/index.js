const socketioJwt = require('socketio-jwt')
require('dotenv').config()
// const config = require('config')
const Message = require('../models/Message')

module.exports = function (server) {
  const io = require('socket.io')(server)

  io.use(
    socketioJwt.authorize({
      secret: process.env.jwtSecret,
      handshake: true,
    })
  )

  io.on('connection', (socket) => {
    let socketRoom

    socket.on('disconnect', () =>
      console.log(
        `Disconnected: ${socket.decoded_token.nickname}, ${socket.id}`
      )
    )

    socket.on('join', (room) => {
      socket.join(room)
      socketRoom = room
    })

    socket.on('init', (room) => {
      Message.find({ room: room })
        .sort({ createdAt: -1 })
        .exec((err, messages) => {
          if (err) return console.error(err)
          socket.emit('init', messages)
        })
    })

    socket.on('switch', (data) => {
      const { prevRoom, nextRoom } = data
      if (prevRoom) socket.leave(prevRoom)
      if (nextRoom) socket.join(nextRoom)
      socketRoom = nextRoom
    })

    socket.on('chat', (data) => {
      const { room, nickname, message } = data

      const newMessage = new Message({
        room: room,
        nickname: nickname,
        message: message,
      })

      newMessage.save((err) => {
        if (err) return console.error(err)
      })

      socket.broadcast.to(socketRoom).emit('chat', { nickname, message })
    })
  })
}
