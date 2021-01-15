import * as React from "react";
import { View, Text } from "react-native";

export default class App extends React.Component {
  componentDidMount() {
    console.log("Before");
    debugger
    console.log("After");
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Deniska</Text>
      </View>
    );
  }
}
