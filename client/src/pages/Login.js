import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook'
import { Loader } from '../components/Loader'

export const Login = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, clearError, request } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
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
	
	const onKeyDownHandler = e => {
    if (e.keyCode === 13) {
      loginHandler();
    }
  }

  return (
    <div className="row">
      {loading && <Loader />}
      <div
        style={classes.form}
        className="col s10 m6 offset-s1 offset-m3 center-align"
      >
        <h1 style={classes.header} className="blue-grey-text darken-2">Авторизация</h1>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="email"
              name="email"
              type="email"
							autoFocus
							autoComplete="off"
              value={form.email}
              onChange={changeHandler}
							onKeyDown={onKeyDownHandler}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input
              id="password"
              name="password"
              type="password"
							autoComplete="off"
              value={form.password}
              onChange={changeHandler}
							onKeyDown={onKeyDownHandler}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row ">
          <div className="col s12">
            <button
              style={classes.button}
              className="waves-effect waves-light btn"
              onClick={loginHandler}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const classes = {
  header: {
		fontSize: '30px',
		marginBottom: '1rem',
  },
  form: {
    marginTop: '100px',
  },
  button: {
    width: '100%',
  },
}
