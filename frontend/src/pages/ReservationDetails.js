import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../components/Card';

export default function ReservationDetails ({ navigation }) {
    return (
        <View style={styles.container}>
            <Card>
                <Text>{ navigation.getParam('dateTime') }</Text>
            </Card>
        </View>
    );
}