import axios from "axios";
import { BACKENDPATH, BASE_URL } from "../utils/constants";
const backendPath = BASE_URL + BACKENDPATH;

const notificationsPrefix = backendPath + "notifications/v1";

export default {
  user: {
    register: data =>
      axios.post(notificationsPrefix + "/registerDevice", data).then(res => {
        return res.data;
      })
  }
};
