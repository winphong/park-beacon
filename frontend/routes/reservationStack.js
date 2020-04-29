import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Reservations from '../src/pages/Reservations';

const screens = {
    Reservations: {
        screen: Reservations,
        navigationOptions: {
            title: 'My Reservations',
        }
    },
}

const ReservationStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});

export default createAppContainer(ReservationStack);