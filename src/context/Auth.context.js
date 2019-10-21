import React, { createContext } from "react";
import AuthService from "../login/authServices";

export const AuthContext = createContext({
    signinRedirectCallback: () => ({}),
    logout: () => ({}),
    signoutRedirectCallback: () => ({}),
    isAuthenticated: () => ({}),
    signinRedirect: () => ({}),
    signinSilentCallback: () => ({}),
    createSigninRequest: () => ({})
});

export const AuthProvider = (props) => {
  const authService = new AuthService()
  return (
    <AuthContext.Provider value={authService}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer;