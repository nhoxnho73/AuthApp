import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native"
import { signOut, updateProfile } from 'firebase/auth';
import { auth } from "../../firebaseConfig";
import { useState } from "react";
export default SettingSreen = () => {
    const [userName, setUserName] = useState("");
    const user = auth.currentUser;
    const handleUpdate = async () => {
        try {
            await updateProfile(user, { displayName: userName });
            setUserName("");
            alert("Update SuccessFull!");
        } catch (e) {
            alert(e.message);
        }

    }
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // User signed out, App.js auto redirect Login screen follow the method onAuthStateChanged
            })
            .catch((error) => {
                alert("Logout failed: " + error.message);
            });
    };
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.titleBox}>
                    <Text style={styles.alignTitle}>Update Profile</Text>
                </View>
                <Text style={styles.alignText}>User name: {auth.currentUser.displayName}</Text>
                <Text style={styles.alignText}>Email: {auth.currentUser.email}</Text>
                <TextInput style={styles.input} onChangeText={setUserName} value={userName} placeholder="Please Input User name">
                </TextInput>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                        <Text style={[styles.buttonText]}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleLogout}>
                        <Text style={styles.buttonText}>LogOut</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
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
    containerButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
    },
    button: {
        backgroundColor: '#ec0040',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textTransform: 'none',
        fontWeight: "600"
    },
    alignText: {
        fontSize: 14,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginTop: 10
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
})