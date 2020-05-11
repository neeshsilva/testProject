import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import moment from "moment";

const DateStrip = props => {
  return (
    <View style={styles.parentDate}>
      <Text style={styles.dateStrip}>
        {moment(props.date, "MM-DD-YY").format("MMM DD YYYY")}
      </Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  parentDate: {
    width: wp("100%"),
    height: hp("5%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  dateStrip: {
    color: "#a299a2",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 19,
    padding: wp("1%")
  }
});

export default DateStrip;
