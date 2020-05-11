import {
  USER_LOGGED_IN,
  USER_LOGGING_SUCCESS,
  USER_INVALID_CREDENTIALS,
  USER_LOGGED_OUT,
  FORCE_LOGOUT_USER
} from "../../actionTypes";

export const login = data => ({
  type: USER_LOGGED_IN,
  data
});

export const loginSuccess = data => ({
  type: USER_LOGGING_SUCCESS,
  data
});

export const userLoginFailed = data => ({
  type: USER_INVALID_CREDENTIALS,
  data
});

export const logOut = () => ({
  type: USER_LOGGED_OUT
});

export const forceLogout = data => ({
  type: FORCE_LOGOUT_USER,
  data
});
