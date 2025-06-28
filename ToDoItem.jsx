//
// QI Like 22102892D 
// 17 April 2025
//

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const TodoItem = ({ task, onDelete, onToggleCompletion, onEdit, isNightMode }) => {
    const dynamicStyles = {
        itemContainer: {
            backgroundColor: isNightMode ? '#333' : 'white',
        },
        taskText: {
            color: isNightMode ? 'white' : '#333',
        },
        taskCompleted: {
            color: isNightMode ? '#aaa' : '#999',
        },
        checkbox: {
            borderColor: isNightMode ? '#A02337' : '#A02337',
        },
    };

    return (
        <View style={[styles.itemContainer, dynamicStyles.itemContainer]}>
            <TouchableOpacity 
                style={[styles.checkbox, dynamicStyles.checkbox]} 
                onPress={() => onToggleCompletion(task.id)}
            >
                {task.completed && <View style={styles.checked} />}
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={[
                    styles.taskText, 
                    dynamicStyles.taskText, 
                    task.completed && styles.taskCompleted,
                    task.completed && dynamicStyles.taskCompleted
                ]}>
                    {task.taskText}
                </Text>
            </View>
            <TouchableOpacity 
                style={[styles.editButton, {backgroundColor: isNightMode ? '#555' : '#3498db'}]} 
                onPress={() => onEdit(task)}
            >
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.deleteButton, {backgroundColor: isNightMode ? '#777' : '#e74c3c'}]} 
                onPress={() => onDelete(task.id)}
            >
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        marginVertical:5,
        borderRadius:5,
        elevation:1,
    },
    checkbox: {
        width:24,
        height:24,
        borderWidth:1,
        borderRadius:4,
        marginRight:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        width:16,
        height:16,
        backgroundColor:'#A02337',
        borderRadius:2,
    },
    textContainer: {
        flex:1,
    },
    taskText: {
        fontSize:16,
    },
    taskCompleted: {
        textDecorationLine: 'line-through',
    },
    editButton: {
        padding:5,
        borderRadius:3,
        marginLeft:10,
    },
    deleteButton: {
        padding:5,
        borderRadius:3,
        marginLeft:5,
    },
    buttonText: {
        color:'white',
        fontSize:12,
    },
});

export default TodoItem;