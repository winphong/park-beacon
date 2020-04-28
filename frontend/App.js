import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import Drawer from "./routes/Drawer";
import { Provider } from "react-redux";
import store from "./src/config/store";

import Routes from "./src/Routes";
import Login from "./src/pages/Login";
// import Navigator from './routes/homeStack';
import Register from "./src/pages/Register";
import Authorise from "./src/pages/Authorise";
// import Home from './src/pages/Home';
// import Reservations from './src/pages/Reservations';
import { NavigationContainer } from "@react-navigation/native";

import Screens from "./routes/Homestack";

export default function App() {
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar backgroundColor="#65499c" barStyle="light-content" />
        {/* <Routes /> */}
        {/* <Login /> */}
        {/* <Register /> */}
        {/* <Home /> */}
        {/* <Drawer/> */}
        {/* <Navigator/> */}
        {/* <Reservations/> */}
        <Screens />
      </View>
    </NavigationContainer>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
});
