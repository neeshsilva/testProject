// global setup for requests
import axios from "axios";

import { EXCEPT_401_URLS, BACKENDPATH } from "./constants";
import { retrieveData, storeData } from "./storage";

import { forceLogout } from "../login_logout/actions/loginLogoutActions";
import { store } from "../../Root";

const tokenURL = `${BACKENDPATH}/identity/v1/token`;

export function setupAxios() {
  axios.interceptors.request.use(
    request => {
      return request;
    },
    error => {
      return Promise.reject(error);
    }
  );
  createAxiosResponseInterceptor();
}

const getTokenData = async () => {
  try {
    let refreshToken = await retrieveData("refreshToken");
    let authenticationId = await retrieveData("authenticationId");
    return { refreshToken, user: { authenticationId } };
  } catch (err) {
    return null;
  }
};

const createAxiosResponseInterceptor = () => {
  const axiosResponseInterceptor = axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      let errorResponse = error.response;
      if (errorResponse && errorResponse.status === 401) {
        if (EXCEPT_401_URLS.includes(errorResponse.config.url)) {
          return Promise.reject(error);
        }
        axios.interceptors.response.eject(axiosResponseInterceptor);
        let newTokenPayload = getTokenData();
        if (newTokenPayload) {
          return axios
            .post(tokenURL, newTokenPayload)
            .then(response => {
              storeData("refreshToken", newTokenPayload.refreshToken);
              createAxiosResponseInterceptor();
              return axios(errorResponse.config);
            })
            .catch(error => {
              // store.dispatch(
              //   forceLogout({ userId: retrieveData("authenticationId") })
              // );
              createAxiosResponseInterceptor();
              return Promise.reject(error);
            });
        }
      }
      return Promise.reject(error);
    }
  );
};
