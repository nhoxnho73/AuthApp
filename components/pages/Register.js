import { useNavigation } from "@react-navigation/native";
import { useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTogglePasswordVisibility } from "../../hooks/Toggle-Password";
import { useTogglePasswordConfirmVisibility } from "../../hooks/Toggle-Password-Confirm";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function RegisterScreen() {
    const navigation = useNavigation();
    const [emailInput, setEmailInput] = useState("");
    const [userName, setUserName] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

    const { showPassword, rightIcon, handleShowPassword } = useTogglePasswordVisibility();
    const { showConfrimPassword, confirmRightIcon, handleShowPasswordConfirm } = useTogglePasswordConfirmVisibility();
    const onRegister = async () => {
        if (emailInput) {
            if (emailInput && userName) {
                if (emailInput && userName && passwordInput) {
                    if (emailInput && userName && passwordInput && confirmPasswordInput) {
                        if (passwordInput !== confirmPasswordInput) {
                            alert("Passwords do not match!");
                            return;
                        }
    
                        try {
                            await createUserWithEmailAndPassword(auth, emailInput, confirmPasswordInput);
                            await updateProfile(auth, {displayName: userName});
                        } catch (e) {
                            alert(e.message);
                        }
                    } else {
                        alert("Please Input Password Confirm");
                    }
                } else {
                    alert("Please Input Password");
                }
            } else {
                alert("Please Input User name");
            }
        } else {
            alert("Please Input Email");
        }
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}  // Enable for Android
            keyboardShouldPersistTaps="handled" // Đảm bảo các tap không bị mất khi bàn phím xuất hiện
            extraScrollHeight={20} // Khoảng cách thêm để cuộn
            enableAutomaticScroll={true} // Tự động cuộn khi input focus
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.titleBox}>
                        <Text style={styles.alignTitle}>Register</Text>
                    </View>
                    <TextInput style={styles.input} onChangeText={setEmailInput} value={emailInput} placeholder="Please Input Email">
                    </TextInput>
                    <TextInput style={styles.input} onChangeText={setUserName} value={userName} placeholder="Please Input User name">
                    </TextInput>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputPassword}
                            onChangeText={setPasswordInput}
                            placeholder="Please Input Password"
                            secureTextEntry={showPassword}
                            enablesReturnKeyAutomatically
                            value={passwordInput}
                        >
                        </TextInput>
                        <TouchableOpacity
                            onPress={handleShowPassword}
                        >
                            <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputPassword}
                            onChangeText={setConfirmPasswordInput}
                            placeholder="Please Input confirm Password"
                            secureTextEntry={showConfrimPassword}
                            enablesReturnKeyAutomatically
                            value={confirmPasswordInput}
                        >
                        </TextInput>
                        <TouchableOpacity
                            onPress={handleShowPasswordConfirm}
                        >
                            <MaterialCommunityIcons name={confirmRightIcon} size={22} color="#232323" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text>
                            Already have an account?
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonLink} onPress={onRegister}>Login</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        padding: 20
    },
    card: {
        flex: 1,
        borderColor: "grey",
        backgroundColor: "#FFFAFA",
        borderRadius: 10,
        justifyContent: "center",
        shadowColor: "#000",
        shadowRadius: 2.62,
        elevation: 4,
        shadowOffset: {
            height: 2,
            width: 0
        },
        paddingTop: 40,
        paddingBottom: 50,
        paddingLeft: 25,
        paddingRight: 25
    },
    titleBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    alignTitle: {
        fontSize: 30,
        fontWeight: "600",
        marginBottom: 20,
    },
    buttonLink: {
        textAlign: 'center',
        fontWeight: "600",
        color: "#ffffff"
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    inputContainer: {
        width: "100%",
        height: 50,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    inputPassword: {
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
    }
})