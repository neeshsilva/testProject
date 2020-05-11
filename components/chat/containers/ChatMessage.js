import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import moment from "moment";

import { SENDER } from "../../utils/constants";

const ChatMessage = props => {
  let chatMessageTime = moment(props.time).format("hh:mm a");
  if (props.isSending) {
    chatMessageTime = "SENDING";
  } else if (props.isFailed) {
    chatMessageTime = "FAILED";
  }

  let hasOtherUserImage = !!props.otherUserImageId;
  let hasUserImage = !!props.userImageId;
  let ownMessage = props.sender === SENDER.ME;

  let messageStyle = ownMessage ? styles.ownMessage : styles.othersMessage;
  let chatTimeStyle = ownMessage ? styles.ownChatTime : styles.othersChatTime;

  return (
    <View style={styles.messageBox}>
      <Text style={messageStyle}>{props.message}</Text>
      <Text style={chatTimeStyle}>{chatMessageTime}</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  messageBox: {
    width: wp("100%"),
    display: "flex",
    position: "relative"
  },

  othersMessage: {
    color: "black",
    backgroundColor: "#f0f0f0",
    fontSize: 15,
    maxWidth: wp("50%"),
    padding: wp("3%"),
    borderRadius: 7,
    margin: wp("4%"),
    marginBottom: wp("0.5%"),
    fontWeight: "400",
    alignSelf: "flex-start"
  },
  ownMessage: {
    color: "white",
    backgroundColor: "#1583fb",
    fontSize: 15,
    maxWidth: wp("50%"),
    padding: wp("3%"),
    borderRadius: 7,
    margin: wp("4%"),
    marginBottom: wp("0.5%"),
    fontWeight: "400",
    alignSelf: "flex-end"
  },
  ownChatTime: {
    marginRight: wp("4%"),
    alignSelf: "flex-end"
  },
  othersChatTime: {
    marginLeft: wp("4%"),
    alignSelf: "flex-start"
  }
});

export default ChatMessage;
