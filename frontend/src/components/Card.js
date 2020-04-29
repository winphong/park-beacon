import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import {
  retrieveReservationsByCustomerId,
  cancelReservation,
  setNull,
} from "./../redux/actions/reservationActions";
import dateformat from "dateformat";
import jwtDecode from "jwt-decode";

const _ = require("lodash");

export default Card = ({ navigation }) => {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.customer.jwt);
  const reservations = useSelector((state) => state.reservation.reservations);

  useEffect(() => {
    if (jwt) {
      const customer = jwtDecode(jwt);
      dispatch(retrieveReservationsByCustomerId(customer.id));
    }
  }, []);

  //   useFocusEffect(
  //     React.useCallback(() => {
  //       console.log("focus effect");
  //       if (jwt) {
  //         const customer = jwtDecode(jwt);
  //         dispatch(retrieveReservationsByCustomerId(customer.id));
  //         console.log("called");
  //       }

  //       return () => {
  //         dispatch(setNull());
  //       };
  //     }, [_.isEqual(reservations)])
  //   );

  const cancelBookingHandler = (reservationId) => {
    Alert.alert(
      "Confirmation",
      "Cancel reservation?",
      [
        {
          text: "Yes",
          onPress: () => {
            dispatch(cancelReservation(reservationId));
          },
        },
        {
          text: "No",
          onPress: () => console.log("Booking is not cancelled."),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text>Tap on reservation to cancel</Text>
      <FlatList
        keyExtractor={(item) => item._id}
        data={reservations}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => cancelBookingHandler(item._id)}
              style={[
                styles.item,
                { backgroundColor: reservations ? "#fff" : "purple" },
              ]}
              disabled={item.status !== "RESERVED" ? true : false}
            >
              <View style={styles.cardContent}>
                <Text style={styles.date}>
                  {dateformat(item.dateTime, "h:MM TT, d mmm yyyy").toString()}
                </Text>
                <Text style={styles.text}>
                  Location: {item.carpark.carparkName}
                </Text>
                <Text style={styles.text}>
                  Parking Lot: {item.parkingLotNumber}
                </Text>
                <Text style={styles.text}>
                  Reservation Status: {item.status}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  date: {
    fontWeight: "bold",
    fontSize: 18,
  },
  card: {
    borderRadius: 5,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 5,
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
  item: {
    backgroundColor: "purple",
    padding: 10,
    margin: 10,
  },
  text: {
    fontSize: 16,
  },
});
