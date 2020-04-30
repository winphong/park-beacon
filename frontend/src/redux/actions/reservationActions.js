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

// export const authorise = (request) => {
//   return axios
//     .post(RESERVATION_BASE_URL + "/authorise", request)
//     .then((response) => {
//       return response;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export const registerForPushNotifications = async (username) => {
//   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//   if (status !== "granted") {
//     alert("No notification permissions!");
//     return null;
//   }
//   const pushNotificationToken = await Notifications.getExpoPushTokenAsync();

//   try {
//     return await axios.post(RESERVATION_BASE_URL + "/registerPushNotificationToken", {
//       username,
//       pushNotificationToken,
//     });
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// };

// export const updateJwt = (jwt) => ({
//   type: CUSTOMER_LOGIN,
//   jwt: jwt,
// });

// export const logout = () => ({
//   type: LOGOUT,
// });
