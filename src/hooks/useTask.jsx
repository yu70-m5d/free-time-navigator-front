import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"


export const useTask = () => {
  const [isLoaded, setIsLoading] = useState(false);

  const accessToken = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');

  const sendData = async(data) => {

    setIsLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/tasks`;
      const headers = {
        'access-token': accessToken,
        'client': client,
        'uid': uid,
      };

      const params = {
        title: data.title,
        content: data.content,
      };

      const response = await axios.post(url, params, {headers: headers});

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status ${response.status}`);
      };

      console.log("タスクを投稿しました。");

    } catch (error) {
      console.error('エラー：' + error.message);
    }
  }

  return { sendData };
};