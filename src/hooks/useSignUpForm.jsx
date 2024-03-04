import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { accessTokenState, clientState, signingInState, uidState } from "@/state/atoms";

export const useSignUpForm = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [client, setClient] = useRecoilState(clientState);
  const [uid, setUid] = useRecoilState(uidState);
  const [signingIn, setSigningIn] = useRecoilState(signingInState);

  const router = useRouter();

  const closeError = () => setHasError(false);

  const sendData = async(data) => {

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

      console.log(response);
      console.log(response.headers['access-token']);
      console.log(response.headers['client']);
      console.log(response.headers['uid']);


      setAccessToken(response.headers['access-token']);
      setClient(response.headers['client']);
      setUid(response.headers['uid']);
      setSigningIn(true);


      router.push('/auth/test');

    } catch {
      setHasError(true);
    }

    setIsLoading(false);
  };

  return { hasError, isLoading, sendData, closeError };
};