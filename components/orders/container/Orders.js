import React, { Component } from "react";
import { Notifications } from "expo";
import connect from "react-redux/es/connect/connect";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Toast from "react-native-easy-toast";

import { styles } from "./OrderStyle";
import { requestProfile } from "../../profile/actions/profileActions";
import {
  changeFilteringState,
  sendNotificationToken
} from "../actions/orderActions";
import { forceLogout } from "../../login_logout/actions/loginLogoutActions";
import OrderList from "./OrderList";
import {
  removeAndroidBackButtonHandler,
  handleAndroidBackButton,
  navigateBack
} from "../../utils/navigationHandler";
import BottomNavigation from "../../BottomNavigation";
import OrderFilteringModal from "./OrderFilteringModal";
import requireLogin from "../../utils/requireLogin";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.exitApp = this.exitApp.bind(this);
  }

  state = {
    modalVisible: false
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  async getToken(retailerId) {
    let token = await Notifications.getExpoPushTokenAsync();
    this.props.sendNotificationToken({
      id: retailerId,
      firebaseToken: token,
      firebaseOldToken: token
    });
  }

  componentDidMount() {
    this.props.requestProfile({ retailerId: this.props.user.user._id });
    handleAndroidBackButton(this.exitApp);
  }

  componentWillUnmount() {
    removeAndroidBackButtonHandler(this.exitApp);
  }

  exitApp() {
    navigateBack(this.props);
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.parentPage}>
          <View style={styles.upperComponent}>
            <Text style={styles.title}>
              {this.props.filteringState &&
                this.props.filteringState.length === 1
                ? this.props.filteringState[0] === "PENDING"
                  ? "Notifications"
                  : "Orders"
                : "Orders"}
            </Text>
          </View>
          <View style={styles.lowerComponent}>
            {this.props.orders &&
              this.props.filteringState &&
              this.props.filteringState[0] !== "PENDING" ? (
                <View style={styles.filterOrdersMain}>
                  <TouchableOpacity
                    style={styles.filterAllCategoriesButton}
                    activityOpacity={0.5}
                    onPress={() => {
                      if (this.props.filteringState.length !== 5) {
                        this.props.changeFilteringState([
                          "ATTENDED",
                          "READY_TO_DELIVER",
                          "READY_TO_PICK_UP",
                          "DISPATCHED",
                          "COMPLETED"
                        ]);
                      }
                      this.props.navigation.navigate("Orders");
                    }}
                  >
                    <ImageBackground style={styles.filterAllCategoriesImg}>
                      <Image
                        style={styles.filterCategoriesImg}
                        source={require("../../../assets/allOrders.png")}
                      />
                    </ImageBackground>
                    <Text>All orders</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.filterCategoriesButton}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <ImageBackground style={styles.filterCategoriesImg}>
                      <Image
                        style={styles.filterCategoriesImg}
                        source={require("../../../assets/filter.png")}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              ) : null}
            {this.props.orderToken && (
              <OrderList
                key={this.props.filteringState.join("-")}
                navigation={this.props.navigation}
              />
            )}
          </View>
          <BottomNavigation
            navigation={this.props.navigation}
          ></BottomNavigation>
        </View>
        <OrderFilteringModal
          viewModal={this.state.modalVisible}
          alterModalDisplay={this.setModalVisible}
        ></OrderFilteringModal>
        <Toast
          ref="toast"
          style={{ backgroundColor: "green" }}
          position="top"
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "red" }}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    orderToken: state.login.token,
    user: state.login.user,
    profileImage: state.profile.profileImage,
    orders: state.orders.orders,
    filteringState: state.orders.filteringState
  };
}

export default connect(mapStateToProps, {
  requestProfile,
  changeFilteringState,
  sendNotificationToken,
  forceLogout
})(Orders);
