import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Alert, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import firebase from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { panHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';

export default function Home() {
    const [todos, setTodos] = useState([]);
    const todoRef = firebase().collection('todo');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        todoRef
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const todos: any = []
                querySnapshot.forEach((doc) => {
                    const { heading } = doc.data()
                    todos.push({
                        id: doc.id,
                        heading,
                    })
                })
                setTodos(todos)
            })
    }, [])

    function deleteTodo(todos: any) {
        todoRef.doc(todos.id).delete().then(() => {
            Alert.alert('Deleted Successfully !!!');
        }).catch(error => {
            Alert.alert(error.message);
        })
    }

    function addTodos() {
        if (addData && addData.length > 0) {
            const timestamp = firebase.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp,
            };
            todoRef.add(data).then(() => {
                setAddData('');
                Keyboard.dismiss();
            }).catch((error) => {
                Alert.alert(error.message);
            })
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.formcontainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add Note'
                    placeholderTextColor='#aaaaaa'
                    onChangeText={(heading) => setAddData(heading)}
                    value={addData}
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={addTodos} >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={todos}
                numColumns={1}
                renderItem={({ item }) => (
                    <View>
                        <Pressable
                            style={styles.container}
                            onPress={() => navigation.navigate('Detail', { item })}
                        >
                            <TouchableOpacity
                                onPress={() => deleteTodo(item)}
                                style={styles.todoIcon}>
                                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16, }}>Delete</Text>
                            </TouchableOpacity>

                            <View style={styles.innerContainer}>
                                <Text style={styles.itemHeading}>
                                    {/* {item.heading[0].toupperCase() + item.heading.slice(1)} */}
                                    {item.heading[0].toUpperCase() + item.heading.slice(1)}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5E5E5E5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 45,
    },
    itemHeading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 22,
    },
    formcontainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 100,
    },
    input: {
        height: 40,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 37,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    todoIcon: {
        marginTop: 5,
        fontSize: 20,
        marginLeft: 14,
    },
})
