import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  requestProfileSuccess,
  requestProfileFailed
} from "../actions/profileActions";
import { REQUEST_PROFILE } from "../../actionTypes";
import api from "../service/profileService";

function* fetchProfile(data) {
  try {
    let result = yield call(api.app.fetchProfile, data.data);
    yield put(requestProfileSuccess(result));
  } catch (error) {
    yield put(requestProfileFailed(error));
  }
}

function* watchFetchProfile() {
  yield takeEvery(REQUEST_PROFILE, fetchProfile);
}

export default function* profileSaga() {
  yield all([watchFetchProfile()]);
}
