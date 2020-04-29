import * as types from "../actions/types";

const initialState = {
  jwt: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CUSTOMER_LOGIN:
      return {
        ...state,
        jwt: action.jwt,
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
