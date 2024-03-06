import { accessTokenState, clientState, providerState, signingInState, uidState } from "@/state/atoms";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function useSignIn () {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [client, setClient] = useRecoilState(clientState);
  const [uid, setUid] = useRecoilState(uidState);
  const [signingIn, setSigningIn] = useRecoilState(signingInState);
  const setProvider = useSetRecoilState(providerState);

  const signIn = async(userId) => {
    try {
      const url = 'http://localhost:3001/api/v1/auth/sign_in';
      const res = await axios.post(url, {
        session: {
          user_id: userId
        }
      });
      setAccessToken(res.data.token);
      setClient(res.data.client);
      setUid(res.data.uid);
      setProvider(res.data.provider);
      setSigningIn(true);
    } catch (error) {
      console.error('エラー：' + error.message);
      throw error; // エラーが発生した場合はエラーをスローする
    }
  };

  return { signIn };
};