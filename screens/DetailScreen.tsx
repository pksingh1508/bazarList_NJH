import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import SingleListItem from '../components/SingleListItem';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ItemContext } from '../store/ItemContext';
import Toast from 'react-native-toast-message';
import DetailLeftHeader from '../components/DetailLeftHeader';
import * as Clipboard from 'expo-clipboard';

const DetailScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const [listArray, setListArray] = useState([]);
    const { item } = route.params;
    const { deleteItem } = useContext(ItemContext);

    const showToast = () => {
        Toast.show({
            type: 'error',
            visibilityTime: 2000,
            text1: 'Item deleted Successfully 👋'
        });
    }
    const TextCopiedToast = () => {
        Toast.show({
            type: 'success',
            visibilityTime: 2000,
            text1: 'Item Copied Successfully 👋'
        });
    }

    async function shareHandler() {
        await Clipboard.setStringAsync(item.value);
        TextCopiedToast();
    }

    function updateHandler() {
        navigation.navigate('AddScreen', { items: item });
    }

    function deleteHandler() {
        deleteItem(item.id);
        showToast();
        navigation.goBack();
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: ({ canGoBack }: { canGoBack: any }) => {
                if (!canGoBack) return null;
                return (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 10 }}
                    >
                        <Ionicons name="arrow-back" size={24} color={Colors.orange100} />
                    </TouchableOpacity>
                );
            },
            headerRight: () => {
                return (
                    <DetailLeftHeader deleteHandler={deleteHandler} updateHandler={updateHandler} shareHandler={shareHandler} />
                )
            }
        });
    }, [navigation]);

    useEffect(() => {
        const arr = item.value.split('\n');
        setListArray(arr);
    }, [item])

    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{item.day}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <FlatList
                data={listArray}
                renderItem={({ item }) => <SingleListItem item={item} />}
                style={styles.scrollview}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary700
    },
    dateContainer: {
        backgroundColor: Colors.primary300,
        flexDirection: 'row',
        paddingVertical: 8,
        justifyContent: 'space-between',
        paddingHorizontal: 14
    },
    dateText: {
        color: Colors.white300
    },
    scrollview: {
        marginVertical: 8,
        marginHorizontal: 6,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.orange100,
        borderRadius: 6,
        backgroundColor: Colors.primary500
    }
})

export default DetailScreen;