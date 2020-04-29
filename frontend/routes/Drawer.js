import React, { Component } from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import Home from "../src/pages/Home";
import Reservations from "../src/pages/Reservations";
import Login from "../src/pages/Login";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        drawerLabel: "Home",
        drawerIcon: ({ focused }) => (
          <MaterialIcons
            name="home"
            size={25}
            color={focused ? "#0D47A1" : "black"}
          />
        ),
      },
    },
    Reservations: {
      screen: Reservations,
    },
    Logout: {
      screen: Login,
      navigationOptions: {
        drawerLabel: "Logout",
        drawerIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name="logout"
            size={25}
            color={focused ? "#0D47A1" : "black"}
          />
        ),
      },
    },
  },
  {
    initialRouteName: "Home",
    drawerPosition: "left",
  }
);

const AppContainer = createAppContainer(DrawerNavigator);

export default class Drawer extends Component {
  render() {
    return <AppContainer />;
  }
}
