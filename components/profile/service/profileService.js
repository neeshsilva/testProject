import axios from "axios";
import { BACKENDPATH, BASE_URL } from "../../utils/constants";
const backendPath = BASE_URL + BACKENDPATH + "retailers/v1";
export default {
  app: {
    fetchProfile: data => {
      return axios
        .get(backendPath + "/getRetailerProfile", {
          params: { retailerId: data.retailerId }
        })
        .then(res => {
          return res.data;
        });
    }
  }
};
