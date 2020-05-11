import {
  _PUSH_NOTIFICATIONS_REGISTER_USER,
  _PUSH_NOTIFICATIONS_REGISTER_USER_FAILED,
  _PUSH_NOTIFICATIONS_REGISTER_USER_SUCCESS,
  _PUSH_NOTIFICATIONS_UNREGISTER_USER,
  USER_LOGGED_OUT
} from "./NotificationActions";

const initState = {
  registered: false,
  registering: false
};

export default function pushNotificationsReducer(state = initState, action) {
  switch (action.type) {
    case _PUSH_NOTIFICATIONS_REGISTER_USER: {
      return { ...state, registering: true };
    }
    case _PUSH_NOTIFICATIONS_REGISTER_USER_SUCCESS: {
      return { ...state, registered: true, registering: false };
    }
    case _PUSH_NOTIFICATIONS_REGISTER_USER_FAILED: {
      return { ...state, registered: false, registering: false };
    }
    case _PUSH_NOTIFICATIONS_UNREGISTER_USER:
    case USER_LOGGED_OUT: {
      return {
        ...initState
      };
    }
    default:
      return { ...state };
  }
}
