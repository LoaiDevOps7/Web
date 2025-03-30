import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ERROR_MESSAGES } from "../lib/constants";
import { loginSchema } from "@/utils/validation";
import { login } from "@/api/auth";
import { setCookie } from "nookies";

export const useLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    // console.log("Retrieved token on load:", token);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTermsAcceptedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTermsAccepted(e.target.checked);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await loginSchema.validate(
        { email, password, termsAccepted },
        { abortEarly: false },
      );

      const response = await login(email, password);

      const { access_token, refresh_token } = response;

      if (access_token) {
        // حفظ التوكن في localStorage
        localStorage.setItem("authToken", access_token);
        localStorage.setItem("refreshToken", refresh_token);

        // حفظ التوكن في الكوكيز
        setCookie(null, "authToken", access_token, {
          maxAge: 900000,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });

        router.push("/user");
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (error: any) {
      if (error.name === "ValidationError") {
        setError(error.errors.join(", "));
      } else {
        setError(error.response?.data?.message || ERROR_MESSAGES.DEFAULT_ERROR);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    showPassword,
    error,
    isLoading,
    termsAccepted,
    handleEmailChange,
    handlePasswordChange,
    toggleShowPassword,
    handleTermsAcceptedChange,
    handleLogin,
  };
};
