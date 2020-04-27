import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default class Form extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.inputBox} 
                    placeholder="Username"
                    placeholderTextColor= "#ffffff"
                    selectionColor= "#512da8"
                    onSubmitEditing= {() => this.password.focus()}
                />
                <TextInput 
                    style={styles.inputBox} 
                    placeholder="Password"
                    secureTextEntry= {true}
                    placeholderTextColor= "#ffffff"
                    selectionColor= "#512da8"
                    ref= {(input) => this.password = input}
                    onSubmitEditing= {() => this.carplate.focus()}
                />
                <TextInput 
                    style={styles.inputBox} 
                    placeholder="Carplate Number"
                    placeholderTextColor= "#ffffff"
                    selectionColor= "#512da8"
                    ref= {(input) => this.carplate = input}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        width: 310,
        backgroundColor: '#b39ddb',
        borderRadius: 15,
        height: 50,
        paddingHorizontal: 15,
        fontSize: 15,
        marginVertical: 10
    },
    button: {
        width: 310,
        height: 40,
        backgroundColor: '#7e57c2',
        borderRadius: 15,
        marginVertical: 10,
        paddingVertical: 7
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    }
})