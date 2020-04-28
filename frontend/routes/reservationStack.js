import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Reservations from '../src/pages/Reservations';
import ReservationDetails from '../src/pages/ReservationDetails';

const screens = {
    Reservations: {
        screen: Reservations,
        navigationOptions: {
            title: 'My Reservations',
        }
    },
    ReservationDetails: {
        screen: ReservationDetails
    }
}

const ReservationStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});

export default createAppContainer(ReservationStack);