import { AsyncStorage } from "react-native";

export const USER_ID = "USER_ID";

// Retrieve data from local storage
export const retrieveData = key => {
  try {
    return AsyncStorage.getItem(key);
  } catch (error) {
    return null;
  }
};

// Save data to local storage
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {}
};

// Remove multiple keys
export const removeAll = async (
  keys = ["token", "refreshToken", "retailerId", "authenticationId", "user"]
) => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (err) {}
};
