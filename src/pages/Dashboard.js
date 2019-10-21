import React, { useContext } from 'react'
import logo from '../logo.svg'
import LoginButton from '../login/LoginButton'
import { Link } from '@reach/router'

import { UserContext } from '../context/User.context'

const Dashboard = () => {
  const [userContext, dispatch] = useContext(UserContext)
  const { userFirstName, userLastName, lastLogin } = userContext
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome <strong>{userFirstName} {userLastName}</strong> to the private Dashboard page.</p>
        <p>You last logged in on {lastLogin}</p>
        <p><Link to="/">Return to home page</Link></p>
        <LoginButton />
      </header>
    </div>
  )
}

export default Dashboard