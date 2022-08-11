import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import firebase from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function Detail({ route }) {
    const todoRef = firebase().collection('todo');
    const [textHeading, onchangeHeadingText] = useState(route.params.item.name);
    const navigation = useNavigation();

    function updatetodo() {
        if (textHeading && textHeading.length > 0) {
            todoRef
                .doc(route.params.item.id)
                .update({
                    heading: textHeading,
                }).then(() => {
                    navigation.navigate('Home');
                }).catch((error) => {
                    Alert.alert(error.message);
                })
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textField}
                onChangeText={onchangeHeadingText}
                value={textHeading}
                placeholder="Update Todo"
            />
            <Pressable
                style={styles.buttonUpdate}
                onPress={() => { updatetodo() }}
            >
                <Text>UPDATE TODO</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        marginLeft: 15,
        marginRight: 15,
    },
    textField: {
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        color: '#000000',
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
    },
    buttonUpdate: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 10,
        backgroundColor: '#0DE065'
    },
});