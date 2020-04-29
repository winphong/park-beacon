import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { MaterialIcons } from '@expo/vector-icons';

export default class Home extends Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ focused }) => (
            <MaterialIcons
                name="home"
                size={25}
                color={focused ? '#0D47A1' : 'black'}
            />
        ),
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                    style={styles.touchableHighlight}>
                    <MaterialIcons
                        name="menu"
                        size={25}
                        color='black'
                    />
                </TouchableHighlight>
                <View style={styles.banner}>
                    <Image style={{ width: 250, height: 150 }}
                        source={require('../images/park-beacon.png')} />
                    <Text style={styles.text}>Your best parking companion.</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    banner: {
        flex: 1,
        paddingTop: 40,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    text: {
        flex: 1,
        alignItems: 'center',
        fontSize: 13,
        color: 'black',
        paddingTop: 10,
        fontWeight: 'bold',
        fontStyle: 'italic'
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
    },
    image: {
        width: 10,
        height: 10
    },
})