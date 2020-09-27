import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const MessageContainer = ({ nickname, message }) => {
  const auth = useContext(AuthContext)
  const isMyMessage = auth.nickname === nickname

  return (
    <div style={isMyMessage ? classes.rightSide : null} className="col-12">
      <div style={classes.messageContainer}>
        <span style={classes.nickname}>{nickname}</span>
        <p style={classes.message}>{message}</p>
      </div>
    </div>
  )
}

const classes = {
  messageContainer: {
    display: 'inline-block',
    width: 'auto',
    maxWidth: '80%',
    padding: '0 1rem',
    marginBottom: '1.5rem',
    borderRadius: '.3rem',
    boxShadow: '0 5px 10px 5px rgba(0, 0, 0, 0.1)',
  },
  rightSide: {
    textAlign: 'right',
  },
  myMessage: {
    marginLeft: 'auto',
  },
  nickname: {
    fontSize: '.8rem',
    color: '#7b1fa2',
  },
  message: {
    fontSize: '1.2rem',
    textAlign: 'left',
    margin: '0',
    borderTop: '1px solid #7b1fa2',
  },
}
