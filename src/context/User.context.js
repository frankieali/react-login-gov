import React, { createContext, useReducer } from 'react'

const userInitialState = {
  auth: false,
  roleName: 'public',
  env: window.location.hostname === 'localhost' || window.location.hostname.startsWith("192.168.1") ? 'local' : 'prod'
}

export const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'update': return ({
      ...state,
      ...action.userData
    })
    case 'reset': return ({
      ...userInitialState
    })
    default: throw new Error('Unexpected action')
  }
}

export const UserProvider = (props) => {
  const userData = useReducer(userReducer, userInitialState)
  return (
    <UserContext.Provider value={userData}> 
      {props.children}
    </UserContext.Provider>
  )
}

export const UserConsumer = UserContext.Consumer
