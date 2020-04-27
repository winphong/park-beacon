import React, { Component, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    CheckBox
} from 'react-native';
import { Actions } from 'react-native-router-flux';


class Signup extends Component {
    goBack() {
        Actions.pop();
    }

    state = {
        checked: false
    }

    handleChange() {
        this.setState({
            checked: !this.state.checked
        })
        if (!this.state.checked == true) {
            alert("You have agreed to our terms and conditions.")
        }
    }

    // state = {
    //     isSelected: false
    // }

    // handleChange = () => this.setState({ isSelected: !this.state.isSelected })

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.headerCont}>
                    <Text style={styles.headerText}>Register an Account</Text>
                </View>
                <TextInput
                    style={styles.inputBox}
                    placeholder="Username"
                    placeholderTextColor="#ffffff"
                    selectionColor="#512da8"
                    onSubmitEditing={() => this.password.focus()}
                />
                <TextInput
                    style={styles.inputBox}
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    selectionColor="#512da8"
                    ref={(input) => this.password = input}
                    onSubmitEditing={() => this.carplate.focus()}
                />
                <TextInput
                    style={styles.inputBox}
                    placeholder="Carplate Number"
                    placeholderTextColor="#ffffff"
                    selectionColor="#512da8"
                    ref={(input) => this.carplate = input}
                />
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        style={styles.checkBox}
                        value={this.state.checked}
                        onChange={() => this.handleChange()}
                    />
                    <Text style={styles.label}>Accept to our terms and conditions</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>

                <View style={styles.signInTextCont}>
                    <Text style={styles.signInText}>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={this.goBack}>
                        <Text style={styles.signInButton}> Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        // flexDirection: 'row'
    },
    headerText: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        color: 'black',
        fontSize: 23,
        fontWeight: 'bold'
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
    },
    checkBoxContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    checkBox: {
        alignSelf: 'center'
    },
    label: {
        margin: 8
    },
    signInTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signInText: {
        color: '#4527a0',
        fontSize: 14
    },
    signInButton: {
        color: '#4527a0',
        fontSize: 14,
        fontWeight: 'bold'
    }
})

export default Signup