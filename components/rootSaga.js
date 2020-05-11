import loginLogoutSaga from "./login_logout/saga/loginLogoutSaga";
import profile from "./profile/saga/profileSaga";
import orderSaga from "./orders/saga/orderSaga";
import chatSaga from "./chat/saga/ChatSaga";
import pushNotificationsSaga from "./PushNotifications/pushNotifications.saga";

const sagas = [
  loginLogoutSaga,
  profile,
  orderSaga,
  chatSaga,
  pushNotificationsSaga
];

export const registerSagasWithMiddleware = function registerSagasWithMiddleware(
  sagaMiddleware
) {
  sagas.forEach(saga => {
    sagaMiddleware.run(saga);
  });
};
