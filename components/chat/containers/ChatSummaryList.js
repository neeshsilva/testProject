import React, { Component } from "react";
import {connect} from "react-redux";
import withUser from "./HOCs/withUser";

import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { styles } from "./ChatStyles";
import ChatSummaryBox from "./ChatSummaryBox";

import {
  clearChat,
  clearLastChattedUsersAndSelectedUserOnChatScreen,
  loadLastChattedUsers,
  selectUserOnChatScreen
} from "../actions/ChatActions";

class ChatSummaryList extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.props.clearLastChattedUsersAndSelectedUserOnChatScreen();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let currentUserId = this.props.withUser_id;
    let previousUserId = prevProps.withUser_id;
    if (currentUserId !== previousUserId) {
      if (this.props.clearChatOnUserChange) {
        this.props.clearChat();
      }
      if (currentUserId) {
        this.loadLastChattedUsers(0, 10);
      }
    } else if (currentUserId) {
      if (
        this.props.lastChattedUsers &&
        this.props.lastChattedUsers.length === 0 &&
        !this.props.loadingLastChattedUsers
      ) {
        this.loadLastChattedUsers(0, 10);
      }
    }
    // if (currentUserId) {
    //   if (
    //     !this.props.selectedUserId &&
    //     this.props.lastChattedUsers.length > 0
    //   ) {
    //     this.props.selectUserOnChatScreen({
    //       userId: this.props.lastChattedUsers[0]._id
    //     });
    //   }
    // }
  }

  componentWillUnmount() {
    this.props.clearLastChattedUsersAndSelectedUserOnChatScreen();
  }

  loadLastChattedUsers = (skip = 0, limit = 10) => {
    let userId = this.props.withUser_id;
    if (
      userId &&
      !this.props.loadedFullLastChattedUsers &&
      !this.props.loadingLastChattedUsers
    ) {
      this.props.loadLastChattedUsers({
        id: userId,
        skip: skip,
        limit: limit,
        token: this.props.login.token
      });
    }
  };

  handleEndReached = obj => {
    let userId = this.props.withUser_id;
    if (userId) {
      this.loadLastChattedUsers(this.props.lastChattedUsers.length, 10);
    }
  };

  render() {
    return this.props.loadingLastChattedUsers ? (
      <View style={styles.loadingView}>
        <ActivityIndicator size="large" color="#2790D3" />
        <Text style={styles.updatingOrderViewText}>Please wait...</Text>
      </View>
    ) : (
      <FlatList
        data={this.props.lastChattedUsers}
        renderItem={({ item }) => (
          <ChatSummaryBox
            key={item._id}
            otherUserId={item._id}
            navigation={this.props.navigation}
          ></ChatSummaryBox>
        )}
        keyExtractor={item => item._id}
        onEndReachedThreshold={0.3}
        onEndReached={distanceFromEnd => this.handleEndReached(distanceFromEnd)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    lastChattedUsers: state.chat.lastChattedUsers,
    loadingLastChattedUsers: state.chat.loadingLastChattedUsers,
    loadedFullLastChattedUsers: state.chat.loadedFullLastChattedUsers,
    selectedUserId: state.chat.chatScreen.selectedUserId || null,
    login: state.login
  };
};

export default withUser(
  connect(mapStateToProps, {
    loadLastChattedUsers,
    clearLastChattedUsersAndSelectedUserOnChatScreen,
    selectUserOnChatScreen,
    clearChat
  })(ChatSummaryList)
);
