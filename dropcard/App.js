import React, { Component } from "react";
import { Platform, Image, Text } from "react-native";
import { Router, Scene, Actions } from "react-native-router-flux";
import * as firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

import Initial from "./Views/Initial";
import Signup from "./Views/Signup";
import Deck from "./Views/Deck";
import Profile from "./Views/Profile";
import Settings from "./Views/Settings";

const firebaseConfig = {
  apiKey: "AIzaSyBzBDyyKMqdzUZRZKmbGIP9jJbSoI9Xrao",
  authDomain: "dropcard-cd43a.firebaseapp.com",
  databaseURL: "https://dropcard-cd43a.firebaseio.com",
  projectId: "dropcard-cd43a",
  storageBucket: "dropcard-cd43a.appspot.com",
  messagingSenderId: "705152091986",
  appId: "1:705152091986:web:fccf03a2bfc9d6db0f9c8b",
  measurementId: "G-QZ9PLNS3PY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class TabIcon extends React.Component {
  render() {
    let prefix = `${Platform.OS === "ios" ? "ios" : "md"}`;
    let color = this.props.focused
      ? this.props.activeTintColor
      : this.props.inactiveTintColor;
    if (this.props.title === "Settings") {
      return <Ionicons color={color} size={24} name={prefix + "-cog"} />;
    } else if (this.props.title === "Profile") {
      return <Ionicons color={color} size={24} name={prefix + "-person"} />;
    } else if (this.props.title === "Deck") {
      return <Ionicons color={color} size={24} name={prefix + "-at"} />;
    }
  }
}

firebase.auth().onAuthStateChanged(user => {
  user ? Actions.reset("tabbar") : null;
});

class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="initial" hideNavBar={true} component={Initial} initial />
          <Scene
            key="signup"
            navigationBarStyle={{ borderBottomColor: "transparent" }}
            component={Signup}
          />
          <Scene
            key="tabbar"
            tabs={true}
            tabBarStyle={{
              backgroundColor: "#FFFFFF",
              borderTopColor: "transparent"
            }}
            activeTintColor="#57D9A3"
            inactiveTintColor="#444"
            navigationBarStyle={{ borderBottomColor: "transparent" }}
          >
            <Scene
              title="Profile"
              key="mycardt"
              hideNavBar={true}
              icon={TabIcon}
              navigationBarStyle={{ borderBottomColor: "transparent" }}
            >
              <Scene key="profile" component={Profile} />
            </Scene>
            <Scene
              title="Deck"
              key="deckt"
              hideNavBar={true}
              icon={TabIcon}
              navigationBarStyle={{ borderBottomColor: "transparent" }}
              initial={true}
            >
              <Scene key="deck" component={Deck} />
            </Scene>
            <Scene
              title="Settings"
              key="settingst"
              hideNavBar={true}
              icon={TabIcon}
            >
              <Scene
                navigationBarStyle={{ borderBottomColor: "transparent" }}
                key="settings"
                component={Settings}
              />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default App;
