import React, { PureComponent } from "react";
import {
  BackHandler,
  Image,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  ImageBackground,
  Platform
} from "react-native";
import { Button } from "react-native-elements";
import { styles } from "./OrderStyle";
import ProductList from "./product/ProductList";
import connect from "react-redux/es/connect/connect";
import {
  attendOrder,
  closeOrder,
  changeToReadyToDeliever,
  changeToReadyToPickup,
  changeToDispatched,
  changeToPickUp
} from "../actions/orderActions";
import { TextInput } from "react-native-gesture-handler";

class Order extends PureComponent {
  static navigationOptions = {
    title: ""
  };

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
  }

  goBack() {
    this.props.navigation.goBack();
    return true;
  }

  accpetOrder = (orderId, payload) => {
    let obj = {
      orderId: orderId,
      payload: payload
    };
    this.props.attendOrder(obj);
  };

  rejectOrcer = (orderId, payload) => {
    let obj = {
      orderId: orderId,
      payload: payload
    };
    this.props.closeOrder(obj);
  };

  state = {
    secretCode: "",
    orderUpdating: ""
  };

  changeSecretCode = text => {
    this.setState({ secretCode: text });
  };

  renderOrderActionButton = (
    orderState,
    orderType,
    rejectOrder,
    accpetOrder,
    orderId,
    payload,
    updatingOrder
  ) => {
    let rejectButton = (
      <TouchableOpacity
        style={styles.productBtnReject}
        onPress={() => {
          rejectOrder(orderId, payload);
          this.props.navigation.navigate("Orders");
        }}
      >
        <Text style={styles.productBtnText}>REJECT</Text>
      </TouchableOpacity>
    );
    if (orderState === "PENDING") {
      return (
        <View style={styles.orderActionButtons}>
          {rejectButton}
          <TouchableOpacity
            style={styles.productBtnAccept}
            onPress={() => {
              this.props.navigation.navigate("Orders");
              !updatingOrder ? accpetOrder(orderId, payload) : "";
            }}
          >
            <Text style={styles.productBtnMainText}>ACCEPT</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (orderState === "ATTENDED") {
      return (
        <View style={styles.orderActionButtons}>
          {rejectButton}
          <TouchableOpacity
            style={styles.productBtnAccept}
            onPress={() => {
              if (orderType === "Delivery" && !updatingOrder) {
                // this.setState({ orderUpdating: false });
                this.props.changeToReadyToDeliever({
                  orderId,
                  token: payload.token,
                  payload
                });
                this.props.navigation.navigate("Orders");
              } else if (orderType === "Pickup" && !updatingOrder) {
                // this.setState({ orderUpdating: false });
                this.props.changeToReadyToPickup({
                  orderId,
                  token: payload.token,
                  payload
                });
                this.props.navigation.navigate("Orders");
              }
            }}
          >
            <Text style={styles.productBtnMainText}>
              {orderType === "Delivery"
                ? updatingOrder
                  ? "WAIT..."
                  : "READY"
                : updatingOrder
                ? "WAIT..."
                : "READY"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (orderState === "READY_TO_DELIVER") {
      return (
        <View style={styles.orderActionButtons}>
          <TouchableOpacity
            style={styles.productBtnAccept}
            onPress={() => {
              if (!updatingOrder) {
                // this.setState({ orderUpdating: false });
                this.props.changeToDispatched({
                  orderId,
                  token: payload.token,
                  payload
                });
                this.props.navigation.navigate("Orders");
              }
            }}
          >
            <Text style={styles.productBtnMainText}>
              {updatingOrder ? "WAIT..." : "DISPATCH"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (orderState === "READY_TO_PICK_UP") {
      return (
        <View style={styles.orderActionButtons}>
          <TextInput
            style={styles.verifyBuyerText}
            placeholder="Secret Code"
            placeholderTextColor="#ddd"
            onChangeText={text => this.changeSecretCode(text)}
            value={this.state.secretCode}
          ></TextInput>
          <TouchableOpacity
            style={styles.productBtnAccept}
            onPress={() => {
              if (!updatingOrder) {
                this.setState({ orderUpdating: true });
                this.props.changeToPickUp({
                  orderId,
                  token: payload.token,
                  payload,
                  secretCode: this.state.secretCode
                });
              }
            }}
          >
            <Text style={styles.productBtnMainText}>
              {updatingOrder ? "WAIT..." : "VERIFY"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    const { navigation } = this.props;
    let image = navigation.getParam("image");
    let type = navigation.getParam("type");
    let name = navigation.getParam("userName");
    let time = navigation.getParam("time");
    let items = navigation.getParam("items");
    let orderId = navigation.getParam("orderId");
    let payload = navigation.getParam("payload");
    let orderState = navigation.getParam("orderState");
    let updatingOrder = this.props.updatingOrder;
    return this.state.orderUpdating && !this.props.errorMessage ? (
      <View style={styles.updatingOrderView}>
        {updatingOrder ? (
          <React.Fragment>
            <ActivityIndicator size="large" color="#2790D3" />
            <Text style={styles.updatingOrderViewText}>Please wait...</Text>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ImageBackground style={styles.verifiedImageContainer}>
              <Image
                style={styles.verifiedImage}
                source={require("../../../assets/buyerverified.png")}
              />
            </ImageBackground>
            <Text style={styles.updatingOrderViewText}>Successful</Text>
            <TouchableOpacity
              style={styles.productBtnAccept}
              onPress={() => {
                this.setState({ orderUpdating: false });
                navigation.navigate("Orders");
              }}
            >
              <Text style={styles.productBtnMainText}>BACK</Text>
            </TouchableOpacity>
          </React.Fragment>
        )}
      </View>
    ) : (
      <KeyboardAvoidingView
        style={styles.orderUCContainer}
        behavior="position"
        keyboardVerticalOffset={64}
        enabled
      >
        <View style={styles.orderUpperComponent}>
          <Image style={styles.orderImage} source={image} />
          <View style={styles.orderUCContainerRight}>
            <Text style={styles.orderUCName}>{name}</Text>
            <Text style={styles.orderUCTime}>{time}</Text>
            <Text style={styles.orderUCType}>{type}</Text>
          </View>
        </View>
        <View style={styles.orderLowerComponent}>
          <ProductList items={items} />
        </View>
        <View style={styles.productButtonParent}>
          {this.renderOrderActionButton(
            orderState,
            type,
            this.rejectOrcer,
            this.accpetOrder,
            orderId,
            payload,
            updatingOrder
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    updatingOrder: state.orders.updatingOrder,
    errorMessage: state.orders.errorMessage
  };
}

export default connect(
  mapStateToProps,
  {
    attendOrder,
    closeOrder,
    changeToReadyToDeliever,
    changeToReadyToPickup,
    changeToDispatched,
    changeToPickUp
  }
)(Order);
