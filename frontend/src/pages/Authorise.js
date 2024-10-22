import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { authorise, updateJwt } from "../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";

export default Authorise = (props) => {
  const { navigation, route } = props;
  const { username } = route.params;
  const jwt = useSelector((state) => state.customer.jwt);
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  const handleSubmitKey = async () => {
    await authorise({
      username,
      code,
    })
      .then((resp) => {
        if (resp.status === 200) {
          const { data } = resp;
          if (data) {
            dispatch(updateJwt(data));
          }
        } else alert("An error has occured, please try again");
      })
      .catch((err) => {
        console.log(err);
        alert("An unexpected has occured, please try again");
      });
  };

  useEffect(() => {
    if (jwt) navigation.navigate("Home");
  }, [jwt]);

  const toLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <Text style={styles.headerText}>Authorise Google Calendar access</Text>
      </View>
      <View>
        <Text> Paste your key </Text>
      </View>
      <TextInput
        style={styles.inputBox}
        placeholder="Key"
        placeholderTextColor="#ffffff"
        selectionColor="#512da8"
        // onSubmitEditing={() => this.password.focus()}
        onChangeText={(text) => {
          setCode(text.trim());
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmitKey}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
      <View style={styles.toLoginContainer}>
        <TouchableOpacity onPress={toLogin}>
          <Text style={styles.toLoginButton}> Go back to login page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCont: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    // flexDirection: 'row'
  },
  headerText: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    color: "black",
    fontSize: 23,
    fontWeight: "bold",
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
  toLoginContainer: {
    flexGrow: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
  },
  toLoginButton: {
    color: "#4527a0",
    fontSize: 14,
    fontWeight: "bold",
  },
});
