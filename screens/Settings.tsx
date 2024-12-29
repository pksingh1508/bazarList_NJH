import { View, Text, StyleSheet, TouchableOpacity, Pressable, Linking } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const Settings = () => {
    const openLink = () => {
        Linking.openURL('https://pawankumar.site');
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.info}>App Info</Text>
                <View style={styles.mainContainer}>
                    <View style={styles.version}>
                        <Text style={styles.text}>Version</Text>
                        <Text style={styles.text}>1.0.0</Text>
                    </View>
                    <View style={styles.supported}>
                        <Text style={styles.text}>Supported</Text>
                        <Text style={styles.text}>True</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={openLink}>
                <View style={{flexDirection: 'row', paddingLeft: 90}}>
                    <Text style={{ color: Colors.white300 }}>Made with ❤️ by </Text>
                    <Text style={styles.myLink}>Pawan Kumar.</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary600,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    info: {
        color: Colors.orange100,
        fontFamily: 'mon-b',
        fontSize: 18,
        paddingTop: 18,
        paddingLeft: 12
    },
    mainContainer: {
        backgroundColor: Colors.primary500,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6
    },
    version: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.white300
    },
    supported: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 17,
        fontFamily: 'mon-r',
        color: Colors.white100
    }, 
    myLink: {
        color: Colors.orange100,
        fontWeight: 'bold',
        fontSize: 15,
        textDecorationLine: 'underline',
        paddingLeft: 2,
        letterSpacing: 1.1
    }
})

export default Settings;