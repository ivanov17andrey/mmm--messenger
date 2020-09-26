import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ChatPage } from './pages/ChatPage'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/chat" exact>
          <ChatPage />
        </Route>
        <Redirect to="/chat" />
      </Switch>
    )
  }
  return (
    <Switch>
			<Route path='/login' exact>
				<Login />
			</Route>
			<Route path='/register' exact>
				<Register />
			</Route>
      <Redirect to="/login" />
    </Switch>
  )
}
