import axios from "axios";
import { BACKEND_URL } from "../../constants/routes";
import { CUSTOMER_LOGIN, LOGOUT } from "./types";
const AUTH_BASE_URL = BACKEND_URL + "/api/auth";

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
      console.log(response)
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateJwt = (jwt) => ({
  type: CUSTOMER_LOGIN,
  jwt: jwt,
});

export const logout = () => ({
  type: LOGOUT,
});
