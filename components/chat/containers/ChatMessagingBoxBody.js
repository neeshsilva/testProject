import React, { Component } from "react";

import { View, ScrollView } from "react-native";

import { styles } from "./ChatStyles";
import withUser from "./HOCs/withUser";
import * as chatUtils from "./ChatUtils";
import DateStrip from "./DateStrip";
import ChatMessage from "./ChatMessage";
import { SENDER } from "../../utils/constants";

class ChatMessagingBoxBody extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    showNewMessageIndicator: false,
    maxScrollTop: 0,
    scrollTop: 0
  };

  constructor(props) {
    super(props);
    this.messageListRef = React.createRef();
    this.messageListEndRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.messageListRef.scrollToEnd();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (!prevProps.registered && this.props.registered) {
    //   this.scrollToBottomInstant();
    // }
    // if (
    //   prevProps.selectedUserId !== this.props.selectedUserId &&
    //   this.props.selectedUserId
    // ) {
    //   this.scrollToBottomInstant();
    //   this.setState({
    //     showNewMessageIndicator: false,
    //     maxScrollTop: 0,
    //     scrollTop: 0
    //   });
    // }
    // let previousChatHistoryLength = prevProps.chatHistory.length;
    // let currentChatHistoryLength = this.props.chatHistory.length;
    // if (
    //   previousChatHistoryLength !== currentChatHistoryLength &&
    //   (previousChatHistoryLength === 0 || currentChatHistoryLength === 0)
    // ) {
    //   this.scrollToBottomInstant();
    // } else if (
    //   previousChatHistoryLength !== 0 &&
    //   currentChatHistoryLength !== 0
    // ) {
    //   let previousLatestMessage =
    //     prevProps.chatHistory[prevProps.chatHistory.length - 1];
    //   let currentLatestMessage = this.props.chatHistory[
    //     this.props.chatHistory.length - 1
    //   ];
    //   if (
    //     previousLatestMessage &&
    //     currentLatestMessage &&
    //     previousLatestMessage.key !== currentLatestMessage.key
    //   ) {
    //     if (currentLatestMessage.sender === SENDER.OTHER) {
    //       const messageList = this.messageListRef.current;
    //       const maxScrollTop =
    //         messageList.scrollHeight - messageList.clientHeight;
    //       let scrolledMoreThanHalfClientHeight =
    //         maxScrollTop > messageList.clientHeight / 2
    //           ? messageList.scrollTop <
    //             maxScrollTop - messageList.clientHeight / 2
    //           : false;
    //       if (
    //         !this.state.showNewMessageIndicator &&
    //         scrolledMoreThanHalfClientHeight
    //       ) {
    //         this.setState({ showNewMessageIndicator: true });
    //       } else if (
    //         !this.state.showNewMessageIndicator &&
    //         !scrolledMoreThanHalfClientHeight
    //       ) {
    //         this.scrollToBottomSmooth();
    //       }
    //     } else {
    //       // new message from me, scroll to bottom
    //       this.scrollToBottomInstant();
    //     }
    //   } else if (
    //     previousChatHistoryLength !== currentChatHistoryLength &&
    //     prevProps.loadingChatHistory &&
    //     !this.props.loadingChatHistory &&
    //     previousLatestMessage.key === currentLatestMessage.key
    //   ) {
    //     this.keepScrollAtSamePosition(
    //       prevState.scrollTop,
    //       prevState.maxScrollTop
    //     );
    //   }
    // }
  }

  scrollToBottomInstant = () => this.scrollToBottom("instant");

  scrollToBottomSmooth = () => this.scrollToBottom("smooth");

  scrollToBottom = behavior => {
    if (this.messageListRef)
      this.messageListRef.scrollToEnd(
        behavior === "smooth" ? { animated: true } : { animated: false }
      );
  };

  keepScrollAtSamePosition = (previousScrollTop, previousMaxScrollTop) => {
    const messageList = this.messageListRef.current;
    const maxScrollTop = messageList.scrollHeight - messageList.clientHeight;
    let scrollGrowth = maxScrollTop - previousMaxScrollTop;
    ReactDOM.findDOMNode(messageList).scrollTop =
      scrollGrowth > 0 ? previousScrollTop + scrollGrowth : previousScrollTop;
  };

  handleScrollMessageList = event => {
    if (event.nativeEvent.contentOffset.y === 0) {
      this.props.handleLoadHistory();
    }
    // const messageList = this.messageListRef.current;
    // this.props.handleLoadHistory();
  };

  handleOnClickNewMessage = e => {
    this.scrollToBottomInstant();
    this.setState({ showNewMessageIndicator: false });
  };

  render() {
    let userImageId = undefined;
    if (
      this.props.withUser_currentUserProfile &&
      this.props.withUser_currentUserProfile.profile &&
      this.props.withUser_currentUserProfile.profile.advanceinfo &&
      this.props.withUser_currentUserProfile.profile.advanceinfo.logo
    ) {
      userImageId = this.props.withUser_currentUserProfile.profile.advanceinfo
        .logo.imageId;
    }

    let messagesToRender = chatUtils.getMessagesToRenderFromChatHistory(
      this.props.chatHistory
    );

    return (
      <View style={styles.oldMessages}>
        <ScrollView
          ref={ref => {
            this.messageListRef = ref;
          }}
          onScroll={this.handleScrollMessageList}
        >
          {messagesToRender.map(message => {
            if (message.isDateStrip) {
              return <DateStrip key={message.date} date={message.date} />;
            } else {
              return (
                <ChatMessage
                  key={message.key}
                  {...message}
                  otherUserImageId={this.props.selectedUserImageId}
                  userImageId={userImageId}
                />
              );
            }
          })}
          <View
            ref={ref => {
              this.messageListEndRef = ref;
            }}
          ></View>
        </ScrollView>
      </View>
    );
  }
}

export default withUser(ChatMessagingBoxBody);
