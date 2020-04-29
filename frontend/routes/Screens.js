import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import Authorise from "../src/pages/Authorise";
import Drawer from "./Drawer";
// import { createAppContainer } from "react-navigation";

// const screens = {
//     Home: {
//         screen: Home,
//         navigationOptions: {
//             title: 'Home Screen',
//         }
//     },
// }

// const HomeStack = createStackNavigator(screens, {
//     defaultNavigationOptions: {
//         headerTintColor: '#444',
//         headerStyle: { backgroundColor: '#eee', height: 60 }
//     }
// });

// export default createAppContainer(HomeStack);

const Stack = createStackNavigator();

export default Screens = (props) => {
  const jwt = useSelector((state) => state.customer.jwt);
  console.log(jwt);
  return (
    <Stack.Navigator initialRouteName={"Login"}>
      {!jwt ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Authorise"
            component={Authorise}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Home"
          component={Drawer}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};
