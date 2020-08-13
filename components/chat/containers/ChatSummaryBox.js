import React, { Component } from "react";
import {connect} from "react-redux";

import cl, { cloudinaryConfig } from "../../utils/cloudinary";

import withUser from "./HOCs/withUser";
import withChatHistory from "./HOCs/withChatHistory";

import { getFormattedDateForSummaryBox } from "./ChatUtils";
import { selectUserOnChatScreen } from "../actions/ChatActions";

import { SENDER } from "../../utils/constants";

import {
  Image,
  ImageBackground,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { styles } from "./ChatStyles";

import chatApi from "../services/ChatService";

class ChatSummaryBox extends Component {
  static navigationOptions = {
    header: null
  };

  _isMounted = false;
  state = {
    userName: "",
    userImageId: undefined,
    newMessage: false
  };

  componentDidMount() {
    this._isMounted = true;
    let userId = this.props.withUser_id;
    if (this.props.otherUserId && userId) {
      chatApi.app
        .getUserProfile({
          userId: this.props.otherUserId,
          token: this.props.login.token
        })
        .then(response => {
          if (
            this._isMounted &&
            response &&
            response.data &&
            response.data.length > 0 &&
            response.data[0]
          ) {
            let userProfile = response.data[0];
            let userName = "";
            if (userProfile.firstName && userProfile.lastName) {
              userName = `${userProfile.firstName} ${userProfile.lastName}`;
            } else if (userProfile.firstName) {
              userName = userProfile.firstName;
            } else if (userProfile.lastName) {
              userName = userProfile.lastName;
            }
            this.setState({
              userName: userName,
              userImageId:
                userProfile.advanceinfo && userProfile.advanceinfo.profileImage
                  ? userProfile.advanceinfo.profileImage.imageId
                  : undefined
            });
          }
        })
        .catch();

      let numberOfMessagesToLoadInitially = 10; //getNumberOfMessagesToLoadInitially();
      this.props.withChatHistory_loadLatest(
        userId,
        this.props.otherUserId,
        numberOfMessagesToLoadInitially
      );
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let previousChatHistory = prevProps.withChatHistory_history
      ? prevProps.withChatHistory_history[this.props.otherUserId]
      : undefined;
    let currentChatHistory = this.props.withChatHistory_history
      ? this.props.withChatHistory_history[this.props.otherUserId]
      : undefined;
    let selected = this.props.otherUserId === this.props.selectedUserId;
    if (
      !selected &&
      previousChatHistory &&
      currentChatHistory &&
      previousChatHistory.length < currentChatHistory.length &&
      currentChatHistory[currentChatHistory.length - 1].sender === SENDER.OTHER
    ) {
      this.setState({ newMessage: true });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClick = () => {
    let selected = this.props.otherUserId === this.props.selectedUserId;
    if (!selected) {
      this.setState({ newMessage: false });
      this.props.selectUserOnChatScreen({
        userId: this.props.otherUserId,
        userName: this.state.userName,
        userImageId: this.state.userImageId
      });
      this.props.navigation.navigate("ChatMessagingBox");
    }
  };

  render() {
    let lastMessage =
      this.props.otherUserId &&
      this.props.withChatHistory_history &&
      this.props.withChatHistory_history[this.props.otherUserId] &&
      this.props.withChatHistory_history[this.props.otherUserId].length > 0
        ? {
            ...this.props.withChatHistory_history[this.props.otherUserId][
              this.props.withChatHistory_history[this.props.otherUserId]
                .length - 1
            ]
          }
        : { message: "", time: "" };
    if (lastMessage.time !== "") {
      lastMessage.time = lastMessage.isFailed
        ? "FAILED"
        : getFormattedDateForSummaryBox(lastMessage.time);
    }

    return (
      <TouchableOpacity activityOpacity={0.5} onPress={this.handleClick}>
        <View style={styles.chatListItemContainer}>
          <Image
            style={styles.chatListItemImage}
            source={
              this.state.userImageId
                ? {
                    uri: cl.url(this.state.userImageId, {
                      width: 50,
                      height: 50
                    })
                  }
                : require("../../../assets/defaultPro.png")
            }
          />
          <View style={styles.chatListItemTextParentContainer}>
            <Text style={styles.summaryName}>{this.state.userName || ""}</Text>
            <View style={styles.summaryDisplay}>
              <Text
                style={
                  this.state.newMessage ? styles.bolderFont : styles.normalFont
                }
              >
                {lastMessage.message}
              </Text>
              <Text style={styles.summaryDate}>{lastMessage.time}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

function mapStateToProps({ login }) {
  return { login };
}

export default withUser(
  withChatHistory(
    connect(mapStateToProps, { selectUserOnChatScreen })(ChatSummaryBox)
  )
);
