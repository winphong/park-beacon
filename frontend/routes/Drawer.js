import React, { Component } from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import Home from "../src/pages/Home";
import Reservations from "../src/pages/Reservations";
import Login from "../src/pages/Login";

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Reservations: {
      screen: Reservations,
    },
    Logout: {
      screen: Login,
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
