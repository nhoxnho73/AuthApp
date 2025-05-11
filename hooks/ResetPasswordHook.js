import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebaseConfig';

export const useResetPassword = () => {

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  return { resetPassword };
};