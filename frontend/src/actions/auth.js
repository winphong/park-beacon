import axios from "axios";
import { BACKEND_URL } from "../constants/routes";

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
