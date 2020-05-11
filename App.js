import React, { Component } from "react";
import { setupAxios } from "./components/utils/axios.global";
import { YellowBox } from "react-native";

import Navigator from "./components/Navigator";
import Root from "./Root";

YellowBox.ignoreWarnings([
  "Warning: Each",
  "Warning: Failed",
  "Require cycle:"
]);

setupAxios();

class App extends Component {
  render() {
    return (
        <Root>
          <Navigator />
        </Root>
    );
  }
}

export default App;
