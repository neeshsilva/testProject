import { initializeFirebaseMessaging } from "./firebase-notifications-connector";
import { store } from "../../Root";
import { receiveMessage } from "../chat/actions/ChatActions";
import {
  CHAT_MESSAGE,
  ORDER_CANCELLED,
  ORDER_COMPLETED,
  ORDER_PAID,
  ORDER_PLACED
} from "./notification-types";
import { submitAlert } from "../alert/actions/alertActions";
import { alertTypes } from "../alert/alert.conf";
import { registerUser, registerUserFailed } from "./pushNotifications.actions";

const handleNotificationPayload = async payload => {
  const state = store.getState();
  let registered =
    state && state.pushNotifications
      ? state.pushNotifications.registered
      : false;
  let userId = state.login.user ? state.login.user.user._id : "";
  if (!userId || !registered) {
    return;
  }
  if (payload && payload.data) {
    switch (payload.data.type) {
      case CHAT_MESSAGE:
        if (userId === payload.data.receiverId) {
          store.dispatch(
            submitAlert(
              `${payload.data.title}: ${payload.data.body}...`,
              alertTypes.default
            )
          );
        }
        store.dispatch(receiveMessage({ ...payload, userId }));
        break;
      case ORDER_PLACED:
      case ORDER_PAID:
      case ORDER_CANCELLED:
      case ORDER_COMPLETED:
        store.dispatch(submitAlert(payload.data.body, alertTypes.default));
        break;
      default:
        break;
    }
  }
};

export const registerForPushNotifications = userId => {
  const state = store.getState();
  let registered =
    state && state.pushNotifications
      ? state.pushNotifications.registered
      : false;
  let registering =
    state && state.pushNotifications
      ? state.pushNotifications.registering
      : false;
  if (userId && !registered && !registering) {
    initializeFirebaseMessaging(
      userId,
      payload => store.dispatch(registerUser(payload)),
      handleNotificationPayload
    )
      .then()
      .catch(payload => store.dispatch(registerUserFailed(payload)));
  }
};
