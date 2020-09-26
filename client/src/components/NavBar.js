import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useAuth } from '../hooks/auth.hook'

export const NavBar = () => {
  const auth = useContext(AuthContext)
  const { logout } = useAuth()
  const location = useLocation()

  return (
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">
          mmm--messenger
        </a>
        <ul id="nav-mobile" className="right">
          {auth.isAuthenticated && (
            <li>
              <a href="/" onClick={logout}>
                Выйти
              </a>
            </li>
          )}
          {!auth.isAuthenticated && location.pathname == '/login' && (
            <li>
              <Link to="/register">Зарегистрироваться</Link>
            </li>
          )}
          {!auth.isAuthenticated && location.pathname == '/register' && (
            <li>
              <Link to="/login">Войти</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
