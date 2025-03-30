import { useState } from "react";
import { register, resendVerification, verifyEmail } from "../api/auth";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../lib/constants";
import { useRouter } from "next/navigation";
import { registerSchema } from "../utils/validation";

export const useSignup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordMatchError(e.target.value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setPasswordMatchError(e.target.value !== password);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(e.target.value);
  };

  const handleTermsAcceptedChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setVerificationError("");
      setSuccessMessage("");

      await registerSchema.validate(
        { email, password, confirmPassword, termsAccepted },
        { abortEarly: false }
      );

      await register(email, password);
      setSuccessMessage(SUCCESS_MESSAGES.REGISTRATION_SUCCESS);
    } catch (error: any) {
      setVerificationError(error.message || ERROR_MESSAGES.DEFAULT_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setVerificationError("");
      setSuccessMessage("");

      await verifyEmail(email, verificationCode);

      setSuccessMessage(SUCCESS_MESSAGES.EMAIL_VERIFICATION_SUCCESS);
      router.push("/user");
    } catch (error: any) {
      setVerificationError(error.message || ERROR_MESSAGES.DEFAULT_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setVerificationError("");
      setSuccessMessage("");

      await resendVerification(email);
      setSuccessMessage(SUCCESS_MESSAGES.RESAND_VERIFICATION_SUCCESS);
    } catch (error: any) {
      setVerificationError(error.message || ERROR_MESSAGES.DEFAULT_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    passwordMatchError,
    verificationCode,
    verificationError,
    termsAccepted,
    isLoading,
    successMessage,
    handlePasswordChange,
    handleConfirmPasswordChange,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleEmailChange,
    handleVerificationCodeChange,
    handleTermsAcceptedChange,
    handleSignUp,
    handleVerifyEmail,
    handleResendVerification,
    setVerificationError,
  };
};
