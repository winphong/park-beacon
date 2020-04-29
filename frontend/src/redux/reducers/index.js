import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import reservationReducer from "./reservationReducer.js";

const reducers = {
  customer: authReducer,
  reservation: reservationReducer,
};

export default combineReducers(reducers);
