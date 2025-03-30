import { useEffect, useState } from "react";
import { forgotPassword, verifyResetCode } from "../api/auth";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../lib/constants";
import { forgotPasswordSchema } from "../utils/validation";
import { useRouter } from "next/navigation";

export const useForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [verificationError, setVerificationError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    // console.log("Retrieved token on load forgotPass:", token);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResetCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetCode(e.target.value);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setVerificationError("");
      setSuccessMessage("");

      await forgotPasswordSchema.validate({ email }, { abortEarly: false });

      const response = await forgotPassword(email);

      if (response.userId) {
        localStorage.setItem("userId", response.userId.toString());
      }

      setSuccessMessage(SUCCESS_MESSAGES.FORGOT_PASSWORD_SUCCESS);
    } catch (error: any) {
      setVerificationError(error.message || ERROR_MESSAGES.DEFAULT_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setVerificationError("");

      const storedUserId = localStorage.getItem("userId");
      // console.log("storedUserId:", storedUserId);
      if (!storedUserId) {
        throw new Error(
          "User ID not found. Please request a reset code again."
        );
      }
      const userId = Number(storedUserId);

      const response = await verifyResetCode(userId, resetCode);

      router.push(`/reset-password/${userId}`);

      setSuccessMessage(
        response.message || "Reset code verified successfully."
      );
    } catch (error: any) {
      setVerificationError(error.message || ERROR_MESSAGES.DEFAULT_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    resetCode,
    isLoading,
    successMessage,
    verificationError,
    handleEmailChange,
    handleForgotPassword,
    handleResetCodeChange,
    handleVerifyResetCode,
  };
};
