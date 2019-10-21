import React from 'react'
import { Location, Router, Redirect } from '@reach/router'
import { UserConsumer } from '../context/User.context'

import HomePage from '../pages/Home'
import DashboardPage from '../pages/Dashboard'
import SigninCallbackPage from '../pages/SigninCallback'
import NotFoundPage from '../pages/NotFound'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <UserConsumer>
      {([state]) => {
        return state.auth ? <Component {...rest} /> : <Redirect from="" to="/" noThrow />
      }}
    </UserConsumer>
  )
}

export default () => (
  <Location>
  {({ location }) => (
    <Router location={location} primary={false}>
      <HomePage path='/' />
      <SigninCallbackPage path='/signin' />
      <PrivateRoute path='/dashboard' component={DashboardPage} />
      <NotFoundPage default />
    </Router>
  )}
  </Location>
)