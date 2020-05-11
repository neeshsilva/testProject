import {
  LOAD_LAST_CHATTED_USERS,
  LOAD_LAST_CHATTED_USERS_SUCCESS,
  CHAT_CLEAR_LAST_CHATTED_AND_SELECTED_USER_ON_CHAT_SCREEN,
  CHAT_CLEAR_CHAT,
  CHAT_SELECT_USER_ON_CHAT_SCREEN,
  CHAT_LOAD_CHAT_HISTORY,
  CHAT_LOAD_CHAT_HISTORY_SUCCESS,
  CHAT_LOAD_CHAT_HISTORY_FAILED,
  CHAT_SEND_MESSAGE,
  CHAT_SEND_MESSAGE_SUCCESS,
  CHAT_SEND_MESSAGE_FAILED,
  CHAT_ON_MESSAGE
} from "../../actionTypes";

import { SENDER } from "../../utils/constants";

import {
  CHAT_MESSAGE,
  ORDER_CANCELLED,
  ORDER_COMPLETED,
  ORDER_PAID,
  ORDER_PLACED
} from "../../PushNotifications/notification-types";

initState = {
  chatHistory: {},
  loadingChatHistory: {},
  loadedFullChatHistory: {},
  lastChattedUsers: [],
  loadingLastChattedUsers: false,
  loadedFullLastChattedUsers: false,
  chatScreen: {
    selectedUserId: undefined,
    selectedUserName: undefined,
    selectedUserImageId: undefined
  }
};

