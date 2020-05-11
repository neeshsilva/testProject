import {
  REQUEST_ORDERS,
  REQUEST_ORDERS_FAILED,
  REQUEST_ORDERS_SUCCESS,
  ATTEND_ORDER,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILED,
  CLOSE_ORDER,
  USER_LOGGED_OUT,
  REFRESH_ORDERS,
  CHANGE_FILTERING_STATE,
  CHANGE_TO_READY_TO_PICK_UP,
  CHANGE_TO_READY_TO_DELIEVER,
  SUCCESS_ORDER_STATE_CHANGE,
  ERROR_ORDER_STATE_CHANGE,
  CHANGE_TO_DISPATCHED,
  CHANGE_TO_PICK_UP,
  FORCE_LOGOUT_USER
} from "../../actionTypes";

const initState = {
  requestingOrders: false,
  orders: null,
  validSecretCode: "",
  errorMessage: null,
  orderLength: 0,
  previouseOrders: [],
  filteringState: ["PENDING"],
  requestOrderSuccess: false,
  previouseLength: 0,
  updatingOrder: false,
  refreshing: false
};

export default function orderReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_FILTERING_STATE:
      return {
        requestingOrders: false,
        orders: null,
        errorMessage: null,
        orderLength: 0,
        previouseOrders: [],
        filteringState: ["PENDING"],
        requestOrderSuccess: false,
        previouseLength: 0,
        updatingOrder: false,
        refreshing: false,
        validSecretCode: "",
        filteringState: action.data
      };
    case REQUEST_ORDERS:
      return {
        ...state,
        validSecretCode: "",
        requestingOrders: true,
        previouseOrders: action.data.orders,
        errorMessage: null
      };
    case REQUEST_ORDERS_SUCCESS:
      return {
        ...state,
        requestingOrders: false,
        requestOrderSuccess: true,
        orders: getOrders(action.data, state.previouseOrders).orders,
        orderLength: getOrders(action.data, state.previouseOrders).length,
        previouseLength: state.previouseOrders.length,
        errorMessage: null,
        refreshing: false
      };

    case REQUEST_ORDERS_FAILED:
      return {
        ...state,
        requestingOrders: false,
        requestOrderSuccess: false,
        orders: null,
        orderLength: 0,
        errorMessage: action.data,
        refreshing: false
      };

    case ATTEND_ORDER:
      return {
        ...state,
        updatingOrder: true,
        errorMessage: null
      };
    case CHANGE_TO_READY_TO_PICK_UP:
    case CHANGE_TO_READY_TO_DELIEVER:
    case CHANGE_TO_DISPATCHED:
    case CHANGE_TO_PICK_UP:
      return {
        ...state,
        validSecretCode: "",
        updatingOrder: true,
        errorMessage: null
      };
    case CLOSE_ORDER:
      return {
        ...state,
        updatingOrder: true,
        errorMessage: null
      };
    case ERROR_ORDER_STATE_CHANGE:
      return { ...state, updatingOrder: false, errorMessage: action.data };
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        updatingOrder: false,
        orders: updateOrder(action.data),
        errorMessage: null
      };
    case SUCCESS_ORDER_STATE_CHANGE:
      return {
        ...state,
        updatingOrder: false,
        orders: updateAttendedOrders(action.data),
        errorMessage: null
      };
    case UPDATE_ORDER_FAILED:
      return {
        ...state,
        updatingOrder: false,
        errorMessage: action.data
      };
    case REFRESH_ORDERS:
      return {
        ...state,
        validSecretCode: "",
        requestingOrders: true,
        errorMessage: null,
        orderLength: 0,
        previouseOrders: [],
        requestOrderSuccess: false,
        previouseLength: 0,
        updatingOrder: false,
        refreshing: true
      };
    case FORCE_LOGOUT_USER:
    case USER_LOGGED_OUT:
      return {
        ...state,
        validSecretCode: "",
        requestingOrders: false,
        orders: null,
        errorMessage: null,
        orderLength: 0,
        previouseOrders: [],
        requestOrderSuccess: false,
        previouseLength: 0,
        updatingOrder: false
      };

    default:
      return {
        ...state
      };
  }
}
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function getOrders(data, totalOrders) {
  let orders = data.groupedOrders;
  let newOrders = [];
  let modifedOrders = [];
  if (orders && orders.length > 0) {
    for (let i = 0; i < orders.length; i++) {
      let da = orders[i];
      let date = da.insertedDate;
      let dt = new Date(date);
      let month = monthNames[dt.getMonth()];
      let day = dt.getDate();
      let dayStr = month + " " + day;
      let dateOrders = da.orders;
      let newDate = {
        key: "date" + "_" + i,
        date: dayStr
      };
      modifedOrders.push(newDate);
      for (let i = 0; i < dateOrders.length; i++) {
        let or = dateOrders[i];
        let insertedTime = or.insertedDate;
        let insertedDate = new Date(insertedTime).getTime();
        let currentDate = new Date().getTime();
        let diff = currentDate - insertedDate;
        let days = diff / (1000 * 60 * 60 * 24);
        let noOfDays = Math.floor(days);
        let hours = diff / (1000 * 60 * 60);
        let modHours = Math.floor(hours);
        let modString = "";

        if (noOfDays > 0) {
          modString = noOfDays + " days ago";
        } else if (modHours > 0) {
          modString = modHours + " hours ago";
        } else {
          let minutes = diff / (1000 * 60);
          let modMin = Math.floor(minutes);

          if (modMin > 0) {
            modString = modMin + " min ago";
          } else {
            let seconds = diff / 1000;
            modString = seconds + " sec ago";
          }
        }
        or.key = or._id;
        or.time = modString;
        if (or.type === "IN_STORE_PICKUP" || or.type === "Pickup") {
          or.type = "Pickup";
        } else if (or.type === "DELIVERY" || or.type === "Delivery") {
          or.type = "Delivery";
        }

        let items = or.itemInfo;

        if (items && items.length > 0) {
          for (let pr of items) {
            pr.key = pr._id;
          }
        }
        or.changingState = false;
        modifedOrders.push(or);
      }
    }

    if (totalOrders) {
      newOrders = fillOrderArray(modifedOrders, totalOrders);
    } else {
      newOrders = modifedOrders;
    }
  }
  return { orders: newOrders, length: newOrders.length };
}

