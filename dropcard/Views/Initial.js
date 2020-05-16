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
import * as Font from "expo-font";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fontLoaded: false
    };
  }

  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        Actions.reset("tabbar");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  async componentDidMount() {
    await Font.loadAsync({
      Mollen: require("../assets/fonts/MollenSans/MollenPersonalUse-Regular.ttf"),
      MollenBold: require("../assets/fonts/MollenSans/MollenPersonalUse-Bold.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputBox}>
          {this.state.fontLoaded ? (
            <Text style={styles.label}>Email</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="johndoe@example.com"
            onChangeText={email => {
              this.setState({ email });
            }}
          />
        </View>
        <View style={styles.inputBox}>
          {this.state.fontLoaded ? (
            <Text style={styles.label}>Password</Text>
          ) : null}
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="**********"
            onChangeText={password => {
              this.setState({ password });
            }}
          />
        </View>
        <View style={styles.inputBox}>
          <TouchableOpacity
            style={styles.login}
            onPress={() => {
              this.login(this.state.email, this.state.password);
            }}
          >
            {this.state.fontLoaded ? (
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  fontSize: 20,
                  textAlign: "center",
                  fontFamily: "Mollen"
                }}
              >
                Login
              </Text>
            ) : null}
          </TouchableOpacity>
        </View>
        {this.state.fontLoaded ? (
          <View style={styles.inline}>
            <Text style={styles.reg}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                Actions.signup();
              }}
            >
              <Text style={styles.signup}>&nbsp;Sign Up!</Text>
            </TouchableOpacity>
          </View>
        ) : null}
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
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20
  },
  signup: {
    color: "#57D9A3",
    fontWeight: "600",
    fontFamily: "Mollen"
  },
  input: {
    height: 40,
    width: 250,
    borderColor: "#57D9A3",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 5
  },
  inputBox: {
    height: 60,
    width: 250,
    marginTop: 20
  },
  login: {
    width: 250,
    backgroundColor: "#57D9A3",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    fontFamily: "Mollen",
    color: "#444",
    letterSpacing: 1
  },
  reg: {
    fontFamily: "Mollen"
  }
});
