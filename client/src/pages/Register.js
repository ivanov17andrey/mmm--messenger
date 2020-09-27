import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook'
import { Loader } from '../components/Loader'

export const Register = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, clearError, request } = useHttp()
  const [form, setForm] = useState({
    email: '',
    nickname: '',
    password: '',
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      clearError()
      const data = await request('/api/auth/register', 'POST', {
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password.trim(),
      })

      if (data.login) {
        loginHandler()
      }
    } catch (err) {}
  }

  const loginHandler = async () => {
    try {
      clearError()
      const data = await request('/api/auth/login', 'POST', {
        email: form.email.trim(),
        password: form.password.trim(),
      })

      auth.login(data.token, data.userId, data.nickname)
    } catch (err) {}
  }

  return (
    <div className="row">
      <div
        style={classes.form}
        className="col s10 m6 offset-s1 offset-m3 center-align"
      >
        <span style={classes.header}>Регистрация</span>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={changeHandler}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input
              id="nickname"
              name="nickname"
              type="text"
              value={form.nickname}
              onChange={changeHandler}
            />
            <label htmlFor="nickname">Имя</label>
          </div>
          <div className="input-field col s12">
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={changeHandler}
            />
            <label htmlFor="password">Пароль</label>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <button
              style={classes.button}
              className="waves-effect waves-light btn"
              onClick={registerHandler}
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  )
}

const classes = {
  header: {
    fontSize: '28px',
  },
  form: {
    marginTop: '100px',
  },
  button: {
    width: '100%',
  },
}
