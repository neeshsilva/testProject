import { StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  parentPage: {
    flex: 1,
    alignItems: "center"
  },
  blue: {
    color: "blue"
  },
  bcImage: {
    width: "100%",
    height: "100%"
  },
  logoImage: {
    width: wp("40.8%"),
    height: hp("15%"),
    marginTop: hp("20.6%"),
    marginLeft: wp("29%")
  },

  userName: {
    width: wp("61%"),
    height: hp("6%"),
    marginTop: hp("9%"),
    marginLeft: wp("19%"),
    backgroundColor: "white",
    borderRadius: 3,
    paddingLeft: wp("1%")
  },
  password: {
    width: wp("61%"),
    height: hp("6%"),
    marginTop: hp("1%"),
    marginLeft: wp("19%"),
    backgroundColor: "white",
    borderRadius: 3,
    paddingLeft: wp("1%")
  },

  incorrectUserName: {
    width: wp("61.66%"),
    height: hp("6.25%"),
    marginTop: hp("9.35%"),
    marginLeft: wp("19.1%"),
    borderColor: "#FF0000",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: wp("1%")
  },
  incorrectPassword: {
    width: wp("61.66%"),
    height: hp("6.25%"),
    marginTop: hp("8.5%"),
    marginLeft: wp("19.1%"),
    borderColor: "#FF0000",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: wp("1%")
  },

  btn: {
    marginTop: hp("6.25%"),
    marginLeft: wp("36.9%"),
    width: wp("26.1%"),
    height: hp("5.4%")
  }
});
