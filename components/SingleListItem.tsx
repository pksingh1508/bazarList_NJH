import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Colors from '../constants/Colors';

const SingleListItem = ({ item }: { item: string }) => {
    const [completed, setCompleted] = useState(false);
    return (
        <View style={styles.container}>
            {item.length > 0 &&
                <BouncyCheckbox
                    isChecked={completed}
                    size={25}
                    fillColor="red"
                    unFillColor="#FFFFFF"
                    text={item}
                    iconStyle={{ borderColor: Colors.orange100 }}
                    innerIconStyle={{ borderWidth: 2 }}
                    textStyle={{ fontFamily: "mon-n", fontSize: 27 }}
                    onPress={(isChecked: boolean) => { setCompleted(!completed) }}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // justifyContent: 'space-between'
        paddingHorizontal: 20,
        paddingVertical: 4
    }
})

export default SingleListItem;