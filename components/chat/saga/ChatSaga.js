import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";

import {
  LOAD_LAST_CHATTED_USERS,
  CHAT_LOAD_CHAT_HISTORY,
  CHAT_SEND_MESSAGE
} from "../../actionTypes";
import {
  successLastChattedUsers,
  failLastChattedUsers,
  loadChatHistorySuccess,
  loadChatHistoryFailed,
  sendChatMessageSuccess,
  sendChatMessageFailed
} from "../actions/ChatActions";
import chatAPI from "../services/ChatService";

function* requestLastChattedUsers({ payload }) {
  try {
    let result = yield call(chatAPI.app.getLastChattedUsers, payload);
    yield put(
      successLastChattedUsers({
        users: result ? result.users : [],
        skip: payload.skip,
        limit: payload.limit
      })
    );
  } catch (error) {
    console.log(error);
    yield put(failLastChattedUsers(error));
  }
}

function* loadChatHistory(action) {
  try {
    const response = yield call(chatAPI.app.getChatHistory, {
      token: action.payload.token,
      otherUserId: action.payload.otherUserId,
      skip: action.payload.skip,
      limit: action.payload.limit
    });
    yield put(
      loadChatHistorySuccess({
        currentUserId: action.payload.currentUserId,
        otherUserId: action.payload.otherUserId,
        chatHistory: response.data ? response.data.chatHistory : [],
        limit: action.payload.limit
      })
    );
  } catch (error) {
    yield put(
      loadChatHistoryFailed({
        currentUserId: action.payload.currentUserId,
        otherUserId: action.payload.otherUserId
      })
    );
  }
}

function* sendMessage(action) {
  try {
    let response = yield call(chatAPI.app.sendMessage, {
      token: action.payload.token,
      receiverId: action.payload.receiverId,
      msg: action.payload.message,
      chatTime: action.payload.chatTime
    });
    yield put(
      sendChatMessageSuccess({
        senderId: action.payload.id,
        receiverId: action.payload.receiverId,
        oldKey: action.payload.key,
        newKey: response.data ? response.data.key : action.payload.key
      })
    );
  } catch (error) {
    console.log(error);
    yield put(
      sendChatMessageFailed({
        senderId: action.payload.id,
        receiverId: action.payload.receiverId,
        key: action.payload.key
      })
    );
  }
}

function* watchSendMessage() {
  yield takeEvery(CHAT_SEND_MESSAGE, sendMessage);
}

function* watchLastChattedUsers() {
  yield takeLatest(LOAD_LAST_CHATTED_USERS, requestLastChattedUsers);
}

function* watchLoadChatHistory() {
  yield takeEvery(CHAT_LOAD_CHAT_HISTORY, loadChatHistory);
}

export default function* chatSaga() {
  yield all([
    watchLastChattedUsers(),
    watchLoadChatHistory(),
    watchSendMessage()
  ]);
}
