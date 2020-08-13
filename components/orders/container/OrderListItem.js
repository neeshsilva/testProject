import React, { PureComponent } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { styles } from "./OrderStyle";
import Order from "./Order";
import Swipeout from "react-native-swipeout";
import {connect} from "react-redux";
import {
  attendOrder,
  closeOrder,
  requestOrders
} from "../../orders/actions/orderActions";
import Toast from "react-native-root-toast";
import { Button } from "react-native-elements";

const ORDER_COUNT = 10;
const FILTERING_STATUES = "PENDING";

class OrderListItem extends PureComponent {
  static navigationOptions = {
    header: null
  };

  state = {
    visibleToast: true
  };

  orderStateColorPicker = state => {
    switch (state) {
      case "ATTENDED":
        return "#66d346";
      case "READY_TO_DELIVER":
        return "#fddc39";
      case "DISPATCHED":
      case "PICKED_UP":
        return "#a2a2a2";
      case "RESERVED":
      case "READY_TO_PICK_UP":
        return "#2790d3";
      case "PENDING":
        return "red";
      case "PENDING_PAYMENT":
        return "#7c7c7c";
      case "COMPLETED":
        return "#4db92c";
      case "PENDING_REFUND":
        return "#e54a78";
      case "CLOSED":
        return "#8fe39d";
      default:
        return "none";
    }
  };

  toPascalNotation = word => {
    if (!word) return "";
    word = word.replace(/_/g, " ").toLowerCase();
    word = word === "reservation" ? "reserve" : word;
    return word[0].toUpperCase() + word.slice(1);
  };

  accept = () => {
    let data = {
      skip: 0,
      limit: ORDER_COUNT,
      filteringStates: [FILTERING_STATUES],
      token: this.props.token,
      orders: this.props.orders ? this.props.orders : []
    };
    let obj = {
      orderId: this.props.orderId,
      payload: data
    };

    this.props.attendOrder(obj);
  };

  reject = () => {
    let data = {
      skip: 0,
      limit: ORDER_COUNT,
      filteringStates: [FILTERING_STATUES],
      token: this.props.token,
      orders: this.props.orders ? this.props.orders : []
    };
    let obj = {
      orderId: this.props.orderId,
      releaseItems: true,
      payload: data
    };

    this.props.closeOrder(obj);
  };

  getPayload = () => {
    return {
      skip: 0,
      limit: ORDER_COUNT,
      filteringStates: [FILTERING_STATUES],
      token: this.props.token,
      orders: this.props.orders ? this.props.orders : []
    };
  };

  loadToast = () => {
    if (this.props.errorMessage) {
      setTimeout(
        function() {
          this.setState({
            visibleToast: false
          });
        }.bind(this),
        3000
      );
    } else if (!this.state.visibleToast) {
      setTimeout(
        function() {
          this.setState({
            visibleToast: true
          });
        }.bind(this),
        500
      );
    }

    return (
      <Toast
        visible={this.props.errorMessage !== null && this.state.visibleToast}
        position={Toast.positions.CENTER}
        textColor={"red"}
        backgroundColor={"white"}
        hideOnPress={true}
      >
        {this.props.errorMessage
          ? typeof this.props.errorMessage.message === "string"
            ? this.props.errorMessage.message
            : "Error occurred while updating order"
          : "Error occurred while updating order"}
      </Toast>
    );
  };

  swipeoutBtns = [
    {
      component: (
        <View>
          <Image
            style={styles.swipeIcon}
            source={require("../../../assets/cancel.png")}
          />
          <Text style={styles.swipeIconTextReject}>REJECT</Text>
        </View>
      ),
      autoClose: true,
      backgroundColor: "#F1969C",
      onPress: this.reject,
      close: true
    },
    {
      component: (
        <View>
          <Image
            style={styles.swipeIcon}
            source={require("../../../assets/checked.png")}
          />
          <Text style={styles.swipeIconTextAccept}>ACCEPT</Text>
        </View>
      ),
      autoClose: true,
      backgroundColor: "#9CF196",
      onPress: this.accept,
      close: true
    }
  ];

  renderOrderActionButton = orderState => {
    if (orderState === "READY_TO_PICK_UP") {
      return <Text style={styles.orderListItemActionButton}>VERIFY</Text>;
    }
    if (orderState === "READY_TO_DELIVER") {
      return <Text style={styles.orderListItemActionButton}>DISPATCH</Text>;
    }
    return null;
  };

  render() {
    return (
      <Swipeout
        style={styles.orderListSwipe}
        right={
          this.props.orderState === "PENDING"
            ? this.swipeoutBtns
            : this.props.orderState === "ATTENDED"
            ? [this.swipeoutBtns[0]]
            : []
        }
      >
        {this.loadToast()}
        <TouchableOpacity
          activityOpacity={0.5}
          onPress={() =>
            this.props.navigation.navigate("Order", {
              userName: this.props.userName,
              time: this.props.time,
              type: this.props.type,
              image: this.props.image,
              items: this.props.items,
              orderId: this.props.orderId,
              orderState: this.props.orderState,
              payload: this.getPayload()
            })
          }
        >
          <View style={styles.orderListItemContainer}>
            <Image
              style={styles.orderListItemImage}
              source={this.props.image}
            />
            <View style={styles.orderListItemTextParentContainer}>
              <View style={styles.orderListItemTextContainer}>
                <Text>
                  {this.props.userName ? this.props.userName.split(" ")[0] : ""}
                </Text>
                <Text style={styles.orderListItemOrderText}>
                  has placed an order
                </Text>
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderListItemTypeStyle}>
                  {this.props.type}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    marginLeft: wp("1%"),
                    paddingLeft: wp("1%"),
                    paddingRight: wp("1%"),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    backgroundColor: this.orderStateColorPicker(
                      this.props.orderState
                    )
                  }}
                >
                  {this.toPascalNotation(this.props.orderState)}
                </Text>
              </View>
              <Text style={styles.orderListItemTimeStyle}>
                {this.props.time}
              </Text>
              {this.renderOrderActionButton(this.props.orderState)}
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user,
    token: state.login.token,
    orders: state.orders.orders,
    errorMessage: state.orders.errorMessage
  };
}

export default connect(
  mapStateToProps,
  {
    requestOrders,
    attendOrder,
    closeOrder
  }
)(OrderListItem);
