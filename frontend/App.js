import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';
import Drawer from './routes/Drawer';
// import { Provider } from 'react-redux';
// import store from './src/config/store';

// import Routes from './src/Routes';
import Login from './src/pages/Login';
// import Navigator from './routes/homeStack';
// import Signup from './src/pages/Signup';
// import Home from './src/pages/Home';
// import Reservations from './src/pages/Reservations';

export default function App() {
  return (
    // <Provider store={store}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#65499c'
          barStyle="light-content"
        />
        {/* <Routes/> */}
        {/* <Login/> */}
        {/* <Signup /> */}
        {/* <Home /> */}
        <Drawer/>
        {/* <Navigator/> */}
        {/* <Reservations/> */}
      </View>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
});

