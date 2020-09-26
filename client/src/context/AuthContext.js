import { createContext } from 'react'

function blank() {}

export const AuthContext = createContext({
	token: null,
	userId: null,
	nickname: null,
	login: blank,
	logout: blank,
	isAuthenticated: false
})