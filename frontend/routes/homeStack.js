import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../src/pages/Home';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home Screen',
        }
    },
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});

export default createAppContainer(HomeStack);