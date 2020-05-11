import axios from "axios";
import { BACKENDPATH, BASE_URL } from "../../utils/constants";
const backendPath = BASE_URL + BACKENDPATH;
const chatPrefix = "chat/v1";
const userPrefix = "users/v1";

let config = {
  headers: {
    isMobile: true
  }
};
export default {
  app: {
    sendMessage: data => {
      let token = data.token;
      delete data.token;
      config.headers.token = token;
      return axios
        .post(backendPath + chatPrefix + "/sendChatMessageToUser", data, config)
        .then(response => response);
    },
    getLastChattedUsers: data => {
      let token = data.token;
      delete data.token;
      config.headers.token = token;
      return axios
        .get(
          backendPath +
            chatPrefix +
            `/getLastChattedUsers?skip=${data.skip}&limit=${data.limit}`,
          config
        )
        .then(res => {
          return res.data;
        });
    },
    getUserProfile: data => {
      let token = data.token;
      delete data.token;
      config.headers.token = token;
      return axios
        .get(
          backendPath + userPrefix + `/getUserProfile?userId=${data.userId}`,
          config
        )
        .then(response => response);
    },
    getChatHistory: data => {
      let token = data.token;
      delete data.token;
      config.headers.token = token;
      return axios
        .get(
          backendPath +
            chatPrefix +
            `/getChatHistoryOfGivenUser?userId=${data.otherUserId}&skip=${data.skip}&limit=${data.limit}`,
          config
        )
        .then(response => response);
    }
  }
};
