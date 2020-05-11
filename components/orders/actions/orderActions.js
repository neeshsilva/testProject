import {
  REQUEST_ORDERS,
  REQUEST_ORDERS_FAILED,
  REQUEST_ORDERS_SUCCESS,
  ATTEND_ORDER,
  CLOSE_ORDER,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILED,
  REFRESH_ORDERS,
  CHANGE_FILTERING_STATE,
  CHANGE_TO_READY_TO_DELIEVER,
  CHANGE_TO_READY_TO_PICK_UP,
  SUCCESS_ORDER_STATE_CHANGE,
  ERROR_ORDER_STATE_CHANGE,
  CHANGE_TO_DISPATCHED,
  CHANGE_TO_PICK_UP,
  SEND_NOTIFICATION_TOKEN
} from "../../actionTypes";

export const requestOrders = data => ({
  type: REQUEST_ORDERS,
  data
});

export const requestOrderSuccess = data => ({
  type: REQUEST_ORDERS_SUCCESS,
  data
});

export const changeToReadyToDeliever = data => ({
  type: CHANGE_TO_READY_TO_DELIEVER,
  data
});

export const changeToReadyToPickup = data => ({
  type: CHANGE_TO_READY_TO_PICK_UP,
  data
});

export const changeToDispatched = data => ({
  type: CHANGE_TO_DISPATCHED,
  data
});

export const changeToPickUp = data => ({
  type: CHANGE_TO_PICK_UP,
  data
});

export const invalidSecretCode = data => ({
  type: INVALID_SECRET_CODE,
  data
});

export const changeOrderStateSuccess = data => ({
  type: SUCCESS_ORDER_STATE_CHANGE,
  data
});

export const errorChangingState = data => ({
  type: ERROR_ORDER_STATE_CHANGE,
  data
});

export const changeFilteringState = data => ({
  type: CHANGE_FILTERING_STATE,
  data
});

export const requestOrderFailed = data => ({
  type: REQUEST_ORDERS_FAILED,
  data
});

export const attendOrder = data => ({
  type: ATTEND_ORDER,
  data
});

export const refreshOrder = data => ({
  type: REFRESH_ORDERS,
  data
});

export const closeOrder = data => ({
  type: CLOSE_ORDER,
  data
});

export const updateOrderSuccess = data => ({
  type: UPDATE_ORDER_SUCCESS,
  data
});

export const updateOrderFailed = data => ({
  type: UPDATE_ORDER_FAILED,
  data
});

export const sendNotificationToken = data => ({
  type: SEND_NOTIFICATION_TOKEN,
  data
});
