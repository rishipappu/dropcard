import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";
import * as firebase from "firebase";
import "@firebase/firestore";
import * as Font from "expo-font";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm: "",
      confirmPassword: false,
      first: "",
      last: "",
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Mollen: require("../assets/fonts/MollenSans/MollenPersonalUse-Regular.ttf"),
      MollenBold: require("../assets/fonts/MollenSans/MollenPersonalUse-Bold.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  register = (email, password, first, last) => {
    const initial = {
      email: email,
      first: first,
      last: last
    };
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(currentUser => {
        firebase
          .firestore()
          .collection("users")
          .doc(currentUser.user.uid)
          .set(initial)
          .then(() => {
            Actions.deckt();
          })
          .catch(error => console.log(error));
        Actions.deck();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={styles.container}>
            <View style={styles.inputBox}>
              {this.state.fontLoaded ? (
                <Text style={styles.label}>First Name</Text>
              ) : null}
              <TextInput
                style={styles.input}
                placeholder="John"
                onChangeText={first => {
                  this.setState({ first });
                }}
              />
            </View>
            <View style={styles.inputBox}>
              {this.state.fontLoaded ? (
                <Text style={styles.label}>Last Name</Text>
              ) : null}
              <TextInput
                style={styles.input}
                placeholder="Doe"
                onChangeText={last => {
                  this.setState({ last });
                }}
              />
            </View>
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
              {this.state.fontLoaded ? (
                <Text style={styles.label}>Confirm Password</Text>
              ) : null}
              <TextInput
                style={{
                  height: 40,
                  width: 250,
                  borderColor: this.state.confirmPassword ? "#57D9A3" : "red",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 5
                }}
                secureTextEntry={true}
                placeholder="**********"
                onChangeText={confirm => {
                  this.setState({ confirm });
                  confirm === this.state.password
                    ? this.setState({ confirmPassword: true })
                    : null;
                }}
              />
            </View>
            <View style={styles.inputBox}>
              <TouchableOpacity
                activeOpacity={this.state.confirmPassword ? 1 : 0.2}
                style={styles.login}
                onPress={() => {
                  this.register(
                    this.state.email,
                    this.state.password,
                    this.state.first,
                    this.state.last
                  );
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontWeight: "600",
                    fontSize: 20,
                    textAlign: "center",
                    fontFamily: "Mollen"
                  }}
                >
                  Sign Up!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
  signup: {
    color: "#57D9A3",
    fontWeight: "600"
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    fontFamily: "Mollen",
    color: "#444",
    letterSpacing: 1
  }
});
