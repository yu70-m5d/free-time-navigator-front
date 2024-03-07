import { accessTokenState, clientState, signingInState, uidState } from "@/state/atoms";
import axios from "axios";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function useSignIn () {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [client, setClient] = useRecoilState(clientState);
  const [uid, setUid] = useRecoilState(uidState);
  const [signingIn, setSigningIn] = useRecoilState(signingInState);
  const router = useRouter();

  const signIn = async(data) => {
    try {

      let params = {};
      let response = {};

      // const url = 'http://localhost:3001/api/v1/auth/sign_in';
      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/auth/sign_in`;

      if (data.userId) {
        params = {
          user_id: data.userId
        };
        response = await axios.post(url, params);
        console.log(response.data);
        setAccessToken(response.data.token);
        setClient(response.data.client);
        setUid(response.data.uid);
        setSigningIn(true);
      } else {
        params = {
          email: data.email,
          password: data.password
        };
        response = await axios.post(url, params);
        setAccessToken(response.headers['access-token']);
        setClient(response.headers['client']);
        setUid(response.headers['uid']);
        setSigningIn(true);
      }
      // return res;
    } catch (error) {
      console.error('エラー：' + error.message);
      if (error.response && error.response.status === 401) {
        alert("登録してください。")
        router.push('/auth/signup'); // 401エラーの場合は登録画面へ遷移
      }
      // throw error; // エラーが発生した場合はエラーをスローする
    }
  };

  return { signIn };
};