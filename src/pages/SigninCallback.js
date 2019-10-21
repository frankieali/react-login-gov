import React, { useContext, useEffect, useState } from 'react';
import { navigate } from '@reach/router'
import logo from '../logo.svg'
import spinner from '../loading.svg'

import { AuthContext } from '../context/Auth.context'
import { UserContext } from '../context/User.context'
import { api } from '../api'
import { formatPhoneNumber } from '../utils'

const SignInCallback = (props) => {
  const [status,setStatus] = useState()
  const [userContext, dispatch] = useContext(UserContext)
  const authContext = useContext(AuthContext)
  const { auth, env } = userContext
  const { signinRedirectCallback, navigateToScreen } = authContext

  useEffect(() => {
    
    signinRedirectCallback().then(async resp => {

      // uuid and email returned from OIDC
      const uuid = resp.profile.sub
      const email = resp.profile.email

      // fetch a token from your application
      const {token} = await api[env].fetchToken({uuid, id_token:resp.id_token})

      // fetch user data from your application - matching the uuid returned from OIDC
      const user = await api[env].fetchUser({uuid, token}).then(data => {

        if(data.constructor.name !== 'Error'){
          const userData = {
            ...data,
            email,
            lastLogin: new Date(data.lastLogin).toDateString(),
            phoneNumber: formatPhoneNumber(data.phoneNumber), //format "phoneNumber" field
          }

          return userData

        } else {
          throw new Error(`Sorry, but either you have not been signed up for the Biobank Program, your account has not been activated yet, or your account has been closed. Please contact your Clinical Research Coordinator for assistance.`)
        }
      })

      dispatch({
        type: 'update',
        userData: {
          jti: resp.profile.jti,
          auth: true,
          token,
          ...user
        }
      })
      
    }).catch(error => {
      localStorage.clear();
      dispatch({
        type: 'reset'
      })
      setStatus(error.message)
    })
  }, [dispatch, env, signinRedirectCallback])

  useEffect(() => {
    if(auth){
      // use stored path to return to page user originated login from
      // navigateToScreen()

      // force navigation to admin dashboard page
      navigate('/dashboard')
    }
  }, [auth, navigateToScreen])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="loading">
          <img src={spinner} alt="loading" width="100" /><h6>Loading User Data...</h6>
        </div>
        {status && <p>Error: {status}</p>}
      </header>
    </div>
  )
}

export default SignInCallback