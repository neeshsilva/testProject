import React, { Component } from "react";
import {connect} from "react-redux";

import { loadLastChattedUsers } from "../actions/ChatActions";

import {
  Image,
  ImageBackground,
  TextInput,
  View,
  Text,
  FlatList
} from "react-native";
import { styles } from "./ChatStyles";

import BottomNavigation from "../../BottomNavigation";
import ChatSummaryList from "./ChatSummaryList";
import ChatMessagingBox from "./ChatMessagingBox";

class ChatHistory extends Component {
  componentDidMount() {
    this.props.loadLastChattedUsers({
      skip: 0,
      limit: 10,
      token: this.props.login.token
    });
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.parentPage}>
          <View style={styles.upperComponent}>
            <Text style={styles.title}>Chats</Text>
          </View>
          <View style={styles.lowerComponent}>
            <ChatSummaryList
              navigation={this.props.navigation}
            ></ChatSummaryList>
          </View>
          <BottomNavigation
            navigation={this.props.navigation}
          ></BottomNavigation>
        </View>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ login, chat }) {
  return { login, chat };
}

export default connect(mapStateToProps, { loadLastChattedUsers })(ChatHistory);
