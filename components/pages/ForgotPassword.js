import React from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useResetPassword } from "../../hooks/ResetPasswordHook";
const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
});

export default function ForgotPasswordScreen() {
    const { resetPassword } = useResetPassword();
    return (
        <Formik
            initialValues={{ email: "" }}
            validationSchema={ResetPasswordSchema}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
                setStatus(null); // Reset trạng thái trước khi gửi

                try {
                    await resetPassword(values.email);
                    setStatus({ success: "Email khôi phục đã được gửi!" });
                } catch (err) {
                    setStatus({ error: "Không thể gửi email. Vui lòng thử lại." });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
                status,
            }) => (
                <View style={styles.container}>
                    <TextInput
                        placeholder="you@example.com"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        style={styles.input}
                    />

                    {/* Lỗi validate */}
                    {touched.email && errors.email && (
                        <Text style={styles.error}>{errors.email}</Text>
                    )}

                    {/* Lỗi từ server hoặc logic */}
                    {status?.error && (
                        <Text style={styles.error}>{status?.error}</Text>
                    )}

                    {/* Thông báo thành công */}
                    {status?.success && (
                        <Text style={styles.success}>{status?.success}</Text>
                    )}

                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={[
                            styles.button,
                            isSubmitting && styles.buttonDisabled
                        ]}
                        disabled={isSubmitting}
                    >
                        <Text style={styles.buttonText}>
                            {isSubmitting ? "Đang gửi..." : "Gửi Email Khôi Phục"}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, marginTop: 50 },
    input: {
        borderBottomWidth: 1,
        paddingVertical: 10,
        marginBottom: 8,
    },
    error: {
        color: "red",
        marginBottom: 8,
    },
    success: {
        color: "green",
        marginBottom: 8,
    },
    button: {
        backgroundColor: "#2196F3",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: "#90CAF9",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});