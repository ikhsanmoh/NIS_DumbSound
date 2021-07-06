import { createContext, useReducer } from 'react'

export const UserContext = createContext();

const initState = {
  isLogin: false,
  user: null
}

const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN":
      // localStorage.setItem('access_token', payload.token)
      return {
        isLogin: true,
        user: payload
      }
    case "AUTH_ERROR":
    case "LOGOUT":
      // localStorage.removeItem('access_token')
      return {
        isLogin: false,
        user: null
      }
    default:
      throw new Error()
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}