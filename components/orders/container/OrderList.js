import React, { PureComponent } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { styles } from "./OrderStyle";
import OrderListItem from "./OrderListItem";
import connect from "react-redux/es/connect/connect";
import { requestOrders, refreshOrder } from "../../orders/actions/orderActions";

const ORDER_COUNT = 10;
const ON_END_REACHED_THREASHOLD = 0.3;
const SKIP_AT_ONCE = 3;

class OrderList extends PureComponent {
  state = {
    skipItems: 0,
    totalOrders: [],
    initialLoading: true
  };

  initializeOrders = token => {
    let data = {
      skip: 0,
      limit: ORDER_COUNT,
      filteringStates: this.props.filteringState,
      token: token,
      orders: this.props.orders ? this.props.orders : []
    };
    this.setState({
      skipItems: SKIP_AT_ONCE
    });
    this.props.requestOrders(data);
  };

  componentDidMount() {
    this.initializeOrders(this.props.token);
  }

  refresh = (filteringStates = this.props.filteringState) => {
    let data = {
      skip: 0,
      limit: ORDER_COUNT,
      filteringStates,
      token: this.props.token,
      orders: []
    };
    this.setState({
      skipItems: SKIP_AT_ONCE
    });
    this.props.refreshOrder(data);
  };

  loadOrders(obj) {
    if (
      this.props.orderLength >= ORDER_COUNT &&
      this.props.orderLength != this.props.previouseLength
    ) {
      let data = {
        skip: this.state.skipItems,
        limit: ORDER_COUNT,
        filteringStates: this.props.filteringState,
        token: this.props.token,
        orders: this.props.orders ? this.props.orders : []
      };
      this.setState({
        skipItems: this.state.skipItems + SKIP_AT_ONCE,
        initialLoading: false
      });
      this.props.requestOrders(data);
    }
  }

  renderSeparator = () => {
    return <View style={styles.orderListSeperator} />;
  };

  getListViewItem = item => {
    Alert.alert(item.key);
  };

  getOrder = (item, navigation) => {
    if (item.date) {
      return <Text style={styles.orderDateItem}>{item.date}</Text>;
    } else {
      return (
        <OrderListItem
          navigation={navigation}
          type={item.type}
          userName={item.buyerInfo.firstName + " " + item.buyerInfo.lastName}
          image={
            item.buyerInfo.profileImageUrl
              ? { uri: item.buyerInfo.profileImageUrl }
              : require("../../../assets/defaultPro.png")
          }
          time={item.time}
          orderId={item.key}
          orderState={item.state || ""}
          items={item.itemInfo}
        />
      );
    }
  };

  render() {
    let lowerContainer;

    {
      if (this.props.requestingOrders && this.state.initialLoading) {
        lowerContainer = (
          <View style={styles.orderListSpinner}>
            <ActivityIndicator size="large" color="#2790D3" />
            <Text style={styles.updatingOrderViewText}>Please wait...</Text>
          </View>
        );
      } else if (this.props.orders === null || this.props.orders.length == 0) {
        lowerContainer = (
          <View style={{ display: "flex", flexDirection: "column" }}>
            <ImageBackground style={styles.imageBackNoOrders}>
              <Image
                style={styles.imageNoOrder}
                source={require("../../../assets/noOrders.png")}
              />
            </ImageBackground>
            <Text style={styles.imageNoOrderTxt}>
              You don't have any orders
            </Text>
          </View>
        );
      } else {
        lowerContainer = (
          <FlatList
            data={this.props.orders}
            renderItem={({ item }) =>
              this.getOrder(item, this.props.navigation)
            }
            refreshing={this.props.refreshing}
            onRefresh={() => this.refresh()}
            ItemSeparatorComponent={this.renderSeparator}
            onEndReachedThreshold={ON_END_REACHED_THREASHOLD}
            onEndReached={distanceFromEnd => this.loadOrders(distanceFromEnd)}
          />
        );
      }
    }

    return <View style={styles.orderListContainer}>{lowerContainer}</View>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user,
    token: state.login.token,
    profileImage: state.profile.profileImage,
    orders: state.orders.orders,
    filteringState: state.orders.filteringState,
    orderLength: state.orders.orderLength,
    requestOrderSuccess: state.orders.requestOrderSuccess,
    previouseLength: state.orders.previouseLength,
    requestingOrders: state.orders.requestingOrders,
    refreshing: state.orders.refreshing
  };
}

export default connect(
  mapStateToProps,
  {
    requestOrders,
    refreshOrder
  }
)(OrderList);
