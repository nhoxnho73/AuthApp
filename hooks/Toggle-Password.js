
import { useState } from "react";

export const useTogglePasswordVisibility = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [rightIcon, setRightIcon] = useState("eye");

    const handleShowPassword = () => {
        if (showPassword) {
            setShowPassword(false)
            setRightIcon("eye-off")
        } else {
            setShowPassword(true)
            setRightIcon("eye")
        }
    }

    return {showPassword, rightIcon, handleShowPassword}
}