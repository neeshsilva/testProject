import axios from "axios";

import { BACKENDPATH, BASE_URL } from "../../utils/constants";
const backendPath = BASE_URL + BACKENDPATH + "identity/v1";
let config = {
  headers: {
    isMobile: true
  }
};
export default {
  app: {
    loginAction: data => {
      return axios.post(backendPath + "/login", data, config).then(res => {
        return { data: res.data, token: res.headers.token };
      });
    }
  }
};
