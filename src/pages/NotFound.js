import React from 'react'
import { Link } from '@reach/router'
import logo from '../logo.svg'

export default () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>
        404: Page not found - <Link to='/'>Return to home page</Link>
      </h2>
    </header>
  </div>
)
