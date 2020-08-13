export const BACKENDPATH = "/server/";
// export const BASE_URL = "https://www.qa.blimpit.com";
//export const BASE_URL = " https://www.blimpit.com";
// export const BASE_URL = "http://18.222.179.220:8080";
export const BASE_URL = "http://localhost:8080";
// export const BASE_URL = "http://18.188.25.21:8080";
export const TYPE_RETAILER = "retailer";
export const FIREBASE_TOKEN = "FIREBASE_TOKEN";
export const USER_ID = "USER_ID";
export const CHAT_BOX_MESSAGES_PER_LOAD_HISTORY = 10;

export const SENDER = {
  ME: "me",
  OTHER: "other"
};

export const EXCEPT_401_URLS = [
  `${BASE_URL}${BACKENDPATH}/identity/v1/login`,
  `${BASE_URL}${BACKENDPATH}/identity/v1/updatePassword`,
  `${BASE_URL}${BACKENDPATH}/identity/v1/verify`,
  `${BASE_URL}${BACKENDPATH}/identity/v1/token`,
  `${BASE_URL}${BACKENDPATH}/identity/v1/resendEmail`,
  `${BASE_URL}${BACKENDPATH}/identity/v1/verifySMSCode`,
  `${BASE_URL}${BACKENDPATH}/identity/v1/sendPasswordResettingInfo`,
  `${BASE_URL}${BACKENDPATH}/identity/v1/passresettingallowed`
];
