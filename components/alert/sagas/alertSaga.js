import { takeLatest, all } from "redux-saga/effects";
import { SUBMIT_ALERT } from "../../actionTypes";

function* alert(action) {
  // console.log(action);
  // if (action && action.payload)
  //   notification[action.payload.type]({
  //     message: action.payload.message,
  //     description: action.payload.description
  //   });
}

function* watchAlert() {
  yield takeLatest(SUBMIT_ALERT, alert);
}

// single entry point to start all Sagas at once
export default function* alertSaga() {
  yield all([watchAlert()]);
}
