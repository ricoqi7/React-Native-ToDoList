//
// QI Like 22102892D 
// 17 April 2025
//

import React, { useState } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Modal,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    SafeAreaView,
    Button
} from 'react-native';
import TodoItem from './src/ToDoItem';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [inputText, setInputText] = useState('');
    const [isNightMode, setIsNightMode] = useState(false);

    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
    };

    const addTask = () => {
        if (inputText.trim() === '') {
            Alert.alert('Error', 'Task cannot be empty!');
            return;
        }

        const newTask = {
            id: Date.now().toString(),
            taskText: inputText,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        setInputText('');
        setModalVisible(false);
    };

    const deleteTask = (id) => {
      Alert.alert(
          "Confirm Deletion",
          "Are You Sure?",
          [
              {
                  text: "Cancel",
                  style: "cancel"
              },
              {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => {
                      setTasks(tasks.filter(task => task.id !== id));
                  }
              }
          ]
      );
    };

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task => {
            if(task.id === id) {
                return {...task, completed: !task.completed};
            }
            return task;
        }));
    };

    const editTask = (id, newText) => {
        setTasks(tasks.map(task => {
            if(task.id === id) {
                return {...task, taskText: newText};
            }
            return task;
        }));
    };

    const openEditModal = (task) => {
        setCurrentTask(task);
        setInputText(task.taskText);
        setModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <TodoItem 
            task={item} 
            onDelete={deleteTask} 
            onToggleCompletion={toggleTaskCompletion}
            onEdit={openEditModal}
            isNightMode={isNightMode}
        />
    );

    // Dynamic styles based on night mode
    const dynamicStyles = {
        container: {
            backgroundColor: isNightMode ? '#121212' : '#f2f2f2',
        },
        title: {
            color: isNightMode ? 'white' : 'black',
        },
        modalView: {
            backgroundColor: isNightMode ? '#333' : 'white',
        },
        modalTitle: {
            color: isNightMode ? 'white' : 'black',
        },
        input: {
            color: isNightMode ? 'white' : 'black',
            backgroundColor: isNightMode ? '#555' : 'white',
            borderColor: isNightMode ? '#777' : '#ccc',
        },
    };

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <View style={styles.modeToggleContainer}>
                <Button 
                    title={isNightMode ? "Switch to Day Mode" : "Switch to Night Mode"} 
                    onPress={toggleNightMode} 
                />
            </View>
            <Text style={[styles.title, dynamicStyles.title]}>To-Do List</Text>
            <FlatList 
                data={tasks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity 
                style={[styles.addButton, {backgroundColor: isNightMode ? '#555' : '#A02337'}]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                    setCurrentTask(null);
                    setInputText('');
                }}
            >
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalContainer}
                >
                    <View style={[styles.modalView, dynamicStyles.modalView]}>
                        <Text style={[styles.modalTitle, dynamicStyles.modalTitle]}>
                            {currentTask ? 'Edit Task' : 'Add Task'}
                        </Text>
                        <TextInput 
                            style={[styles.input, dynamicStyles.input]}
                            placeholder="Enter Task Name"
                            placeholderTextColor={isNightMode ? '#aaa' : '#888'}
                            value={inputText}
                            onChangeText={setInputText}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity 
                                style={[styles.button, styles.buttonSave, {backgroundColor: isNightMode ? '#555' : '#A02337'}]}
                                onPress={currentTask ? () => {
                                    editTask(currentTask.id, inputText);
                                    setModalVisible(false);
                                    setCurrentTask(null);
                                    setInputText('');
                                } : addTask}
                            >
                                <Text style={styles.buttonText}>
                                    {currentTask ? 'Update' : 'Add'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.button, styles.buttonCancel, {backgroundColor: isNightMode ? '#777' : '#ccc'}]}
                                onPress={() => {
                                    setModalVisible(false);
                                    setCurrentTask(null);
                                    setInputText('');
                                }}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    modeToggleContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    addButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 30,
        elevation: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 30,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '80%',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width:0,
            height:2,
        },
        shadowOpacity: 0.25,
        shadowRadius:4,
        elevation:5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom:10,
    },
    input: {
        width: '100%',
        borderWidth:1,
        borderRadius:5,
        padding:10,
        marginBottom:20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex:1,
        padding:10,
        borderRadius:5,
        alignItems: 'center',
        marginHorizontal:5,
    },
    buttonSave: {},
    buttonCancel: {},
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});