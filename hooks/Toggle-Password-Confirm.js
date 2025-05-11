
import { useState } from "react";

export const useTogglePasswordConfirmVisibility = () => {
    const [showConfrimPassword, setShowPassword] = useState(true);
    const [confirmRightIcon, setRightIcon] = useState("eye");

    const handleShowPasswordConfirm = () => {
        if (showPassword) {
            setShowPassword(false)
            setRightIcon("eye-off")
        } else {
            setShowPassword(true)
            setRightIcon("eye")
        }
    }

    return {showConfrimPassword, confirmRightIcon, handleShowPasswordConfirm}
}