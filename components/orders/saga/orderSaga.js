import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  requestOrderFailed,
  requestOrderSuccess,
  updateOrderSuccess,
  updateOrderFailed,
  changeOrderStateSuccess,
  errorChangingState
} from "../actions/orderActions";
import {
  REQUEST_ORDERS,
  ATTEND_ORDER,
  CLOSE_ORDER,
  REFRESH_ORDERS,
  CHANGE_TO_READY_TO_PICK_UP,
  CHANGE_TO_READY_TO_DELIEVER,
  CHANGE_TO_DISPATCHED,
  CHANGE_TO_PICK_UP,
  SEND_NOTIFICATION_TOKEN
} from "../../actionTypes";
import orderAPI from "../service/orderService";

function* requestOrders(data) {
  try {
    let result = yield call(orderAPI.app.getOrders, data.data);
    yield put(requestOrderSuccess(result));
  } catch (error) {
    yield put(requestOrderFailed(error));
  }
}

function* refreshOrders(data) {
  try {
    let result = yield call(orderAPI.app.getOrders, data.data);
    yield put(requestOrderSuccess(result));
  } catch (error) {
    yield put(requestOrderFailed(error));
  }
}
function* attendOrder(data) {
  try {
    let orgData = data.data;
    let payload = orgData.payload;
    let py = { orderId: orgData.orderId, token: payload.token };
    yield call(orderAPI.app.attendOrderAPI, py);
    let obj = { orderId: orgData.orderId, orders: payload.orders };
    yield put(updateOrderSuccess(obj));
  } catch (error) {
    yield put(updateOrderFailed(error));
  }
}

function* closeOrder(data) {
  try {
    let orgData = data.data;
    let payload = orgData.payload;
    let py = {
      orderId: orgData.orderId,
      releaseItems: true,
      token: payload.token
    };
    yield call(orderAPI.app.closeOrderAPI, py);
    let reO = { orderId: orgData.orderId, token: payload.token };
    yield call(orderAPI.app.refundClosingAPI, reO);
    let obj = { orderId: orgData.orderId, orders: payload.orders };
    yield put(updateOrderSuccess(obj));
  } catch (error) {
    yield put(updateOrderFailed(error));
  }
}

function* changeToDeliver({ data }) {
  try {
    let py = {
      orderId: data.orderId,
      releaseItems: true,
      token: data.token
    };
    yield call(orderAPI.app.readyToDeliverAPI, py);
    yield put(
      changeOrderStateSuccess({
        orderId: data.orderId,
        newState: "READY_TO_DELIVER",
        orders: data.payload.orders
      })
    );
  } catch (error) {
    yield put(errorChangingState(error));
  }
}

function* changeToPickUp({ data }) {
  try {
    let py = {
      orderId: data.orderId,
      releaseItems: true,
      token: data.token
    };
    yield call(orderAPI.app.readyToPickupAPI, py);
    yield put(
      changeOrderStateSuccess({
        orderId: data.orderId,
        newState: "READY_TO_PICK_UP",
        orders: data.payload.orders
      })
    );
  } catch (error) {
    yield put(errorChangingState(error));
  }
}

function* changeToDispatchedState({ data }) {
  try {
    let py = {
      orderId: data.orderId,
      releaseItems: true,
      token: data.token
    };
    yield call(orderAPI.app.changeToDispatched, py);
    yield put(
      changeOrderStateSuccess({
        orderId: data.orderId,
        newState: "DISPATCHED",
        orders: data.payload.orders
      })
    );
  } catch (error) {
    yield put(errorChangingState(error));
  }
}

function* changeToPickUpState({ data }) {
  try {
    let py = {
      orderId: data.orderId,
      releaseItems: true,
      token: data.token,
      secret: data.secretCode
    };
    yield call(orderAPI.app.orderPickedUpAPI, py);
    yield put(
      changeOrderStateSuccess({
        orderId: data.orderId,
        newState: "COMPLETED",
        orders: data.payload.orders
      })
    );
  } catch (error) {
    let errorDetailsStr = JSON.stringify(error);
    let errorJson = JSON.parse(errorDetailsStr);
    let errMessage = JSON.parse(
      errorJson.response
        ? errorJson.response.data
          ? errorJson.response.data.message
          : "{}"
        : "{}"
    );
    if (errMessage.code === 20039) {
      yield put(errorChangingState({ message: "Invalid secret code" }));
    } else {
      yield put(errorChangingState(error));
    }
  }
}

function* sendToken({ data }) {
  try {
    yield call(orderAPI.app.sendToken, data);
  } catch (err) {}
}

function* watchSendNotificationToken() {
  yield takeLatest(SEND_NOTIFICATION_TOKEN, sendToken);
}

function* watchRequestOrders() {
  yield takeEvery(REQUEST_ORDERS, requestOrders);
}

function* watchRefreshOrders() {
  yield takeEvery(REFRESH_ORDERS, refreshOrders);
}
function* watchAttendOrder() {
  yield takeEvery(ATTEND_ORDER, attendOrder);
}

function* watchCloseOrder() {
  yield takeEvery(CLOSE_ORDER, closeOrder);
}

function* watchChangeToReadyToPickUp() {
  yield takeLatest(CHANGE_TO_READY_TO_PICK_UP, changeToPickUp);
}

function* watchChangeToReadyToDeliver() {
  yield takeLatest(CHANGE_TO_READY_TO_DELIEVER, changeToDeliver);
}

function* watchChangeToDispatched() {
  yield takeLatest(CHANGE_TO_DISPATCHED, changeToDispatchedState);
}

function* watchChangeToPickUp() {
  yield takeLatest(CHANGE_TO_PICK_UP, changeToPickUpState);
}

export default function* orderSaga() {
  yield all([
    watchRequestOrders(),
    watchAttendOrder(),
    watchCloseOrder(),
    watchRefreshOrders(),
    watchChangeToReadyToDeliver(),
    watchChangeToReadyToPickUp(),
    watchChangeToDispatched(),
    watchChangeToPickUp(),
    watchSendNotificationToken()
  ]);
}
