import { all, call, put, takeEvery } from "redux-saga/effects";
import api from "./pushNotifications.api";

import { _PUSH_NOTIFICATIONS_REGISTER_USER } from "./NotificationActions";
import {
  registerUserFailed,
  registerUserSuccess
} from "./pushNotifications.actions";

function* registerUser(action) {
  try {
    yield call(api.user.register, action.payload);
    yield put(registerUserSuccess({ id: action.payload.id }));
  } catch (err) {
    console.log(err);
    yield put(registerUserFailed({ id: action.payload.id }));
  }
}

function* watchRegisterUser() {
  yield takeEvery(_PUSH_NOTIFICATIONS_REGISTER_USER, registerUser);
}

export default function* pushNotificationsSaga() {
  yield all([watchRegisterUser()]);
}
