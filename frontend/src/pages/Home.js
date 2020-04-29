import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Vibration,
} from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Notifications, SplashScreen } from "expo";
import jwtDecode from "jwt-decode";
import { registerForPushNotifications } from "../redux/actions/authActions";

export default Home = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.customer.jwt);

  const [pushNotifGenerated, setPushNotifGenerated] = useState(false);

  useEffect(() => {
    if (jwt) {
      const customer = jwtDecode(jwt);
      console.log(customer);
      const registerPushNotificationToken = async () => {
        if (customer && !pushNotifGenerated) {
          SplashScreen.hide();
          let response = await registerForPushNotifications(customer.username);
          if (response != null) {
            // dispatchUpdatedStaff(response.data, dispatch);
            setPushNotifGenerated(true);
          }
        }
      };
      registerPushNotificationToken();
      Notifications.addListener(handleNotification);
    }
  }, [jwt]);

  const handleNotification = (notification) => {
    if (notification.origin === "selected") navigation.navigate("Reservations");
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.touchableHighlight}
      >
        <MaterialIcons name="menu" size={25} color="black" />
      </TouchableHighlight>
      <View style={styles.banner}>
        <Image
          style={{ width: 250, height: 150 }}
          source={require("../images/park-beacon.png")}
        />
        <Text style={styles.text}>Your best parking companion.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  banner: {
    flex: 1,
    paddingTop: 40,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    flex: 1,
    alignItems: "center",
    fontSize: 13,
    color: "black",
    paddingTop: 10,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  touchableHighlight: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 10,
    top: 10,
  },
  open: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  image: {
    width: 10,
    height: 10,
  },
});
