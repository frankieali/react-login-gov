import { randomString } from '../utils'

export const IDENTITY_CONFIG = {
  authority: process.env.REACT_APP_AUTH_URL, //(string): The URL of the OIDC provider.
  client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID, //(string): Your client application's identifier as registered with the OIDC provider.
  redirect_uri: process.env.REACT_APP_REDIRECT_URL, //The URI of your client application to receive a response from the OIDC provider.
  // login: process.env.REACT_APP_AUTH_URL + "/login",
  // automaticSilentRenew: false, //(boolean, default: false): Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration.
  loadUserInfo: false, //(boolean, default: true): Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
  // silent_redirect_uri: process.env.REACT_APP_SILENT_REDIRECT_URL, //(string): The URL for the page containing the code handling the silent renew.
  post_logout_redirect_uri: process.env.REACT_APP_LOGOFF_REDIRECT_URL, // (string): The OIDC post-logout redirect URI.
  // audience: "https://example.com", //is there a way to specific the audience when making the jwt
  acr_values: "http://idmanagement.gov/ns/assurance/loa/1",
  response_type: "code", //(string, default: 'code')
  prompt: "login", // This can either be select_account (default behavior) or login (force a re-authorization even if a current IdP session is active).
  scope: "openid email", //(string, default: 'openid'): The scope being requested from the OIDC provider.
  webAuthResponseType: "id_token token",
  // state: randomString(32), // state is being set by the oidc-client.UserManager
  extraQueryParams: {
    nonce: randomString(32),
  }
}

export const METADATA_OIDC = {

  issuer: "https://idp.int.identitysandbox.gov/",
  jwks_uri: process.env.REACT_APP_AUTH_URL + "/.well-known/openid-configuration",
  authorization_endpoint: process.env.REACT_APP_AUTH_URL + "/openid_connect/authorize",
  token_endpoint: process.env.REACT_APP_AUTH_URL + "/api/openid_connect/token",
  userinfo_endpoint: process.env.REACT_APP_AUTH_URL + "/api/openid_connect/userinfo",
  certificates_endpoint: process.env.REACT_APP_AUTH_URL + "/api/openid_connect/certs",
  end_session_endpoint: process.env.REACT_APP_AUTH_URL + "/openid_connect/logout",
  // check_session_iframe: process.env.REACT_APP_AUTH_URL + "/api/openid_connect/checksession",
  // revocation_endpoint: process.env.REACT_APP_AUTH_URL + "/api/openid_connect/revocation",
  // introspection_endpoint: process.env.REACT_APP_AUTH_URL + "/api/openid_connect/introspect"
}
