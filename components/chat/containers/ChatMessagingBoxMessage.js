import React, { Component } from "react";

import { View, Text, TouchableOpacity, TextInput } from "react-native";

import { styles } from "./ChatStyles";

const ChatMessagingBoxMessage = props => {
  return (
    <View style={styles.newMessage}>
      <TextInput
        style={styles.chatMessage}
        onChangeText={text => props.handleChange(text)}
        value={props.newMessage}
        placeholder="New Message"
      ></TextInput>
      <TouchableOpacity
        onPress={props.handleSend}
        style={styles.sendMessageButton}
      >
        <Text style={styles.sendMessageText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatMessagingBoxMessage;
