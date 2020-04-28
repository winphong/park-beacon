import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';
import Card from '../components/Card';

const DATA = [
    { 
        carparkName: 'NUS Computing', 
        parkingLotNumber: 'A123', 
        dateTime: '25 June', 
        id: '1' 
    },
    { 
        carparkName: 'NUS Arts', 
        parkingLotNumber: 'B123', 
        dateTime: '28 June', 
        id: '2' 
    },
];



export default class Reservations extends Component {
    static navigationOptions = {
        drawerLabel: 'Reservations',
        drawerIcon: ({ focused }) => (
            <MaterialIcons
                name="schedule"
                size={25}
                color={focused ? '#0D47A1' : 'black'}
            />
        ),
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableHighlight onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                        style={styles.touchableHighlight} >
                        <MaterialIcons
                            name="menu"
                            size={25}
                            color='black'
                        />
                    </TouchableHighlight>
                    <Text style={styles.headerText}>Reservations</Text>
                </View>                    
                <Card/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: '100%',
        height: 70,
        backgroundColor: '#d1c4e9',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 28
    },
    headerText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    touchableHighlight: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 10,
        top: 10,
    },
    open: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    }
})