import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { styles } from "./ProfileStyle";
import connect from "react-redux/es/connect/connect";
import { logOut } from "../../login_logout/actions/loginLogoutActions";
import { requestProfile } from "../actions/profileActions";
import profileEmail from "../../../assets/profileEmail.png";
import placeholder from "../../../assets/placeholder.png";
// import requireLogin from "../../utils/requireLogin";

class Profile extends Component {
  componentDidMount() {
    // let data = { retailerId: this.props.user.user._id };
    // if (!this.props.profileImage) {
    //   this.props.requestProfile(data);
    // }
  }

  logOutFn = () => {
    this.props.logOut();
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={styles.parent}>
        <ImageBackground style={styles.logoOuterBorader}>
          <Image
            style={styles.logo}
            source={{
              uri: this.props.profileImage ? this.props.profileImage.url : null
            }}
          />
        </ImageBackground>
        <Text style={styles.shopText}>{this.props.userName}</Text>
        <View style={styles.profileDataDisplay}>
          <View style={styles.profileDataSection}>
            <View style={styles.dataImageDisplay}>
              <ImageBackground style={styles.profileEmail}>
                <Image style={styles.profileEmailImage} source={profileEmail} />
              </ImageBackground>
            </View>
            <View style={styles.actualDataDisplay}>
              <Text>Email</Text>
              <Text style={styles.actualData}>
                {this.props.email ? this.props.email : "Not available"}
              </Text>
            </View>
          </View>
          <View style={styles.profileDataSection}>
            <View style={styles.dataImageDisplay}>
              <ImageBackground style={styles.profileLocation}>
                <Image
                  style={styles.profileLocationImage}
                  source={placeholder}
                />
              </ImageBackground>
            </View>
            <View style={styles.actualDataDisplay}>
              <Text>Primary Address</Text>
              {this.props.primaryAddress ? (
                <React.Fragment>
                  <Text style={styles.actualData}>
                    {this.props.primaryAddress.addressLine1}
                  </Text>
                  <Text style={styles.actualData}>
                    {this.props.primaryAddress.addressLine2}
                  </Text>
                  <Text style={styles.actualData}>
                    {this.props.primaryAddress.city}
                  </Text>
                  <Text style={styles.actualData}>
                    {this.props.primaryAddress.state}
                  </Text>
                </React.Fragment>
              ) : null}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={this.logOutFn}>
          <Text style={styles.logoutBtnText}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user,
    primaryAddress: state.profile.profile
      ? state.profile.profile.advanceinfo
        ? state.profile.profile.advanceinfo.address
        : {}
      : {},
    email: "",
    profileImage: state.profile.profileImage,
    userName: state.profile.retailerName,
    errorMessage: state.profile.errorMessage,
    isRequesting: state.profile.requestProfile
  };
}

export default connect(
  mapStateToProps,
  {
    logOut,
    requestProfile
  }
)(Profile);
