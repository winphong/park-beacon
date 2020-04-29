import { combineReducers } from "redux";
import authReducer from "./authReducer.js";

const reducers = {
  customer: authReducer,
};

export default combineReducers(reducers);
