import React, { Component } from "react";
import { connect } from "react-redux";
import { registerForPushNotifications } from "../../../PushNotifications/PushNotificationManagement";

// !!! REQUIRES withUser HOC !!!
const withChat = WrappedComponent => {
  class WithChat extends Component {
    initializeFirebase = () => {
      if (
        this.props.withUser_id &&
        !this.props.withChat_registered &&
        !this.props.withChat_registering
      ) {
        registerForPushNotifications();
      }
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          withChat_retry={this.initializeFirebase}
        />
      );
    }
  }

  const mapStateToProps = state => {
    return {
      withChat_registered: state.pushNotifications.registered,
      withChat_registering: state.pushNotifications.registering
    };
  };

  return connect(mapStateToProps, {})(WithChat);
};

export default withChat;
