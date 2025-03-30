import { useState, useEffect } from "react";
import { resetPassword } from "../api/auth";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../lib/constants";
import { useRouter } from "next/navigation";
import { resetPasswordSchema } from "../utils/validation";

export const useResetPassword = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [verificationError, setVerificationError] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    // console.log("Retrieved token on load RessetPass:", token);
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setPasswordMatchError(e.target.value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setPasswordMatchError(e.target.value !== newPassword);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setVerificationError("User ID is required to reset the password");
      return;
    }

    try {
      setIsLoading(true);
      setVerificationError("");
      setSuccessMessage("");

      // Validation
      await resetPasswordSchema.validate(
        { newPassword, confirmPassword },
        { abortEarly: false }
      );

      // Proceed to reset the password
      console.log("data:", userId, newPassword);
      await resetPassword(userId, newPassword);

      setSuccessMessage(SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS);
      localStorage.removeItem("userId");
      router.push("/user");
    } catch (error: any) {
      setVerificationError(error.message || ERROR_MESSAGES.DEFAULT_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userId,
    newPassword,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    passwordMatchError,
    isLoading,
    successMessage,
    verificationError,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleResetPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    setUserId,
  };
};
