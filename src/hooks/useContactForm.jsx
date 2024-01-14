import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export const useContactForm = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const closeError = () => setHasError(false);

  const sendData = async(data) => {
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_CONTACTS}`;
      const response = await axios.post(url, {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      router.push('/contact/success');

    } catch {
      setHasError(true);
    }

    setIsLoading(false);
  };

  const handleFormSubmit = () => {
    const isConfirmed = window.confirm('この内容で送信しますか？');

    if (isConfirmed) {
      onSubmit(); // 実際の送信処理
    }
  };

  return { hasError, isLoading, sendData, handleFormSubmit, closeError };
};