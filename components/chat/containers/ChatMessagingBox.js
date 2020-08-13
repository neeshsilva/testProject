import React, { Component } from "react";
import {connect} from "react-redux";

import withUser from "./HOCs/withUser";
import withChatHistory from "./HOCs/withChatHistory";
import withChat from "./HOCs/withChat";
import { CHAT_BOX_MESSAGES_PER_LOAD_HISTORY } from "../../utils/constants";
import { getInternalKeyForNewChatMessage } from "./ChatUtils";

import { View, KeyboardAvoidingView } from "react-native";
import { styles } from "./ChatStyles";

import BottomNavigation from "../../BottomNavigation";
import ChatBoxHeading from "./ChatBoxHeading";
import { clearChat, sendChatMessage } from "../actions/ChatActions";
import ChatMessagingBoxBody from "./ChatMessagingBoxBody";
import ChatMessagingBoxMessage from "./ChatMessagingBoxMessage";

class ChatMessagingBox extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    newMessage: ""
  };

  componentDidMount() {
    let userId = this.props.withUser_id;
    if (userId && this.props.selectedUserId) {
      let numberOfMessagesToLoadInitially = 10;
      this.props.withChatHistory_loadLatest(
        userId,
        this.props.selectedUserId,
        numberOfMessagesToLoadInitially
      );
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let userId = this.props.withUser_id;
    if (
      userId &&
      this.props.selectedUserId &&
      prevProps.selectedUserId !== this.props.selectedUserId
    ) {
      let numberOfMessagesToLoadInitially = 10;
      this.props.withChatHistory_loadLatest(
        userId,
        this.props.selectedUserId,
        numberOfMessagesToLoadInitially
      );
    }

    if (this.props.withUser_id !== prevProps.withUser_id) {
      if (this.props.clearChatOnUserChange) {
        this.props.clearChat();
      }
      if (userId) {
        let numberOfMessagesToLoadInitially = 10;
        this.props.withChatHistory_loadLatest(
          userId,
          this.props.selectedUserId,
          numberOfMessagesToLoadInitially
        );
      }
    }
  }

  handleLoadHistory = () => {
    if (this.props.withUser_id) {
      this.props.withChatHistory_loadMore(
        this.props.withUser_id,
        this.props.selectedUserId,
        CHAT_BOX_MESSAGES_PER_LOAD_HISTORY
      );
    }
  };

  handleSend = () => {
    let userId = this.props.withUser_id;
    if (
      this.props.selectedUserId &&
      this.state.newMessage !== "" &&
      userId &&
      this.props.withChat_registered
    ) {
      let timeNow = new Date().getTime();
      this.props.sendChatMessage({
        token: this.props.login.token,
        message: this.state.newMessage,
        receiverId: this.props.selectedUserId,
        id: userId,
        chatTime: timeNow,
        key: getInternalKeyForNewChatMessage(
          timeNow,
          this.props.withChatHistory_history[this.props.selectedUserId]
        )
      });

      this.setState({ newMessage: "" });
    }
  };

  handleChange = text => {
    this.setState({ newMessage: text });
  };

  render() {
    return (
      <React.Fragment>
        <View style={styles.parentPage}>
          <KeyboardAvoidingView
            style={styles.orderUCContainer}
            behavior="position"
            keyboardVerticalOffset={10}
            enabled
          >
            <View style={styles.chatUpperComponent}>
              <ChatBoxHeading
                userId={this.props.selectedUserId}
                userName={this.props.selectedUserName || ""}
                userImageId={this.props.selectedUserImageId}
                navigation={this.props.navigation}
              ></ChatBoxHeading>
            </View>
            <View style={styles.chatLowerComponent}>
              <ChatMessagingBoxBody
                chatHistory={
                  this.props.withChatHistory_history[
                  this.props.selectedUserId
                  ] || []
                }
                loadingChatHistory={
                  this.props.withChatHistory_loading[this.props.selectedUserId]
                }
                loadedFullChatHistory={
                  this.props.withChatHistory_loadedFull[
                  this.props.selectedUserId
                  ]
                }
                handleLoadHistory={this.handleLoadHistory}
                selectedUserId={this.props.selectedUserId}
                selectedUserName={this.props.selectedUserName}
                selectedUserImageId={this.props.selectedUserImageId}
                registered={this.props.withChat_registered}
              ></ChatMessagingBoxBody>
              <ChatMessagingBoxMessage
                registered={this.props.withChat_registered}
                handleSend={this.handleSend}
                handleChange={this.handleChange}
                newMessage={this.state.newMessage}
                userId={this.props.selectedUserId}
              ></ChatMessagingBoxMessage>
            </View>
          </KeyboardAvoidingView>
        </View>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedUserId: state.chat.chatScreen.selectedUserId,
    selectedUserName: state.chat.chatScreen.selectedUserName,
    selectedUserImageId: state.chat.chatScreen.selectedUserImageId,
    login: state.login
  };
};

export default withUser(
  withChat(
    withChatHistory(
      connect(mapStateToProps, { clearChat, sendChatMessage })(ChatMessagingBox)
    )
  )
);
