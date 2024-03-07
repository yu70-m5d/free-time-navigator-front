// import axios from "@/utils/axiosConfig";
import axios from "axios";
import { useState } from "react";

export const useLineLogIn = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const lineLogIn = async() => {

    setIsLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/omniauth/line_url`;

      const response = await axios.get(url);
      const redirectUrl = response.data.line_auth_url; // レスポンスからリダイレクト先のURLを取得

    // 新しいタブを開いてリダイレクト
      window.location.href = redirectUrl;

    } catch {
      setHasError(true);
    }

    setIsLoading(false);
  };

  return { hasError, isLoading, lineLogIn }
}

