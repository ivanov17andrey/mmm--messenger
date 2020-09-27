import io from 'socket.io-client'
import config from '../config'

let socket

export const initiateSocket = (token, room) => {
	socket = io(config[production].endpoint, {
		query: `token=${token}`
	})

  console.log(`Connecting socket...`)
  if (socket && room) {
		socket.emit('join', room)
		socket.emit('init', room)
	}
}

export const subscribeToChat = (cb) => {
  if (!socket) return true
  socket.on('chat', (data) => {
    return cb(null, data)
	})
}

export const downloadHistory = (cb) => {
	if(!socket) return true
	socket.on('init', (data) => {
		return cb(null, data)
	})
}

export const switchRoom = (prevRoom, nextRoom) => {
	if (socket) {
		socket.emit('switch', { prevRoom, nextRoom })
		socket.emit('init', nextRoom)
	} 
}

export const sendMessage = (room, nickname, message) => {
  if (socket) socket.emit('chat', { room, nickname, message })
}
