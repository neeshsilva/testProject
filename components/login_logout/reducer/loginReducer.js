import { removeAll, storeData } from "../../utils/storage";

import {
  USER_INVALID_CREDENTIALS,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_LOGGING_SUCCESS,
  FORCE_LOGOUT_USER
} from "../../actionTypes";

const initState = {
  loginState: false,
  loginSuccess: false,
  loginFailed: false,
  errorMessage: null,
  user: null,
  token: null
};

const saveDataToStorage = action => {
  storeData("token", action.data.token);
  storeData(
    "authenticationId",
    action.data ? action.data.data.user.authenticationId : ""
  );
  storeData("refreshToken", action.data ? action.data.refreshToken : "");
  storeData("user", JSON.stringify(action.data.data || {}));
};

export default function loginReducer(state = initState, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        loginState: true,
        loginSuccess: false,
        errorMessage: null,
        user: null,
        token: null
      };
    case USER_LOGGING_SUCCESS:
      // saveDataToStorage(action);
      return {
        ...state,
        loginState: false,
        loginSuccess: true,
        errorMessage: null,
        user: action.data.data,
        token: action.data.token
      };
    case USER_INVALID_CREDENTIALS:
      return {
        ...state,
        loginState: false,
        loginSuccess: false,
        errorMessage: action.data,
        user: null,
        token: null
      };
    case FORCE_LOGOUT_USER:
    case USER_LOGGED_OUT:
      removeAll();
      return {
        ...state,
        loginState: false,
        loginSuccess: false,
        errorMessage: null,
        loginFailed: false,
        user: null,
        token: null
      };
    default:
      return {
        ...state
      };
  }
}
