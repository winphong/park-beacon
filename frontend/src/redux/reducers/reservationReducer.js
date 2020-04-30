import * as types from "../actions/types";

const initialState = {
  reservations: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.RETRIEVE_RESERVATION_BY_CUSTOMER_ID:
      return {
        ...state,
        reservations: action.reservations,
      };
    default:
      return state;
  }
}
