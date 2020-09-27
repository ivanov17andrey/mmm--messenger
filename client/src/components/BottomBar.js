import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const BottomBar = ({
  room,
  message,
  setMessage,
  setChat,
  sendMessage,
}) => {
  const auth = useContext(AuthContext)

  const clichHandler = () => {
    if (message.trim()) {
      sendMessage(room, auth.nickname, message)
      setMessage('')
      setChat((oldChats) => [...oldChats, { nickname: auth.nickname, message }])
    }
  }

  return (
    <div style={classes.bottomBar} className="row">
      <div style={classes.wrapper} className="col s12">
        <input
          style={classes.input}
          type="text"
          name="name"
          placeholder="Введите сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          style={classes.sendButton}
          className="btn waves-effect"
          onClick={clichHandler}
        >
          Отправить
          <i className="material-icons right">send</i>
        </button>
      </div>
    </div>
  )
}

const classes = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    display: 'inline-block',
    width: '100%',
    minWidth: '100px',
  },
  sendButton: {
    display: 'inline-block',
    marginLeft: '2rem',
  },
  bottomBar: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    left: '0',
    bottom: '0',
    right: '0',
    margin: '0',
    borderTop: '1px solid grey',
  },
}
