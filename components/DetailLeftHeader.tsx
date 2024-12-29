import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Entypo from '@expo/vector-icons/Entypo';
import Colors from '../constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const DetailLeftHeader = ({ deleteHandler, updateHandler, shareHandler }: { deleteHandler: any, updateHandler: any, shareHandler: any }) => {
    return (
        <View>
            <Menu>
                <MenuTrigger>
                    <Entypo name="dots-three-vertical" size={24} color={Colors.orange100} />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                    <MenuOption onSelect={shareHandler}>
                        <View style={[styles.menuItem, styles.bottomBorder]}>
                            <FontAwesome6 name="copy" size={21} color={Colors.orange100} />
                            <Text style={styles.menuText}>Copy</Text>
                        </View>
                    </MenuOption>
                    <MenuOption onSelect={updateHandler}>
                        <View style={[styles.menuItem, styles.bottomBorder]}>
                            <MaterialIcons name="update" size={21} color={Colors.orange100} />
                            <Text style={styles.menuText}>Update</Text>
                        </View>
                    </MenuOption>
                    <MenuOption onSelect={deleteHandler}>
                        <View style={styles.menuItem}>
                            <MaterialCommunityIcons name="delete" size={21} color={Colors.orange100} />
                            <Text style={styles.menuText}>Delete</Text>
                        </View>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    menuText: {
        fontSize: 19,
        marginLeft: 15,
        fontFamily: 'mon-sb',
        color: Colors.orange300,
    },
    deleteText: {
        color: '#ff4444',
    },
    bottomBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.orange100
    }
})
const optionsStyles = {
    optionsContainer: {
        width: 160,
        backgroundColor: Colors.primary500,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.orange100,
        borderRadius: 8,
        padding: 5,
        marginTop: 50,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    optionWrapper: {
        borderRadius: 6,
    },
};

export default DetailLeftHeader;