import { applyMiddleware, createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { AsyncStorage } from "react-native";
// middlewares
import thunk from "redux-thunk";
// Import custom components
import rootReducer from "../redux/reducers";
import { CUSTOMER_LOGIN } from "../redux/actions/types";
import { SplashScreen } from "expo";

const middleware = [thunk];
const initialState = {};

const _ = require("lodash");

async function saveToSecureStore(state) {
  try {
    await AsyncStorage.setItem("state", state);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Create a Redux storeEntity that holds the app state.
 */
let store = createStore(
  rootReducer,
  {},
  //   composeWithDevTools(applyMiddleware(...middleware))
  applyMiddleware(...middleware)
);

const loadLoggedInCustomer = () => {
  return (dispatch) => {
    AsyncStorage.getItem("state", (err, result) => {
      if (err) {
        //console.log(err);
        SplashScreen.hide();
        return initialState;
      }
      if (_.get(result, "customer.jwt")) {
        dispatch({
          type: CUSTOMER_LOGIN,
          jwt: jsog.parse(result).customer.jwt,
        });
        //console.log(result)
      } else {
        SplashScreen.hide();
      }
    });
  };
};

const unsubscribe = store.subscribe(() => {
  saveToSecureStore({
    customer: {
      jwt: _.get(store.getState(), "customer.jwt"),
    },
  });
});

// populate store with logged in customer
store.dispatch(loadLoggedInCustomer());

export default store;
