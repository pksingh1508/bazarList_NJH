import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import Octicons from '@expo/vector-icons/Octicons';
import Colors from '../constants/Colors';
import { ItemContext } from '../store/ItemContext';
import uuid from 'react-native-uuid';
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const AddScreen = ({ navigation, route }: any) => {
    const { items } = route.params ? route.params : {};
    const [item, setItem] = useState(items ? items.value : '');
    const [todayDate, setTodayDate] = useState(items ? items.date : '');
    const [todayDay, setTodayDay] = useState(items ? items.day : '');
    const { addItem, updateItem } = useContext(ItemContext);

    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Bazar List',
            visibilityTime: 2000,
            text2: 'Item added Successfully 👋'
        });
    }
    const UpdateToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Bazar List',
            visibilityTime: 2000,
            text2: 'Item Updated Successfully 👋'
        });
    }

    const saveTheInputData = useCallback(() => {
        if (item.length <= 0) {
            Alert.alert("Please Input Some Items");
            return;
        }
        const id = uuid.v4();
        addItem({ id: id, value: item, date: todayDate, day: todayDay });
        setItem('');
        showToast();
        navigation.goBack();
    }, [item]);

    const updateTheInputData = useCallback(() => {
        if (item.length <= 0) {
            Alert.alert("Please Input Some Items");
            return;
        }
        const id = items.id;
        updateItem(id, item);
        setItem('');
        UpdateToast();
        navigation.navigate('Main');
    }, [item]);

    useEffect(() => {
        const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date().getDate();
        const months = new Date().getMonth();
        const year = new Date().getFullYear();
        const day = dayList[new Date().getDay()];
        const currentDate = `${date}-${months}-${year}`;
        setTodayDay(day);
        setTodayDate(currentDate);
    }, []);

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
                    <>
                        {items ? (
                            <TouchableOpacity
                                onPress={updateTheInputData}
                                style={{ marginRight: 15 }}
                            >
                                <MaterialCommunityIcons name="sticker-check" size={22} color={Colors.orange100} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={saveTheInputData}
                                style={{ marginRight: 15 }}
                            >
                                <Octicons name="check-circle-fill" size={22} color={Colors.orange100} />
                            </TouchableOpacity>
                        )}
                    </>
                )
            }
        });
    }, [navigation, saveTheInputData]);

    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{todayDate}</Text>
                <Text style={styles.dateText}>{todayDay}</Text>
            </View>
            <TextInput
                placeholder={`
                     Input all the Items 
                     `}
                value={item}
                placeholderTextColor={Colors.orange100}
                style={styles.input}
                onChangeText={setItem}
                multiline={true}
                cursorColor={Colors.orange100}
                autoCapitalize='characters'
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary600
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.white100,
        borderRadius: 7,
        margin: 10,
        padding: 10,
        backgroundColor: Colors.primary500,
        fontSize: 17,
        fontFamily: 'mon-sb',
        color: Colors.white300
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
    }
})

export default AddScreen;