function getLength(data) {
  let orders = data.groupedOrders;
  return { length: orders ? orders.length : 0 };
}

function fillOrderArray(orders, totalArray) {
  let newArray = [];
  let tobeInsterted = [];

  if (totalArray.length > 0) {
    tobeInsterted.push(...totalArray);
  }

  if (orders && orders.length > 0) {
    for (let order of orders) {
      let inserted = true;
      if (totalArray.length > 0) {
        for (let ex of totalArray) {
          if (order.key === ex.key) {
            inserted = false;
          }
        }
        if (inserted) {
          tobeInsterted.push(order);
        }
      } else {
        tobeInsterted.push(order);
      }
    }
  }

  if (tobeInsterted.length > 0) {
    newArray.push(...tobeInsterted);
  }

  return newArray;
}

function updateOrder(data) {
  let newArray = [];
  let filteredArray = [];
  let orderArray = data.orders;
  let orderId = data.orderId;

  let prevoiuse, current;

  if (orderArray && orderArray.length > 0) {
    for (let ar of orderArray) {
      if (orderId !== ar.key) {
        newArray.push(ar);
      }
    }
  }

  if (newArray.length > 0) {
    for (let nw of newArray) {
      current = nw;
      if (prevoiuse) {
        if (prevoiuse.date && current.date) {
        } else {
          filteredArray.push(prevoiuse);
        }
      }
      prevoiuse = current;
    }
    if (!current.date) {
      filteredArray.push(current);
    }
  }

  return filteredArray;
}

function updateAttendedOrders(data) {
  let newArray = [];
  let filteredArray = [];
  let orderArray = data.orders;
  let orderId = data.orderId;
  let newState = data.newState;

  let prevoiuse, current;

  if (orderArray && orderArray.length > 0) {
    for (let ar of orderArray) {
      if (orderId !== ar.key) {
        newArray.push(ar);
      } else {
        newArray.push({ ...ar, state: newState });
      }
    }
  }

  if (newArray.length > 0) {
    for (let nw of newArray) {
      current = nw;
      if (prevoiuse) {
        if (prevoiuse.date && current.date) {
        } else {
          filteredArray.push(prevoiuse);
        }
      }
      prevoiuse = current;
    }
    if (!current.date) {
      filteredArray.push(current);
    }
  }

  return filteredArray;
}
