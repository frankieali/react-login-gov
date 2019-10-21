import { IDENTITY_CONFIG, METADATA_OIDC } from "./authConfig"
import { UserManager, WebStorageStateStore, Log } from "oidc-client"
import { navigate } from '@reach/router'

export default class AuthService {
  UserManager;
  accessToken;

  constructor() {
    this.UserManager = new UserManager({
      ...IDENTITY_CONFIG,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      metadata: {
        ...METADATA_OIDC
      }
    });
    // Logger
    Log.logger = console;
    Log.level = Log.DEBUG;

    this.signinCallbackPath = 'signin'

    this.UserManager.events.addUserLoaded(user => {
      this.setUserInfo({
        accessToken: user.access_token,
        idToken: user.id_token
      });
      // if (window.location.href.indexOf(this.signinCallbackPath) !== -1) {
      //   this.navigateToScreen();
      // }
    });
    this.UserManager.events.addSilentRenewError(e => {
      console.log("silent renew error", e.message);
    });

    this.UserManager.events.addAccessTokenExpired(() => {
      console.log("token expired");
      this.signinSilent();
    });
  }

  signinRedirectCallback = () => {
    return this.UserManager.signinRedirectCallback()
  };

  getUser = async () => {
    const user = await this.UserManager.getUser();
    if (!user) {
      return await this.UserManager.signinRedirectCallback();
    }
    return user;
  };

  parseJwt = token => {
    const base64Url = token.split(".")[1];
    if(base64Url) {
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    } else {
      try {
        const parsedToken = JSON.parse(window.atob(token))
        return parsedToken
      }
      catch(error) {
        console.log(error.message)
        return token
      }
    }
  };

  setUserInfo = authResult => {
    const accessData = this.parseJwt(authResult.accessToken);
    const idData = this.parseJwt(authResult.idToken);

    // attempt to normalize result data
    const data1 = typeof accessData === 'string' ? {accessToken: authResult.accessToken} : {...accessData}
    const data2 = typeof idData === 'string' ? {idToken: authResult.idToken} : {...idData}

    const data = {
      ...data1,
      ...data2
    }

    this.setSessionInfo(authResult);
    this.setUser(data);
  };

  signinRedirect = () => {
    localStorage.setItem("redirectUri", window.location.pathname);
    this.UserManager.signinRedirect({});
  };

  setUser = data => {
    localStorage.setItem("userId", data.sub);
  };

  navigateToScreen = () => {
    const redirectUri = !!localStorage.getItem("redirectUri")
      ? localStorage.getItem("redirectUri")
      : "/dashboard";

    navigate(redirectUri);
  };

  setSessionInfo(authResult) {
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
  }

  isAuthenticated = () => {
    const access_token = localStorage.getItem("access_token");
    return !!access_token;
  };

  signinSilent = () => {
    this.UserManager.signinSilent()
      .then(user => {
        console.log("signed in", user);
      })
      .catch(err => {
        console.log(err);
      });
  };
  signinSilentCallback = () => {
    this.UserManager.signinSilentCallback();
  };

  createSigninRequest = () => {
    return this.UserManager.createSigninRequest();
  };

  logout = () => {
    this.UserManager.signoutRedirect({
      id_token_hint: localStorage.getItem("id_token")
    });
    this.UserManager.clearStaleState();
  };

  signoutRedirectCallback = () => {
    this.UserManager.clearStaleState();
    this.UserManager.signoutRedirectCallback().then(() => {
      localStorage.clear();
      // window.location.replace(process.env.REACT_APP_PUBLIC_URL);
      navigate(process.env.REACT_APP_PUBLIC_URL)
    });
  };
}