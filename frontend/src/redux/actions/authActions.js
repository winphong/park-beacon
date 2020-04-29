import axios from "axios";
import { BACKEND_URL } from "../../constants/routes";
import { CUSTOMER_LOGIN, LOGOUT } from "./types";
const AUTH_BASE_URL = BACKEND_URL + "/api/auth";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export const registerAccount = (request) => {
  return axios
    .post(AUTH_BASE_URL + "/register", request)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = (request) => {
  return axios
    .post(AUTH_BASE_URL + "/login", request)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authorise = (request) => {
  return axios
    .post(AUTH_BASE_URL + "/authorise", request)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const registerForPushNotifications = async (username) => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    alert("No notification permissions!");
    return null;
  }
  const pushNotificationToken = await Notifications.getExpoPushTokenAsync();

  try {
    return await axios.post(AUTH_BASE_URL + "/registerPushNotificationToken", {
      username,
      pushNotificationToken,
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const updateJwt = (jwt) => ({
  type: CUSTOMER_LOGIN,
  jwt: jwt,
});

export const logout = () => ({
  type: LOGOUT,
});
