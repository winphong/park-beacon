import axios from "axios";
import { BACKEND_URL } from "./../constants/routes";

const AUTH_BASE_URL = BACKEND_URL + "/api/auth";

export const register = (request) => {
  return axios
    .post(AUTH_BASE_URL + "/register", request)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
