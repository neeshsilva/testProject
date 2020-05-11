import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  parentPage: {
    flex: 1,
    alignItems: "center"
  },
  orderStateFilterItem: {
    flexDirection: "row",
    marginTop: hp("1%"),
    marginBottom: hp("1%")
  },
  orderStateFilterMainText: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: hp("2%")
  },
  stateIdentifierText: {
    color: "#7C7C7C",
    fontSize: 14,
    marginLeft: wp("2%")
  },
  orderFilterModal: {
    height: hp("100%"),
    width: wp("100%"),
    flexDirection: "row"
  },
  orderFilterModalExit: {
    flex: 1,
    backgroundColor: "#262626",
    opacity: 0.9
  },
  orderFilterModalContent: {
    backgroundColor: "white",
    flex: 1,
    opacity: 1,
    paddingTop: hp("2%"),
    paddingLeft: wp("5%")
  },
  filterOrdersMain: {
    width: wp("100%"),
    backgroundColor: "#fafafa",
    height: "5%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: wp("5%"),
    justifyContent: "flex-end"
  },
  filterAllCategoriesButton: {
    width: wp("30%"),
    height: 17,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  filterAllCategoriesImg: {
    height: 17,
    width: 17,
    marginRight: wp("1%")
  },
  filterCategoriesButton: {
    width: 17,
    height: 17
  },
  filterCategoriesImg: {
    width: 17,
    height: 17
  },
  stateIdentifier: {
    width: 20,
    height: 20,
    borderRadius: 3
  },
  upperComponent: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    width: wp("100%"),
    height: hp("11.25%"),
    paddingTop: hp("3%")
  },
  title: {
    height: hp("3.75%"),
    marginLeft: wp("5%"),
    fontSize: 20,
    fontWeight: "700"
  },
  lowerComponent: {
    alignItems: "center",
    width: wp("100%"),
    height: hp("80.75%")
  },

  signOut: {
    marginTop: hp("5.6%"),
    marginLeft: wp("16.11%"),
    backgroundColor: "#F2F2F2",
    borderRadius: 100,
    alignItems: "center"
  },
  imageContainer: {
    height: hp("3.1%"),
    width: wp("5.5%"),
    borderRadius: hp("1.56%"),
    marginTop: hp("5.6%"),
    marginLeft: wp("24.4%"),
    backgroundColor: "#F2F2F2"
  },
  image: {
    height: hp("3.1%"),
    width: wp("5.5%"),
    borderRadius: hp("1.56%"),
    borderColor: "#000000",
    borderWidth: 1,
    marginLeft: wp("0.56%"),
    marginTop: hp("0.31%")
  },
  verifiedImageContainer: {
    height: hp("14%"),
    width: wp("27%")
  },
  verifiedImage: {
    height: hp("14%"),
    width: wp("27%")
  },
  imageBack: {
    height: hp("4.06%"),
    width: wp("7.22%"),
    borderRadius: hp("2.03%"),
    borderColor: "#000000",
    borderWidth: 1
  },
  imageBackNoOrders: {
    backgroundColor: "#FFFFFF"
  },
  imageNoOrder: {
    height: hp("16.09%"),
    width: wp("43.33%"),
    marginLeft: wp("28.33%"),
    marginTop: hp("17.3%")
  },
  imageNoOrderTxt: {
    marginTop: hp("1.56%"),
    marginLeft: wp("30.88%"),
    width: wp("0.5%"),
    height: hp("9.37%"),
    fontSize: 24,
    color: "#767676"
  },
  orderListSeperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#F2F2F2"
  },
  orderListItem: {
    padding: 10,
    fontSize: 18,
    height: hp("6.8%")
  },
  orderDateItem: {
    padding: 10,
    fontSize: 18,
    height: hp("6.8%"),
    backgroundColor: "#F2F2F2",
    color: "#999999"
  },

  orderListSwipe: {
    backgroundColor: "white"
  },

  swipeIcon: {
    marginLeft: wp("6.9%"),
    marginTop: hp("3.9%"),
    resizeMode: "stretch",
    width: wp("6.9%"),
    height: hp("3.9%"),
    borderRadius: 12.5
  },

  swipeIconTextReject: {
    marginLeft: wp("5.5%"),
    marginTop: hp("0.3125%"),
    color: "#B60D0D"
  },
  swipeIconTextAccept: {
    marginLeft: wp("5.5%"),
    marginTop: hp("0.3125%"),
    color: "#09BB1A"
  },
  orderListSpinner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "95%"
  },
  orderListContainer: {
    width: "100%",
    height: "95%"
  },

  orderActionButtons: {
    // position: "absolute",
    // bottom: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: wp("100%"),
    paddingRight: wp("3%")
  },

  orderListItemContainer: {
    flexDirection: "row",
    paddingTop: hp("1%"),
    paddingBottom: hp("1%")
  },

  orderListItemImage: {
    height: hp("6.25%"),
    width: wp("11.1%"),
    borderRadius: hp("1%"),
    marginLeft: wp("6.3%"),
    borderColor: "#99999999",
    borderWidth: 1,
    resizeMode: "stretch"
  },

  orderImage: {
    height: hp("12.5%"),
    width: wp("22.2%"),
    borderRadius: hp("6.25%"),
    marginLeft: wp("6.76%"),
    marginTop: hp("1.56%"),
    borderColor: "#99999999",
    borderWidth: 1
  },

  orderListItemTextParentContainer: {
    flexDirection: "column",
    marginLeft: wp("6.9%"),
    width: wp("66%")
  },

  orderListItemTextContainer: {
    flexDirection: "row"
  },

  orderListItemOrderText: {
    color: "#999999",
    marginLeft: 2
  },

  orderListItemTypeStyle: {
    color: "#2790D3",
    marginTop: 1
  },
  orderListItemStateStyle: {
    fontSize: 10,
    color: "white",
    padding: wp("1%")
  },
  orderListItemTimeStyle: {
    color: "#999999",
    marginTop: 1
  },

  orderUpperComponent: {
    flexDirection: "row"
  },

  orderInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  orderUCImage: {
    height: hp("12.5%"),
    width: wp("22.2%"),
    borderRadius: hp("6.25%"),
    marginLeft: wp("6.38%"),
    resizeMode: "stretch"
  },
  updatingOrderView: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },

  updatingOrderViewText: {
    fontSize: 20,
    color: "#2790D3",
    marginTop: hp("2%"),
    marginBottom: hp("2%")
  },
  orderUCContainer: {
    display: "flex",
    flexDirection: "column"
  },
  orderUCContainerRight: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: wp("7.2%"),
    paddingTop: hp("1.7%")
  },
  orderUCNameTime: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  orderUCTime: {
    color: "#999999"
  },
  orderUCType: {
    color: "#2790D3"
  },

  orderLowerComponent: {
    alignItems: "center",
    width: wp("100%"),
    maxHeight: hp("63.5%"),
    overflow: "scroll",
    paddingTop: hp("1.5%")
  },

  productParent: {
    flexDirection: "row"
  },

  productImage: {
    width: wp("16.6%"),
    height: hp("9.3%"),
    marginLeft: wp("11.6%"),
    resizeMode: "stretch"
  },

  productTextParent: {
    flexDirection: "column"
  },

  productText: {
    marginLeft: wp("2.77%"),
    marginTop: 3,
    color: "#b2beb5"
  },

  productButtonParent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: hp("4%")
  },

  productBtnReject: {
    width: wp("30.11%"),
    height: hp("5.4%"),
    borderRadius: 5
  },

  productBtnText: {
    color: "#2790D3",
    marginLeft: wp("13.8%"),
    marginTop: hp("1.5%")
  },

  productBtnMainText: {
    color: "white"
  },

  productBtnAccept: {
    width: wp("30.11%"),
    height: hp("5.4%"),
    backgroundColor: "#2790D3",
    borderRadius: 5,
    fontSize: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp("2%"),
    marginRight: wp("1%")
  },
  verifyBuyerMain: {
    width: wp("100%"),
    height: hp("100%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a8ee90"
  },
  verifyBuyerText: {
    height: hp("5.4%"),
    width: wp("30%"),
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    marginLeft: wp("8%"),
    paddingLeft: wp("1%")
  },
  orderListItemActionButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: hp("4%"),
    width: wp("20%"),
    backgroundColor: "#2790D3",
    color: "white",
    borderRadius: 3,
    textAlign: "center",
    paddingTop: hp("0.7%"),
    marginBottom: hp("1%"),
    fontSize: 13
  },
  chatListItemContainer: {
    flexDirection: "row",
    paddingTop: hp("2%"),
    paddingBottom: hp("2%")
  },
  chatListItemTextParentContainer: {
    flexDirection: "column",
    marginLeft: wp("6.9%"),
    width: wp("66%")
  },
  chatListItemImage: {
    height: 50,
    width: 50,
    borderRadius: 400,
    backgroundColor: "white"
  },

  bolderFont: {
    fontWeight: "700",
    flex: 3,
    fontSize: 15
  },
  normalFont: {
    fontWeight: "400",
    flex: 3,
    fontSize: 15
  },
  summaryName: {
    fontSize: 17,
    fontWeight: "700"
  },
  summaryDisplay: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  summaryDate: {
    flex: 1
  },
  chatLowerComponent: {
    alignItems: "center",
    width: wp("100%"),
    flex: 6
    // backgroundColor: "red"
  },
  chatUpperComponent: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    width: wp("100%"),
    height: hp("8%"),
    paddingTop: hp("3%"),
    shadowOffset: { width: 10, height: 12 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 4,
    backgroundColor: "white"
  },
  oldMessages: {
    height: hp("73%"),
    marginBottom: hp("1%"),
    width: wp("100%"),
    display: "flex",
    justifyContent: "flex-end"
  },
  chatBoxHeading: {
    height: hp("10%"),
    width: wp("100%"),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: wp("5%")
  },
  chatBoxUpperImage: {
    height: 60,
    width: 60,
    borderRadius: 400,
    backgroundColor: "white",
    marginRight: wp("4%")
  },
  newMessage: {
    height: hp("12%"),
    width: wp("100%"),
    display: "flex",
    flexDirection: "row",
    paddingTop: hp("2%"),
    shadowOffset: { width: 10, height: 12 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 4,
    backgroundColor: "white"
  },
  chatMessage: {
    borderRadius: 7,
    width: wp("70%"),
    height: hp("6%"),
    marginLeft: wp("4%"),
    paddingLeft: wp("3%"),
    backgroundColor: "#f8f8f8"
  },
  sendMessageButton: {
    borderRadius: 7,
    backgroundColor: "#08a7fb",
    height: hp("6%"),
    width: wp("16%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp("3%")
  },
  sendMessageText: {
    fontWeight: "700",
    color: "white"
  },
  chatBoxBackButton: {
    width: 20,
    height: 19,
    marginRight: wp("5%")
  },
  loadingView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: hp("73%"),
    width: wp("100%")
  }
});
