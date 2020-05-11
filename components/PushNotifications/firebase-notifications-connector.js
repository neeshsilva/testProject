import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";

import firebaseConfig from "../config/firebase";

const isFirebaseInitialized = () => firebase.apps.length > 0;

const initializeFirebase = () => {
  if (!isFirebaseInitialized()) {
    firebase.initializeApp(firebaseConfig);
  }
  return isFirebaseInitialized();
};

const requestNotificationPermission = async () => {
  const { existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === "granted") return true;
  }
  return false;
};

const getMessagingToken = async (userId, registerUser) => {
  let token = await Notifications.getExpoPushTokenAsync();
  const data = {
    firebaseToken: token,
    firebaseOldToken: token,
    id: userId
  };
  registerUser(data);
  return token;
};

const registerOnTokenRefreshCallback = (userId, registerUser, callback) => {
  if (!callback) {
    callback = () => {
      getMessagingToken(userId, registerUser)
        .then()
        .catch(error => {
          // console.log("Unable to retrieve refreshed token", error);
        });
    };
  }
  //   firebase.messaging().onTokenRefresh(callback);
};

export const initializeFirebaseMessaging = async (
  userId,
  registerUser,
  receiveMessage
) => {
  let firebaseWasAlreadyInitialized = isFirebaseInitialized();
  // console.log(firebaseWasAlreadyInitialized);
  if (!firebaseWasAlreadyInitialized) {
    if (!initializeFirebase()) {
      throw new Error("Firebase cannot be initialized");
    }
  }

  if (!(await requestNotificationPermission())) {
    throw new Error("No permission to receive notifications");
  }

  let token = await getMessagingToken(userId, registerUser);

  // console.log(firebaseWasAlreadyInitialized);

  registerOnTokenRefreshCallback();
  Notifications.addListener(notification => {
    // console.log(notification);
    receiveMessage(notification);
  });
};
