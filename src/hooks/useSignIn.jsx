import { accessTokenState, clientState, signingInState, uidState } from "@/state/atoms";
import axios from "axios";
import { useRecoilState } from "recoil";

export default function useSignIn () {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [client, setClient] = useRecoilState(clientState);
  const [uid, setUid] = useRecoilState(uidState);
  const [signingIn, setSigningIn] = useRecoilState(signingInState);

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
      setSigningIn(true);
      // return res;
    } catch (error) {
      console.error('エラー：' + error.message);
      throw error; // エラーが発生した場合はエラーをスローする
    }
  };

  return { signIn };
};