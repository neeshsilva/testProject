import React from "react";

import cl, { cloudinaryConfig } from "../../utils/cloudinary";

import {
  Image,
  ImageBackground,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { styles } from "./ChatStyles";

const ChatBoxHeading = props => {
  return (
    <React.Fragment>
      <View style={styles.chatBoxHeading}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ChatHistory")}
        >
          <Image
            style={styles.chatBoxBackButton}
            source={require("../../../assets/leftArrow.png")}
          />
        </TouchableOpacity>
        <Image
          style={styles.chatBoxUpperImage}
          source={
            props.userImageId
              ? {
                  uri: cl.url(props.userImageId, {
                    width: 50,
                    height: 50
                  })
                }
              : require("../../../assets/defaultPro.png")
          }
        />
        <Text style={styles.summaryName}>{props.userName || ""}</Text>
      </View>
    </React.Fragment>
  );
};

export default ChatBoxHeading;
