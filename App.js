import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/config/store';

import Routes from './src/Routes';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#4527a0'
          barStyle="light-content"
        />
        {/* <Routes/> */}
        {/* <Login/> */}
        <Signup />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

