import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  Platform
} from "react-native";
import { Actions } from "react-native-router-flux";
import * as firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      profile: {
        first: "",
        last: "",
        email: "",
        linkedin: "",
        instagram: "",
        facebook: "",
        github: "",
        phone: "",
        altphone: ""
      }
    };
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          this.setState({ profile: doc.data() });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let prefix = `${Platform.OS === "ios" ? "ios" : "md"}`;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Profile</Text>
        <View style={styles.card}>
          <Image
            source={require("../assets/profile.jpg")}
            style={styles.profile}
          />
          <View style={styles.outerwrapper}>
            <View style={[styles.wrapper, { marginTop: 10 }]}>
              <Ionicons
                style={styles.icons}
                name={prefix + "-person"}
                size={24}
                color="#AAA"
              />
              <Ionicons
                style={[{ marginLeft: -1 }, styles.icons]}
                name={prefix + "-mail"}
                size={24}
                color="#AAA"
              />
              <Ionicons
                style={styles.icons}
                name="logo-facebook"
                size={24}
                color="#AAA"
              />
              <Ionicons
                style={[{ marginLeft: -2 }, styles.icons]}
                name="logo-github"
                size={24}
                color="#AAA"
              />
              <Ionicons
                style={styles.icons}
                name="logo-instagram"
                size={24}
                color="#AAA"
              />
              <Ionicons
                style={styles.icons}
                name="logo-linkedin"
                size={24}
                color="#AAA"
              />
              <Ionicons
                style={styles.icons}
                name={prefix + "-call"}
                size={24}
                color="#AAA"
              />
            </View>
            <View style={styles.wrapper}>
              <View style={styles.text}>
                <Text style={styles.line}>
                  <Text style={styles.reg}>
                    {this.state.profile.first + " "}
                  </Text>
                  <Text style={styles.reg}>{this.state.profile.last}</Text>
                </Text>
                <Text style={[styles.reg, styles.line]}>
                  {this.state.profile.email}
                </Text>
                <Text style={[styles.reg, styles.line]}>
                  {
                    this.state.profile.facebook.split(
                      "https://facebook.com/"
                    )[1]
                  }
                </Text>
                <Text style={[styles.reg, styles.line]}>
                  {this.state.profile.github.split("https://github.com/")[1]}
                </Text>
                <Text style={[styles.reg, styles.line]}>
                  {
                    this.state.profile.instagram.split(
                      "https://instagram.com/"
                    )[1]
                  }
                </Text>
                <Text style={[styles.reg, styles.line]}>
                  {
                    this.state.profile.linkedin.split(
                      "https://linkedin.com/in/"
                    )[1]
                  }
                </Text>
                <Text style={[styles.reg, styles.line]}>
                  {this.state.profile.phone}
                </Text>
              </View>
            </View>
          </View>
        </View>
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
  card: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    backgroundColor: "#FFF",
    height: 500,
    width: 300,
    paddingTop: 30
  },
  wrapper: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: 20
    // borderStyle: "solid",
    // borderWidth: 2,
    // borderColor: "red"
  },
  reg: {
    fontFamily: "Mollen",
    fontSize: 18,
    color: "#444"
  },
  heading: {
    fontFamily: "MollenBold",
    color: "#57D9A3",
    fontSize: 32,
    marginBottom: 20,
    marginTop: -20
  },
  inline: {
    flexDirection: "row"
  },

  profile: {
    width: 96,
    height: 96,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  outerwrapper: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10
  },
  icons: {
    // borderStyle: "solid",
    // borderWidth: 2,
    // borderColor: "red",
    marginTop: 10
  },
  text: {
    marginTop: 10
    // borderStyle: "solid",
    // borderWidth: 2,
    // borderColor: "red"
  },
  line: {
    marginTop: 15
    // borderStyle: "solid",
    // borderWidth: 2,
    // borderColor: "red"
  }
});