export default function chatReducer(state = initState, action) {
  switch (action.type) {
    case CHAT_ON_MESSAGE: {
      if (
        !action.payload ||
        !action.payload.data ||
        action.payload.data.type !== CHAT_MESSAGE ||
        !action.payload.data.key ||
        !action.payload.data.chatTime
      ) {
        return { ...state };
      }
      let userId = action.payload.userId;
      if (userId === action.payload.data.receiverId) {
        let senderId = action.payload.data.senderId;

        // update last chatted users, if last chatted user exist remove and add to the beginning, otherwise just add to the beginning
        let lastChattedUsers = state.lastChattedUsers
          .filter(user => user._id !== senderId)
          .map(user => ({ ...user }));
        lastChattedUsers = [
          { _id: senderId, lastChatTime: Number(action.payload.data.chatTime) },
          ...lastChattedUsers
        ];

        // find if there's a message with the same key, if nothing found insert to chat history
        let userChatHistory = state.chatHistory[senderId]
          ? state.chatHistory[senderId].map(message => ({ ...message }))
          : [];
        let existingMessage = userChatHistory.find(
          message => message.key === action.payload.data.key
        );
        if (!existingMessage) {
          userChatHistory.push({
            sender: SENDER.OTHER,
            message: action.payload.data.message,
            time: Number(action.payload.data.chatTime),
            key: action.payload.data.key || userChatHistory.length + 1
          });

          return {
            ...state,
            chatHistory: {
              ...state.chatHistory,
              [senderId]: userChatHistory
            },
            lastChattedUsers: lastChattedUsers
          };
        }

        return {
          ...state,
          lastChattedUsers: lastChattedUsers
        };
      } else if (userId === action.payload.data.senderId) {
        let receiverId = action.payload.data.receiverId;

        // update last chatted users, if last chatted user exist remove and add to the beginning, otherwise just add to the beginning
        let lastChattedUsers = state.lastChattedUsers
          .filter(user => user._id !== receiverId)
          .map(user => ({ ...user }));
        lastChattedUsers = [
          {
            _id: receiverId,
            lastChatTime: Number(action.payload.data.chatTime)
          },
          ...lastChattedUsers
        ];

        let userChatHistory = state.chatHistory[receiverId]
          ? state.chatHistory[receiverId].map(message => ({ ...message }))
          : [];

        // find if there's a message with the same key or "own message with same chat time", if nothing found insert to chat history
        let existingMessage = userChatHistory.find(
          message =>
            message.key === action.payload.data.key ||
            (message.time === Number(action.payload.data.chatTime) &&
              message.sender === SENDER.ME)
        );

        if (!existingMessage) {
          userChatHistory.push({
            sender: SENDER.ME,
            message: action.payload.data.message,
            time: Number(action.payload.data.chatTime),
            key: action.payload.data.key
          });

          return {
            ...state,
            chatHistory: {
              ...state.chatHistory,
              [receiverId]: userChatHistory
            },
            lastChattedUsers: lastChattedUsers
          };
        }
        return {
          ...state,
          lastChattedUsers: lastChattedUsers
        };
      }
      return { ...state };
    }
    case CHAT_SEND_MESSAGE: {
      let receiverId = action.payload.receiverId;
      let userChatHistory = state.chatHistory[receiverId]
        ? state.chatHistory[receiverId].map(message => ({ ...message }))
        : [];

      userChatHistory.push({
        sender: SENDER.ME,
        message: action.payload.message,
        time: action.payload.chatTime,
        key: action.payload.key,
        isSending: true
      });

      return {
        ...state,
        chatHistory: {
          ...state.chatHistory,
          [receiverId]: userChatHistory
        }
      };
    }
    case CHAT_SEND_MESSAGE_SUCCESS: {
      let receiverId = action.payload.receiverId;
      let userChatHistory = state.chatHistory[receiverId]
        ? state.chatHistory[receiverId].map(message => ({ ...message }))
        : [];
      let existingMessage = userChatHistory.find(
        message => message.key === action.payload.newKey
      );
      let succeededMessage = userChatHistory.find(
        message => message.key === action.payload.oldKey
      );
      if (succeededMessage) {
        if (existingMessage) {
          // new message already exists, remove the other one
          userChatHistory = userChatHistory.filter(
            message => message.key !== action.payload.oldKey
          );
        } else {
          succeededMessage.key = action.payload.newKey;
          succeededMessage.isSending = false;
        }
        return {
          ...state,
          chatHistory: {
            ...state.chatHistory,
            [receiverId]: userChatHistory
          }
        };
      }
      return { ...state };
    }
    case CHAT_SEND_MESSAGE_FAILED: {
      let receiverId = action.payload.receiverId;
      let userChatHistory = state.chatHistory[receiverId]
        ? state.chatHistory[receiverId].map(message => ({ ...message }))
        : [];
      let failedMessage = userChatHistory.find(
        message => message.key === action.payload.key
      );
      if (failedMessage) {
        failedMessage.isSending = false;
        failedMessage.isFailed = true;
        return {
          ...state,
          chatHistory: {
            ...state.chatHistory,
            [receiverId]: userChatHistory
          }
        };
      }
      return { ...state };
    }
    case LOAD_LAST_CHATTED_USERS:
      return {
        ...state,
        loadingLastChattedUsers: true
      };
    case LOAD_LAST_CHATTED_USERS_SUCCESS:
      let lastChattedUsers = action.payload.users;
      let isFullLastChattedUsersLoaded =
        action.payload.limit && lastChattedUsers.length < action.payload.limit;
      let userIdMap = {};
      lastChattedUsers.forEach(user => (userIdMap[user._id] = true));

      let previousLastChattedUsers = state.lastChattedUsers.map(user => ({
        ...user
      }));
      previousLastChattedUsers = previousLastChattedUsers.filter(
        user => !userIdMap[user._id]
      );
      return {
        ...state,
        lastChattedUsers: [
          ...lastChattedUsers,
          ...previousLastChattedUsers
        ].sort((user1, user2) => user2.lastChatTime - user1.lastChatTime),
        loadingLastChattedUsers: false,
        loadedFullLastChattedUsers: isFullLastChattedUsersLoaded
      };
    case CHAT_LOAD_CHAT_HISTORY: {
      return {
        ...state,
        loadingChatHistory: {
          ...state.loadingChatHistory,
          [action.payload.otherUserId]: true
        }
      };
    }
    case CHAT_LOAD_CHAT_HISTORY_SUCCESS: {
      let userChatHistory =
        action.payload.chatHistory.map(message => ({
          sender: message.isSender ? SENDER.ME : SENDER.OTHER,
          message: message.message,
          time: message.chatTime,
          key: message._id
        })) || [];

      let isFullChatHistoryLoaded =
        action.payload.limit && userChatHistory.length < action.payload.limit;

      let previousChatHistory = state.chatHistory[action.payload.otherUserId]
        ? state.chatHistory[action.payload.otherUserId].map(message => ({
            ...message
          }))
        : [];

      let keysMap = {};
      previousChatHistory.forEach(message => {
        keysMap[message.key] = true;
      });

      userChatHistory = userChatHistory
        .reverse()
        .filter(message => !keysMap[message.key]);

      let loadingChatHistory = { ...state.loadingChatHistory };
      if (loadingChatHistory[action.payload.otherUserId]) {
        delete loadingChatHistory[action.payload.otherUserId];
      }
      return {
        ...state,
        chatHistory: {
          ...state.chatHistory,
          [action.payload.otherUserId]: [
            ...userChatHistory,
            ...previousChatHistory
          ].sort((message1, message2) => message1.time - message2.time)
        },
        loadingChatHistory: loadingChatHistory,
        loadedFullChatHistory: isFullChatHistoryLoaded
          ? {
              ...state.loadedFullChatHistory,
              [action.payload.otherUserId]: true
            }
          : { ...state.loadedFullChatHistory }
      };
    }
    case CHAT_LOAD_CHAT_HISTORY_FAILED: {
      let loadingChatHistory = { ...state.loadingChatHistory };
      if (loadingChatHistory[action.payload.otherUserId]) {
        delete loadingChatHistory[action.payload.otherUserId];
      }
      return { ...state, loadingChatHistory: loadingChatHistory };
    }
    case CHAT_CLEAR_LAST_CHATTED_AND_SELECTED_USER_ON_CHAT_SCREEN: {
      return {
        ...state,
        lastChattedUsers: [],
        loadingLastChattedUsers: false,
        loadedFullLastChattedUsers: false,
        chatScreen: {
          selectedUserId: undefined,
          selectedUserName: undefined,
          selectedUserImageId: undefined
        }
      };
    }
    case CHAT_SELECT_USER_ON_CHAT_SCREEN: {
      if (
        !action.payload ||
        state.lastChattedUsers.findIndex(
          userId => userId._id === action.payload.userId
        ) === -1
      ) {
        return { ...state };
      }
      return {
        ...state,
        chatScreen: {
          ...state.chatScreen,
          selectedUserId: action.payload.userId,
          selectedUserName: action.payload.userName,
          selectedUserImageId: action.payload.userImageId
        }
      };
    }
    case CHAT_CLEAR_CHAT: {
      return {
        ...initState
      };
    }
    default:
      return state;
  }
}
