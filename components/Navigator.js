import { createAppContainer, createStackNavigator } from "react-navigation";
import React, { Component } from "react";

import Login from "./login_logout/container/Login";
import Orders from "./orders/container/Orders";
import OrderListItem from "./orders/container/OrderListItem";
import Order from "./orders/container/Order";
import Profile from "./profile/container/Profile";
import ChatHistory from "./chat/containers/ChatHistory";
import ChatMessagingBox from "./chat/containers/ChatMessagingBox";

const MainNavigator = createStackNavigator({
  Login: { screen: Login },
  Orders: {
    screen: Orders,
    navigationOptions: {
      header: null
    }
  },
  OrderListItem: { screen: OrderListItem },
  Order: { screen: Order },
  Profile: { screen: Profile },
  ChatHistory: {
    screen: ChatHistory,
    navigationOptions: {
      header: null
    }
  },
  ChatMessagingBox: {
    screen: ChatMessagingBox,
    navigationOptions: {
      header: null
    }
  }
});

const AppContainer = createAppContainer(MainNavigator);

export default class Navigator extends Component {
  render() {
    return <AppContainer />;
  }
}
