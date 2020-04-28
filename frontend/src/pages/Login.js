import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Logo from "../components/Logo";
import * as WebBrowser from "expo-web-browser";
import { login } from "./../actions/auth";
// import { Actions } from "react-native-router-flux";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

export default Login = (props) => {
  //   const navigationOptions = {
  //     drawerLabel: "Logout",
  //     drawerIcon: ({ focused }) => (
  //       <MaterialCommunityIcons
  //         name="logout"
  //         size={25}
  //         color={focused ? "#0D47A1" : "black"}
  //       />
  //     ),
  //   };

  const { navigation } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data } = await login({ username, password });
    if (data.jwt) {
      navigation.navigate("Home");
    } else if (data.authUrl) {
      Alert.alert(
        "Grant access to Google Calendar",
        null,
        [
          //   {
          //     text: "Cancel",
          //     onPress: () => console.log("Cancel Pressed"),
          //     style: "cancel",
          //   },
          {
            text: "Open browser",
            onPress: async () =>
              await WebBrowser.openBrowserAsync(data.authUrl),
          },
        ],
        {
          cancelable: true,
        }
      );
      navigation.navigate("Authorise", {
        username,
      });
    }
  };

  const toRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Logo />
      <TextInput
        style={styles.inputBox}
        placeholder="Username"
        placeholderTextColor="#ffffff"
        selectionColor="#512da8"
        // onSubmitEditing={() => this.password.focus()}
        onChangeText={(text) => {
          setUsername(text.trim());
        }}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#ffffff"
        selectionColor="#512da8"
        onChangeText={(text) => {
          setPassword(text.trim());
        }}
        // ref={(input) => (this.password = input)}
        // onSubmitEditing={() => this.carplate.focus()}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>Don't have an account yet?</Text>
        <TouchableOpacity onPress={toRegister}>
          <Text style={styles.signupButton}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    width: 310,
    backgroundColor: "#b39ddb",
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 15,
    marginVertical: 10,
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
  },
  signupText: {
    color: "#4527a0",
    fontSize: 14,
  },
  signupButton: {
    color: "#4527a0",
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    width: 310,
    height: 40,
    backgroundColor: "#7e57c2",
    borderRadius: 15,
    marginVertical: 10,
    paddingVertical: 7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
});
