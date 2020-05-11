import {
  LOAD_LAST_CHATTED_USERS,
  LOAD_LAST_CHATTED_USERS_SUCCESS,
  LOAD_LAST_CHATTED_USERS_FAIL,
  CHAT_ON_MESSAGE,
  CHAT_CLEAR_LAST_CHATTED_AND_SELECTED_USER_ON_CHAT_SCREEN,
  CHAT_CLEAR_CHAT,
  CHAT_SELECT_USER_ON_CHAT_SCREEN,
  CHAT_LOAD_CHAT_HISTORY,
  CHAT_LOAD_CHAT_HISTORY_SUCCESS,
  CHAT_LOAD_CHAT_HISTORY_FAILED,
  CHAT_SEND_MESSAGE,
  CHAT_SEND_MESSAGE_SUCCESS,
  CHAT_SEND_MESSAGE_FAILED
} from "../../actionTypes";

export const receiveMessage = payload => ({
  type: CHAT_ON_MESSAGE,
  payload
});

export const sendChatMessage = payload => ({
  type: CHAT_SEND_MESSAGE,
  payload
});

export const sendChatMessageSuccess = payload => ({
  type: CHAT_SEND_MESSAGE_SUCCESS,
  payload
});

export const sendChatMessageFailed = payload => ({
  type: CHAT_SEND_MESSAGE_FAILED,
  payload
});

export const loadChatHistory = payload => ({
  type: CHAT_LOAD_CHAT_HISTORY,
  payload
});

export const loadChatHistorySuccess = payload => ({
  type: CHAT_LOAD_CHAT_HISTORY_SUCCESS,
  payload
});

export const loadChatHistoryFailed = payload => ({
  type: CHAT_LOAD_CHAT_HISTORY_FAILED,
  payload
});

export const loadLastChattedUsers = payload => {
  return { type: LOAD_LAST_CHATTED_USERS, payload };
};

export const successLastChattedUsers = payload => {
  return { type: LOAD_LAST_CHATTED_USERS_SUCCESS, payload };
};

export const failLastChattedUsers = payload => {
  return { type: LOAD_LAST_CHATTED_USERS_FAIL, payload };
};

export const clearLastChattedUsersAndSelectedUserOnChatScreen = () => ({
  type: CHAT_CLEAR_LAST_CHATTED_AND_SELECTED_USER_ON_CHAT_SCREEN
});

export const clearChat = () => ({
  type: CHAT_CLEAR_CHAT
});

export const selectUserOnChatScreen = payload => ({
  type: CHAT_SELECT_USER_ON_CHAT_SCREEN,
  payload
});
