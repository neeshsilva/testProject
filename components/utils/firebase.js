import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import firebaseConfig from "../config/firebase";

const isFirebaseInitialized = () => firebase.apps.length > 0;

const initializeFirebase = () => {
  if (!isFirebaseInitialized()) {
    firebase.initializeApp(firebaseConfig);
  }
  return isFirebaseInitialized();
};

const handleNotificationPermission = async () => {
  const { existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === "granted") return true;
  }
  return false;
};

export const initializeFirebaseMessaging = async ({ currentUser }) => {
  try {
    if (!initializeFirebase()) {
      return;
    }
    if (!(await handleNotificationPermission())) {
      return;
    }
  } catch (err) {
    return;
  }
};
