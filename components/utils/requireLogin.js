import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { Notifications } from "expo";
import { Alert } from "react-native";
import { initializeFirebaseMessaging } from "../utils/firebase";

import { retrieveData } from "./storage";
import { loginSuccess } from "../login_logout/actions/loginLogoutActions";
import { requestProfile } from "../profile/actions/profileActions";
import { changeFilteringState } from "../orders/actions/orderActions";

export default ChildComponent => {
  class ComposedComponent extends Component {
    static navigationOptions = {
      header: null
    };

    state = { token: "" };

    componentDidMount() {
      this.forceToLogin();
    }

    componentDidUpdate() {
      if (!this.props.login.loginSuccess && !this.props.login.loginState) {
        this.props.navigation.navigate("Login");
      } else if (
        this.props.login.user &&
        this.props.login.user.user._id &&
        !this.props.profile.profile &&
        !this.props.profile.requestProfile
      ) {
        this.props.requestProfile({
          retailerId: this.props.login.user.user._id
        });
      }
    }

    async getToken(retailerId) {
      let token = await Notifications.getExpoPushTokenAsync();
      this.props.sendNotificationToken({
        id: retailerId,
        firebaseToken: token,
        firebaseOldToken: token
      });
    }

    componentWillUnmount() {
      this.notificationSubscription && this.notificationSubscription.remove();
    }

    handleNotification = notification => {
      this.props.navigation.navigate("Orders");
      this.props.changeFilteringState(["PENDING"]);
      // setTimeout(() => Alert.alert("New order received!", ""), 500);
    };

    initializeApp = retailerId => {
      this.props.requestProfile({ retailerId });
      initializeFirebaseMessaging({
        currentUser: retailerId
      });
      this.getToken(retailerId);
      this.notificationSubscription = Notifications.addListener(
        this.handleNotification
      );
    };

    async forceToLogin() {
      if (!this.props.login.loginSuccess) {
        let user = JSON.parse(await retrieveData("user"));
        let token = await retrieveData("token");
        if (user && token) {
          let data = {
            data: user,
            token
          };
          this.props.loginSuccess(data);
          this.initializeApp(user.user._id);
          this.setState({ token });
        } else {
          this.props.navigation.navigate("Login");
        }
      } else {
        this.props.navigation.navigate("Login");
      }
    }

    render() {
      return (
        <ChildComponent
          {...this.props}
          tokenFromStore={this.state.token}
        ></ChildComponent>
      );
    }
  }

  function mapStateToProps({ login, profile }) {
    return { login, profile };
  }
  return connect(
    mapStateToProps,
    { loginSuccess, requestProfile, changeFilteringState }
  )(ComposedComponent);
};
