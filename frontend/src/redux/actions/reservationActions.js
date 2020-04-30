import axios from "axios";
import { BACKEND_URL } from "../../constants/routes";
import { RETRIEVE_RESERVATION_BY_CUSTOMER_ID, SET_NULL } from "./types";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const RESERVATION_BASE_URL = BACKEND_URL + "/api/reservation";

export const retrieveReservationsByCustomerId = (customerId) => {
  return (dispatch) => {
    axios
      .get(RESERVATION_BASE_URL + `/${customerId}`)
      .then((response) => {
        dispatch(updateReservations(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateReservations = (reservations) => ({
  type: RETRIEVE_RESERVATION_BY_CUSTOMER_ID,
  reservations,
});

export const cancelReservation = (reservationId) => {
  return (dispatch) => {
    axios
      .post(RESERVATION_BASE_URL + `/cancel/${reservationId}`)
      .then((response) => {
        dispatch(updateReservations(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
