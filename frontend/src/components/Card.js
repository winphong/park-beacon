import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';

export default function Card({ navigation }) {
    const [reservations, selectedReservation] = useState([
        { carparkName: 'NUS Computing', parkingLotNumber: 'A123', dateTime: '25 June', id: '1' },
        { carparkName: 'NUS Arts', parkingLotNumber: 'B123', dateTime: '28 June', id: '2' },
    ]);

    const cancelBookingHandler = () => {
        Alert.alert(
            "Confirmation",
            "Cancel reservation booking?",
            [
                {
                    text: "Yes",
                    onPress: () => console.log("Booking cancelled."),
                },
                {
                    text: "No",
                    onPress: () => console.log("Booking is not cancelled."),
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={(item) => item.id}
                data={reservations}
                renderItem={({ item }) => (
                    <View style={styles.card} >
                        <TouchableOpacity
                            onPress={cancelBookingHandler}
                            style={[
                                styles.item,
                                { backgroundColor: reservations ? '#fff' : 'purple' },
                            ]}
                        >
                            <View style={styles.cardContent}>
                                <Text style={styles.date}>{item.dateTime}</Text>
                                <Text>{item.carparkName}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    date: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    card: {
        borderRadius: 5,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 5
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
    item: {
        backgroundColor: 'purple',
        padding: 10,
        margin: 10
    }
})