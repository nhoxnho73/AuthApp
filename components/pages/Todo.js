import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import TodoItems from './screens/TodoItems';
import useTodos from '../../hooks/UseTodos';
import useSpinner from '../../hooks/useSpinnerHook';
import { auth } from "../../firebaseConfig";
export default function TodoScreen() {
    const { todos, addTodo, toggleComplete, deleteTodo, editTodo } = useTodos();
    const [newTodoText, setNewTodoText] = useState('');
    const { loading, showSpinner, hideSpinner } = useSpinner();

    // Hàm xử lý khi bấm nút "Thêm Todo"
    const handleAddTodo = () => {
        showSpinner();
        if (newTodoText.trim()) {
            addTodo(newTodoText); // Gọi phương thức addTodo để thêm vào Firestore
            setNewTodoText(''); // Reset input text
        }
        hideSpinner();
    };

    const renderItem = ({ item }) => (
        <TodoItems
            item={item}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
            onEdit={editTodo}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.userName}>
                <Text style={styles.alignUserName}>{auth.currentUser.displayName}</Text>
            </View>
            {/* Input Text để thêm Todo */}
            <TextInput
                style={styles.input}
                value={newTodoText}
                onChangeText={setNewTodoText}
                placeholder="Nhập công việc mới"
            />
            <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
                <Text style={styles.buttonText}>Thêm Todo</Text>
            </TouchableOpacity>


            {/* Hiển thị danh sách Todo */}
            <FlatList
                style={styles.todoList}
                data={todos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text>Chưa có công việc nào</Text>}
            />
            {loading && <ActivityIndicator size="large" color="#007AFF" />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    todoList: {
        marginTop: 20
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textTransform: 'none',
        fontWeight: "600"
    },
    userName: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    alignUserName: {
        fontSize: 16,
        fontWeight: "600"
    }
});

