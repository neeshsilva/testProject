import {
  _PUSH_NOTIFICATIONS_REGISTER_USER,
  _PUSH_NOTIFICATIONS_REGISTER_USER_FAILED,
  _PUSH_NOTIFICATIONS_REGISTER_USER_SUCCESS,
  _PUSH_NOTIFICATIONS_UNREGISTER_USER
} from "./NotificationActions";

export const registerUser = payload => ({
  type: _PUSH_NOTIFICATIONS_REGISTER_USER,
  payload
});

export const registerUserSuccess = payload => ({
  type: _PUSH_NOTIFICATIONS_REGISTER_USER_SUCCESS,
  payload
});

export const registerUserFailed = payload => ({
  type: _PUSH_NOTIFICATIONS_REGISTER_USER_FAILED,
  payload
});

export const unregisterUser = payload => ({
  type: _PUSH_NOTIFICATIONS_UNREGISTER_USER,
  payload
});
