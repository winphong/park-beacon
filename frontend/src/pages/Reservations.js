import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { DrawerActions } from "react-navigation-drawer";
import Card from "../components/Card";

export default Reservations = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.touchableHighlight}
        >
          <MaterialIcons name="menu" size={25} color="black" />
        </TouchableHighlight>
        <Text style={styles.headerText}>Reservations</Text>
      </View>
      <Card />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 70,
    backgroundColor: "#d1c4e9",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 28,
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
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
});
