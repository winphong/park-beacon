import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import Render from 'react-dom';

export default class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={{ width: 250, height: 150 }}
                    source={require('../images/park-beacon.png')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})