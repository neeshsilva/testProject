import axios from "axios";
import { BACKENDPATH, BASE_URL } from "../../utils/constants";
const backendPath = BASE_URL + BACKENDPATH + "orders/v1";
let config = {
  headers: {
    isMobile: true
  }
};
export default {
  app: {
    sendToken: data => {
      return axios
        .post(BASE_URL + BACKENDPATH + "notifications/v1/registerDevice", data)
        .then(res => res.data);
    },
    getOrders: data => {
      let token = data.token;
      delete data.token;
      delete data.orders;
      config.headers.token = token;
      return axios
        .post(
          backendPath + "/getRetailerOrdersGroupByInsertedDate",
          data,
          config
        )
        .then(res => {
          return res.data;
        });
    },
    attendOrderAPI: data => {
      let token = data.token;
      delete data.token;
      delete data.orders;
      config.headers.token = token;
      return axios
        .post(backendPath + "/attendOrder", data, config)
        .then(res => {
          return res.data;
        });
    },
    readyToDeliverAPI: data => {
      let token = data.token;
      delete data.token;
      config.headers.token = token;
      return axios
        .post(`${backendPath}/readyToDeliverOrder`, data, config)
        .then(res => {
          return res;
        });
    },
    readyToPickupAPI: data => {
      let token = data.token;
      delete data.token;
      config.headers.token = token;
      return axios
        .post(`${backendPath}/readyToPickUpOrder`, data, config)
        .then(res => {
          return res;
        });
    },
    changeToDispatched: data => {
      let token = data.token;
      delete data.token;
      config.headers.token = token;
      return axios
        .post(`${backendPath}/dispatchOrder`, data, config)
        .then(res => {
          return res;
        });
    },
    orderPickedUpAPI: data => {
      let token = data.token;
      delete data.token;
      delete data.orders;
      config.headers.token = token;
      return axios
        .post(backendPath + "/completePickupOrderByRetailer", data, config)
        .then(res => {
          return res.data;
        });
    },

    closeOrderAPI: data => {
      let token = data.token;
      delete data.token;
      delete data.orders;
      config.headers.token = token;
      return axios.post(backendPath + "/closeOrder", data, config).then(res => {
        return res.data;
      });
    },
    refundClosingAPI: data => {
      let token = data.token;
      delete data.token;
      delete data.orders;
      config.headers.token = token;
      return axios
        .post(backendPath + "/sampathIPG/refundClosing", data, config)
        .then(res => {
          return res.data;
        });
    }
  }
};
