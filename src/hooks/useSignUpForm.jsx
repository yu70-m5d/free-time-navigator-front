import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { accessTokenState, clientState, loggedInState, uidState } from "@/state/atoms";
import Cookies from "js-cookie";
import { useUser } from "./useUser";


export const useSignUpForm = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const router = useRouter();

  const closeError = () => setHasError(false);

  const sendData = async(data) => {

    setIsLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/auth`;
      const response = await axios.post(url, {
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      Cookies.set("access-token", response.headers['access-token'], { expires: 0.4, secure: process.env.NODE_ENV === 'production' });
      Cookies.set("client", response.headers['client'], { expires: 0.4, secure: process.env.NODE_ENV === 'production' });
      Cookies.set("uid", response.headers['uid'], { expires: 0.4, secure: process.env.NODE_ENV === 'production' });
      Cookies.set("loggedIn", true, {expires: 0.4, secure: process.env.NODE_ENV === 'production' });

      router.push('/');
      alert("ログインしました。");

    } catch {
      setHasError(true);
    }

    setIsLoading(false);
  };

  return { hasError, isLoading, sendData, closeError };
};