import React, { useContext } from 'react'
import { UserContext } from '../context/User.context'
import { AuthContext } from '../context/Auth.context'

export default () => {
  const [userContext, dispatch] = useContext(UserContext)
  const { signinRedirect, signoutRedirectCallback } = useContext(AuthContext)
  const { auth } = userContext

  const handleClick = () => {
    if(auth) {
      // reset user data and log-out
      signoutRedirectCallback()
      dispatch({
        type: 'reset'
      })
    } else {
      // Using openID to redirect to login.gov
      signinRedirect()
    }
  }
  return (
    <button className="login-button" onClick={handleClick}>
      Sign {auth ? 'Out' : 'In'}
    </button>
  )
}