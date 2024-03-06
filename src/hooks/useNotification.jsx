import { providerState, uidState } from "@/state/atoms"
import axios from "axios"
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil"

export default function useNotification () {
  const uid = useRecoilValue(uidState);
  const provider = useRecoilValue(providerState);
  const router = useRouter();

  const sendNotification = async(time) => {
    try {
      if (provider != 'line') {
        alert("LINEでログインしてください。");
        router.push('/auth/signup');
      };
      const url = 'http://localhost:3001/api/v1/notifications/send_push_notification';
      const headers = {
        'uid': uid,
      };
      const params = {
        time: time,
      }

      console.log(params);

      const response = await axios.post(url, params, { headers });
      console.log('Response:', response.data);

      if (response.status === 200) {
        alert("LINE通知を設定しました。");
      };

    } catch (error) {
      console.error('Error:', error);
    }
  }

  return { sendNotification };
}