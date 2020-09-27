import React, { useState, useEffect, useRef, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import {
  initiateSocket,
  subscribeToChat,
  downloadHistory,
  switchRoom,
  sendMessage,
} from '../socket'
import { MessageContainer } from '../components/MessageContainer'
import { BottomBar } from '../components/BottomBar'
import { Tabs } from '../components/Tabs'
import M from 'materialize-css'

export const ChatPage = () => {
  const auth = useContext(AuthContext)
  const rooms = ['М80-111Б-16 Важное', 'группа 111 флудилка']
  const [room, setRoom] = useState(rooms[0])
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const prevRoomRef = useRef()

  useEffect(() => {
    prevRoomRef.current = room
    scrollToBottom()
  })
  const prevRoom = prevRoomRef.current

  useEffect(() => {
    if (prevRoom && room) {
			switchRoom(prevRoom, room)
			setMessage('')
    } else if (room) initiateSocket(auth.token, room)
  }, [room, auth.token, prevRoom])

  useEffect(() => {
    const tabs = document.querySelector('.tabs')
    M.Tabs.init(tabs)
    subscribeToChat((err, data) => {
      if (err) return
      setChat((oldChats) => [...oldChats, data])
    })
    downloadHistory((err, data) => {
      if (err) return
      data = data.reverse()
      setChat(() => data)
    })
  }, [])

  return (
    <>
      <div className="row" style={classes.mainWindow}>
        <Tabs rooms={rooms} setRoom={setRoom} />
        <div id="chat" style={classes.messageBox} className="col s12">
          <div className="row">
            {chat.map((data, i) => (
              <MessageContainer
                key={i}
                message={data.message}
                nickname={data.nickname}
              />
            ))}
          </div>
          <BottomBar
            room={room}
            message={message}
            setMessage={setMessage}
            setChat={setChat}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </>
  )
}

const classes = {
  mainWindow: {
    position: 'relative',
    height: '680px',
    marginTop: '2rem',
    border: '2px solid grey',
		borderRadius: '.5rem',
		boxShadow: '0 0 30px 10px rgba(0, 0, 0, 0.1)',
  },
  messageBox: {
    overflowY: 'scroll',
    height: '575px',
    padding: '1rem 2rem',
  },
  tabs: {
    borderBottom: '1px solid grey',
    borderRadius: '.5rem .5rem 0 0',
  },
}

const scrollToBottom = () => {
  const chat = document.getElementById('chat')
  chat.scrollTop = chat.scrollHeight
}
