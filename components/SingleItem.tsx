import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Item } from '../store/ItemContext';
import Colors from '../constants/Colors';

const SingleItem = ({ item, navigation }: { item: Item, navigation: any }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('DetailScreen', { item })}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.itemDay}>{item.day.toLocaleUpperCase()}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
            </View>
            <View>
                <Text style={styles.itemText}>{item.value.slice(0, 15)}...</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.orange100,
        borderRadius: 8,
        backgroundColor: Colors.primary300,
        margin: 6,
        paddingVertical: 9,
        paddingHorizontal: 6,
        gap: 4,
    },
    itemText: {
        fontSize: 18,
        fontFamily: 'mon-n',
        color: Colors.white200
    },
    itemDate: {
        fontSize: 18,
        fontFamily: 'mon-n',
        color: Colors.white200
    },
    itemDay: {
        fontSize: 18,
        fontFamily: 'mon-b',
        color: Colors.orange200,

    }
})

export default SingleItem;