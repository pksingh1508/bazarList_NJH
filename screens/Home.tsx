import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { ItemContext } from '../store/ItemContext';
import SingleItem from '../components/SingleItem';
import { getAllItems } from '../Database';

function Home({ navigation }: { navigation: any }) {
    const { items, addInitialData, addItem, deleteItem } = useContext(ItemContext);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddScreen')}
                    style={{ marginRight: 15 }}
                >
                    <AntDesign name="addfile" size={23} color={Colors.orange100} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        async function getData() {
            try {
                const allData = await getAllItems();
                addInitialData(allData);
            } catch (error) {
                console.log("Something went wrong while getting all the data from the database.",error);
            }
        }
        getData();
    }, []);

    if (items.length <= 0) {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.primary600, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: Colors.orange100, fontSize: 20, fontFamily: 'mon-n' }}>No Items.</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({ item }) => <SingleItem item={item} navigation={navigation} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary600
    }
})

export default Home;
