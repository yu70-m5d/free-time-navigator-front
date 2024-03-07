import { accessTokenState, clientState, loggedInState, uidState } from "@/state/atoms";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";

export const useSignOut = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [client, setClient] = useRecoilState(clientState);
  const [uid, setUid] = useRecoilState(uidState);
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);

  const router = useRouter();

  const closeError = () => setHasError(false);

  const signOut = async() => {

    setIsLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_SIGN_OUT}`;
      const headers = {
        'access-token': accessToken,
        'client': client,
        'uid': uid,
      }

      const response = await axios.delete(url, {headers: headers});

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setAccessToken("");
      setClient("");
      setUid("");
      setLoggedIn(false);

      sessionStorage.removeItem('recoil-persist');

    } catch {
      setHasError(true);
    }
    setIsLoading(false);
  };

  return { hasError, isLoading, signOut, closeError};
};