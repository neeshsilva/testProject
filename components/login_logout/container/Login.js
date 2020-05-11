import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  TextInput,
  View,
  KeyboardAvoidingView
} from "react-native";
import { Button } from "react-native-elements";
import { styles } from "./LoginStyle";
import connect from "react-redux/es/connect/connect";
import { login } from "../actions/loginLogoutActions";
import Toast from "react-native-root-toast";
import { TYPE_RETAILER } from "../../utils/constants";

const LOGIN_IMAGE_URL = require("../../../assets/login_background.png");
const LOGIN_IMAGE_URL2 = require("../../../assets/login_background_2.png");
const LOGO_URL = require("../../../assets/logo.png");

class Login extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    userName: null,
    password: null,
    correctUserName: true,
    correctPassword: true,
    visibleToast: true
  };

  componentDidUpdate() {
    if (this.props.loginSuccess) {
      this.props.navigation.navigate("Orders");
    }
  }

  setUserName = name => {
    this.setState({
      userName: name,
      visibleToast: this.props.errorMessage ? false : true
    });
  };

  setPassword = pass => {
    this.setState({
      password: pass,
      visibleToast: this.props.errorMessage ? false : true
    });
  };

  // componentDidMount() {
  //   this.props.login({
  //     user: {
  //       userId: "super@store.com",
  //       password: "harsha123",
  //       type: TYPE_RETAILER
  //     }
  //   });
  // }

  login = () => {
    if (this.state.userName && this.state.password) {
      let data = {
        user: {
          userId: this.state.userName,
          password: this.state.password,
          type: TYPE_RETAILER
        }
      };
      this.props.login(data);
      this.setState({
        userName: null,
        password: null,
        visibleToast: true
      });
    } else {
      this.setState({
        correctUserName: false,
        correctPassword: false
      });
    }
  };

  loadToast = () => {
    if (this.props.errorMessage) {
      return (
        <Toast
          visible={this.state.visibleToast}
          position={250}
          shadow={false}
          animation={false}
          hideOnPress={true}
          textColor={"red"}
          backgroundColor={"white"}
        >
          Invalid username or password
        </Toast>
      );
    }
  };

  render() {
    return (
      <View style={styles.parentPage}>
        <ImageBackground source={LOGIN_IMAGE_URL} style={styles.bcImage}>
          <ImageBackground source={LOGIN_IMAGE_URL2} style={styles.bcImage}>
            <KeyboardAvoidingView
              style={styles.orderUCContainer}
              behavior="position"
              keyboardVerticalOffset={60}
              enabled
            >
              <Image source={LOGO_URL} style={styles.logoImage}></Image>
              {this.loadToast()}

              <TextInput
                style={
                  this.state.correctUserName
                    ? styles.userName
                    : styles.incorrectUserName
                }
                placeholder={"Username"}
                value={this.state.userName || ""}
                onChangeText={text => this.setUserName(text)}
                editable={true}
              />
              <TextInput
                secureTextEntry={true}
                style={
                  this.state.correctPassword
                    ? styles.password
                    : styles.incorrectPassword
                }
                placeholder={"Password"}
                value={this.state.password || ""}
                onChangeText={text => this.setPassword(text)}
                editable={true}
              />
              <Button
                buttonStyle={styles.btn}
                loading={this.props.loginState}
                title={"Login"}
                onPress={() => this.login()}
              />
            </KeyboardAvoidingView>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginState: state.login.loginState,
    loginSuccess: state.login.loginSuccess,
    errorMessage: state.login.errorMessage
  };
}

export default connect(mapStateToProps, {
  login
})(Login);
