import React, { useEffect } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import Drawer from "./routes/Drawer";
import { Provider } from "react-redux";
import store from "./src/config/store";

import Routes from "./src/Routes";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Authorise from "./src/pages/Authorise";
// import Home from './src/pages/Home';
// import Reservations from './src/pages/Reservations';
import { NavigationContainer } from "@react-navigation/native";
import Screens from "./routes/Screens";
import { Notifications, SplashScreen } from "expo";

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHide();
    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        vibrate: [0, 250, 250, 250],
      });
    }
  }, []);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
});
