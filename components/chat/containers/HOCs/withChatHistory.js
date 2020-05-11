import React, { Component } from "react";
import { connect } from "react-redux";
import { loadChatHistory } from "../../actions/ChatActions";

const withChatHistory = WrappedComponent => {
  class WithChatHistory extends Component {
    load = (currentUserId, otherUserId, skip = 0, limit = 10) => {
      if (
        currentUserId &&
        otherUserId &&
        !this.props.withChatHistory_loadedFull[otherUserId] &&
        !this.props.withChatHistory_loading[otherUserId]
      ) {
        this.props.loadChatHistory({
          currentUserId: currentUserId,
          otherUserId: otherUserId,
          skip: skip,
          limit: limit,
          token: this.props.token
        });
      }
    };

    loadLatest = (currentUserId, otherUserId, count) => {
      if (currentUserId && otherUserId && count > 0) {
        let skip = this.props.withChatHistory_history[otherUserId]
          ? this.props.withChatHistory_history[otherUserId].filter(
              message => !message.isFailed
            ).length
          : 0;
        if (skip < count) {
          this.load(currentUserId, otherUserId, skip, count - skip);
        }
      }
    };

    loadMore = (currentUserId, otherUserId, count) => {
      if (currentUserId && otherUserId && count > 0) {
        let skip = this.props.withChatHistory_history[otherUserId]
          ? this.props.withChatHistory_history[otherUserId].filter(
              message => !message.isFailed
            ).length
          : 0;
        this.load(currentUserId, otherUserId, skip, count);
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          withChatHistory_load={this.load}
          withChatHistory_loadLatest={this.loadLatest}
          withChatHistory_loadMore={this.loadMore}
        />
      );
    }
  }

  const mapStateToProps = state => {
    return {
      withChatHistory_history: state.chat.chatHistory,
      withChatHistory_loading: state.chat.loadingChatHistory,
      withChatHistory_loadedFull: state.chat.loadedFullChatHistory,
      token: state.login.token
    };
  };

  return connect(
    mapStateToProps,
    {
      loadChatHistory
    }
  )(WithChatHistory);
};

export default withChatHistory;
