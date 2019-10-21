import React from 'react'
import './App.css'
import Routes from './router/routes'
import { AuthProvider } from './context/Auth.context'
import { UserProvider } from './context/User.context'

// TODO:
// set up tier config in package.json: ./node_modules/.bin/env-cmd -e ${TIER} npm run build

export default () => (
  <AuthProvider>
    <UserProvider>
      <Routes />
    </UserProvider>
  </AuthProvider>
)
