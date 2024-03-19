import { accessTokenState, clientState, providerState, loggedInState, uidState } from "@/state/atoms";
import axios from "axios";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import Cookies from "js-cookie";

export const useSignIn = () => {
  const router = useRouter();

  const signIn = async(data) => {
    try {

      let params = {};
      let response = {};

      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/auth/sign_in`;

      if (data.userId) {
        params = {
          user_id: data.userId
        };
        response = await axios.post(url, params);

        Cookies.set("access-token", response.data.token, { expires: 0.4, secure: process.env.NODE_ENV === 'production' });
        Cookies.set("client", response.data.client, { expires: 0.4, secure: process.env.NODE_ENV === 'production' });
        Cookies.set("uid", response.data.uid, { expires: 0.4, secure: process.env.NODE_ENV === 'production' });
        Cookies.set("provider", response.data.provider, { expires: 0.4, secure: process.env.NODE_ENV === 'production' });
        Cookies.set("loggedIn", true, {expires: 0.4, secure: process.env.NODE_ENV === 'production' });
      } else {
        params = {
          email: data.email,
          password: data.password
        };
        response = await axios.post(url, params);

        Cookies.set("access-token", response.headers['access-token'], { expires: 0.4, secure: process.env.NODE_ENV === 'production' });
        Cookies.set("client", response.headers['client'], { expires: 0.4, secure: process.env.NODE_ENV === 'production' });
        Cookies.set("uid", response.headers['uid'], { expires: 0.4, secure: process.env.NODE_ENV === 'production' });
        Cookies.set("loggedIn", true, {expires: 0.4, secure: process.env.NODE_ENV === 'production' });
      }

      alert("ログインしました。");
      router.push("/");
    } catch (error) {
      console.error('エラー：' + error.message);
      if (error.response && error.response.status === 401) {
        alert("登録してください。")
        router.push('/auth/signup'); // 401エラーの場合は登録画面へ遷移
      }
    }
  };

  return { signIn };
};