import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Actions } from "react-native-router-flux";

export default class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text>Welcome</Text>
      </View>
    );
  }
}
