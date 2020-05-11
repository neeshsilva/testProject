import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

let imageParams = 130;
let borderSize = 400;
let borderWidth = 1;

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // justifyContent: "center"
  },
  profileDataDisplay: {
    // backgroundColor: "yellow",
    width: wp("100%"),
    paddingLeft: wp("10%"),
    paddingRight: wp("10%"),
    paddingTop: hp("2%")
  },
  profileDataSection: {
    width: "100%",
    marginBottom: hp("2%"),
    flexDirection: "row"
  },
  dataImageDisplay: {
    flex: 1
    // backgroundColor: "#0000001A"
  },
  actualDataDisplay: {
    flex: 7
    // backgroundColor: "#2790D3"
  },
  actualData: {
    color: "#A2A2A2"
  },
  profileEmail: {
    width: 18,
    height: 14
  },
  profileEmailImage: {
    width: 18,
    height: 14
  },
  profileLocation: {
    width: 14,
    height: 20
  },
  profileLocationImage: {
    width: 14,
    height: 20
  },
  logo: {
    // width: wp("40.27%"),
    // height: hp("22.6%"),
    // borderRadius: hp("50%"),
    width: imageParams,
    height: imageParams,
    borderRadius: borderSize,
    borderWidth,
    borderColor: "#000000"
  },

  logoOuterBorader: {
    // width: wp("43.6%"),
    // height: hp("24.5%"),
    // borderRadius: hp("12.25%"),
    width: imageParams,
    height: imageParams,
    borderRadius: borderSize,
    borderWidth,
    borderColor: "#000000"
  },

  shopText: {
    color: "#000000",
    marginTop: hp("3.12%"),
    fontSize: 20,
    fontWeight: "bold"
  },

  logoutBtn: {
    marginTop: wp("10%"),
    marginBottom: wp("10%"),
    height: hp("5.4%"),
    width: wp("40%"),
    borderColor: "#2790D3",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center"
  },

  logoutBtnText: {
    color: "#2790D3",
    fontSize: 14
  }
});
