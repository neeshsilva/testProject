import { combineReducers } from "redux";

import login from "./login_logout/reducer/loginReducer";
import profile from "./profile/reducer/profileReducer";
import orders from "./orders/reducer/orderReducer";
import chat from "./chat/reducers/ChatReducer";
import pushNotificationsReducer from "./PushNotifications/pushNotifications.reducer";

export default combineReducers({
  login,
  profile,
  orders,
  chat,
  pushNotifications: pushNotificationsReducer
});
