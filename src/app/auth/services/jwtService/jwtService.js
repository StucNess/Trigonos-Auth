import FuseUtils from "@fuse/utils/FuseUtils";
import history from "@history";
import axios from "axios";
import jwtDecode from "jwt-decode";
import jwtServiceConfig from "./jwtServiceConfig";

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    // localStorage.removeItem("token");
    // delete axios.defaults.headers.common.Authorization;
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      }
      // (err) => {
      //   return new Promise((resolve, reject) => {
      //     if (
      //       err.response.status === 401 &&
      //       err.config &&
      //       !err.config.__isRetryRequest
      //     ) {
      //       // if you ever get an unauthorized response, logout the user
      //       this.emit("onAutoLogout", "Invalid access_token");
      //       this.setSession(null);
      //     }
      //     throw err;
      //   });
      // }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data).then((response) => {
        if (response.data.username) {
          this.setSession(response.data.token);
          resolve(response.data.username);
          this.emit("onLogin", response.data.username);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signIn, {
          email,
          password,
        })
        .then((response) => {
          if (response.data.username) {
            const json = {
              role: response.data.role,
              data: {
                displayName: response.data.username,
                email: response.data.email,
              },
            };
            this.setSession(response.data.token);
            resolve(json);
            this.emit("onLogin", json);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(jwtServiceConfig.accessToken, {
          data: {
            access_token: this.getAccessToken(),
          },
        })
        .then((response) => {
          if (response.data.username) {
            this.setSession(response.data.token);
            console.log(response);

            const json = {
              role: response.data.role,
              data: {
                displayName: response.data.username,
                email: response.data.email,
              },
            };
            resolve(json);
          } else {
            this.logout();
            reject(new Error("Failed to login with token."));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error("Failed to login with token."));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("token", access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit("onLogout", "Logged out");
    history.push("/sign-in");
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    }
    return true;
  };

  getAccessToken = () => {
    // console.log(window.localStorage.getItem("token"));
    return window.localStorage.getItem("token");
  };
}

const instance = new JwtService();

export default instance;