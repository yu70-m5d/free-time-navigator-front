import { providerState, uidState } from "@/state/atoms"
import axios from "axios"
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil"

export const useNotification = () => {
  const uid = useRecoilValue(uidState);

  const sendNotification = async(time) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/notifications/send_push_notification`;
      const headers = {
        'uid': uid,
      };
      const params = {
        time: time,
      }


      const response = await axios.post(url, params, { headers });

      if (response.status === 200) {
        alert("LINE通知を設定しました。");
      };

    } catch (error) {
      console.error('Error:', error);
    }
  }

  return { sendNotification };
}