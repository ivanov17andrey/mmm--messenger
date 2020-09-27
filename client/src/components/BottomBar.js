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

  const clickHandler = () => {
    if (message.trim()) {
      sendMessage(room, auth.nickname, message)
      setMessage('')
      setChat((oldChats) => [...oldChats, { nickname: auth.nickname, message }])
    }
	}
	
	const onKeyDownHandler = e => {
    if (e.keyCode === 13) {
      clickHandler();
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
					onKeyDown={onKeyDownHandler}
        />
        <button
          style={classes.sendButton}
          className="btn waves-effect"
          onClick={clickHandler}
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
		color: '#455a64',
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
