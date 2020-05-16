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
import * as firebase from "firebase";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Actions.reset("initial");
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign Out" onPress={() => this.signOut()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  }
});
