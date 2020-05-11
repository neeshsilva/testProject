import { all, call, put, takeEvery } from "redux-saga/effects";
import { loginSuccess, userLoginFailed } from "../actions/loginLogoutActions";
import { USER_LOGGED_IN } from "../../actionTypes";
import loginAPI from "../service/loginLogoutService";
import { registerForPushNotifications } from "../../PushNotifications/PushNotificationManagement";
import { storeData } from "../../utils/storage";
import { USER_ID } from "../../utils/constants";

function* login(data) {
  try {
    let result = yield call(loginAPI.app.loginAction, data.data);
    yield put(loginSuccess(result));
    registerForPushNotifications(
      result ? result.data.user.authenticationId : ""
    );
  } catch (error) {
    yield put(userLoginFailed(error));
  }
}

function* watchLogin() {
  yield takeEvery(USER_LOGGED_IN, login);
}

export default function* loginLogoutSaga() {
  yield all([watchLogin()]);
}
