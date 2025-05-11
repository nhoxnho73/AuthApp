import { useNavigation } from "@react-navigation/native";
import { useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTogglePasswordVisibility } from "../../hooks/Toggle-Password";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebaseConfig";
import useSpinner from "../../hooks/useSpinnerHook";
export default function LoginPage() {
    const { loading, showSpinner, hideSpinner } = useSpinner();
    const navigation = useNavigation();
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const { showPassword, rightIcon, handleShowPassword } = useTogglePasswordVisibility();
    const onLogin = async () => {
        showSpinner();
        try {
            await signInWithEmailAndPassword(auth, emailInput, passwordInput);
        } catch (e) {
            alert(e.message);
        }
        hideSpinner();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.card}>
                    <View style={styles.titleBox}>
                        {/* <Text style={styles.alignTitle}>Login</Text> */}
                        <Image style={{ width: 150, height: 150, marginBottom: 70 }} source={require('../../assets/images/android-logo.png')}></Image>
                    </View>
                    <TextInput style={styles.input} onChangeText={setEmailInput} value={emailInput} placeholder="Please Input Email"></TextInput>
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
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonLink} onPress={onLogin}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.alignRegisterLink}>
                        <View style={styles.linkResetPassword}>
                            <Text style={styles.linkResetPasswordText} onPress={() => {
                                navigation.navigate('resetPassword')
                            }}>Forgot Password</Text>
                        </View>
                        <View style={styles.linkRegister}>
                            <Text style={styles.linkRegisterText} onPress={() => {
                                navigation.navigate('register')
                            }}>Register?</Text>
                        </View>
                    </View>
                </View>
            </View>
            {loading && <ActivityIndicator style={styles.spinner} size="large" color="#007AFF" />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    contentContainer:{
        flex: 1,
        flexDirection: "row",
        padding: 20,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
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
        fontSize: 50,
        fontWeight: "600",
        marginBottom: 20,
    },
    buttonLink: {
        color: "blue",
        textDecorationColor: "blue",
        fontSize: 16,
        fontWeight: "600",
        alignItems: "center",
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
    },
    linkRegister: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    linkResetPasswordText: {
        fontSize: 16,
        fontWeight: "600",
    },
    alignRegisterLink: {
        flexDirection: "row",
        marginTop: 15,
    },
    linkResetPassword: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    linkRegisterText: {
        fontSize: 16,
        fontWeight: "600",
    },
    spinner: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    }

})