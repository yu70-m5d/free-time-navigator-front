import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export const useSignUpForm = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const closeError = () => setHasError(false);

  const sendData = async(data) => {

    // const isConfirmed = window.confirm("この内容で送信しますか？");

    // if (!isConfirmed) {
    //   return;
    // };

    setIsLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_SIGN_UP}`;
      const response = await axios.post(url, {
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      router.push('/');

    } catch {
      setHasError(true);
    }

    setIsLoading(false);
  };

  return { hasError, isLoading, sendData, closeError };
};