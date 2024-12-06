import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const Settings = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.info}>App Info</Text>
                <View style={styles.mainContainer}>
                    <View style={styles.version}>
                        <Text style={styles.text}>Version</Text>
                        <Text style={styles.text}>2.32.8</Text>
                    </View>
                    <View style={styles.supported}>
                        <Text style={styles.text}>Supported</Text>
                        <Text style={styles.text}>True</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={{ color: Colors.orange100, textAlign: 'center' }}>Made with ❤️ by Pawan Kumar.</Text>
            </View>
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
    }
})

export default Settings;