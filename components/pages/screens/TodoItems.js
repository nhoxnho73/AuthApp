// components/TodoItem.js
import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput, StyleSheet, TouchableOpacity, Animated  } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from 'react-native-gesture-handler';

export default function TodoItems({ item, onToggle, onDelete, onEdit }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [editedText, setEditedText] = useState(item.text);

    const handleSave = () => {
        onEdit(item.id, editedText);
        setModalVisible(false);
    };

    const renderRightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0.5],
            extrapolate: 'clamp',
        });

        return (
            <TouchableOpacity onPress={() => onDelete(item.id)}>
                <Animated.View style={[styles.deleteBox, { transform: [{ scale }] }]}>
                    <MaterialIcons name="delete" size={24} color="FF3B30" />
                    <Text style={styles.deleteText}>Xoá</Text>
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.item}>
                <View style={styles.taskName}>
                    <TouchableOpacity onPress={() => onToggle(item.id, item.completed)}>
                        <Text
                            style={[
                                styles.text,
                                item.completed && { textDecorationLine: 'line-through', color: '#aaa' },
                            ]}
                        >
                            {item.text}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconBtn}>
                        <MaterialIcons name="edit" size={24} color="#007AFF" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.iconBtn}>
                        <MaterialIcons name="delete" size={24} color="#FF3B30" />
                    </TouchableOpacity>
                </View>

                {/* Modal sửa todo */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Sửa công việc</Text>
                            <TextInput
                                style={styles.input}
                                value={editedText}
                                onChangeText={setEditedText}
                                placeholder="Nhập nội dung mới"
                            />
                            <View style={styles.modalButtons}>
                                <Button title="Huỷ" onPress={() => setModalVisible(false)} />
                                <Button title="Lưu" onPress={handleSave} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </Swipeable>

    );
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        backgroundColor: '#f3f3f3',
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "row",
        shadowColor: "#000",
        shadowRadius: 2.62,
        elevation: 4,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },
    text: {
        fontSize: 16,
        fontWeight: "600"
    },
    taskName: {
        flex: 4,
        justifyContent: "center"
    },
    actions: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: "flex-end"
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        margin: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        borderBottomWidth: 1,
        padding: 8,
        marginBottom: 20,
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
