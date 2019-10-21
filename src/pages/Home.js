import React from 'react'
import logo from '../logo.svg'
import LoginButton from '../login/LoginButton'


export default () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Login demo with <a href="https://github.com/IdentityModel/oidc-client-js" target="_blank" rel="noopener noreferrer"><code>oidc-client</code></a> and <a href="https://login.gov/" target="_blank" rel="noopener noreferrer">Login.gov</a>
      </p>
      <LoginButton />
    </header>
  </div>
)