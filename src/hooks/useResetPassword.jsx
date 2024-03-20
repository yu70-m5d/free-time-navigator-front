import axios from "axios";

export const useResetPassword = () => {
  const requestReset = async(data) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/auth/password`;
      const params = {
        email: data.email,
        redirect_url: `${process.env.NEXT_PUBLIC_FTN_FRONT_ORIGIN}/auth/password/update`,
      };
      const response = await axios.post(url, params);

      if (response.status !== 200) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      alert("パスワード変更用のメールを送信しました。");
    } catch (error) {
      console.error('エラー：' + error.message);
    }
  }

  const updatePassword = async(props) => {
    const { data, token, client, uid } = props;
    try {
    const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/auth/password`;
    const headers = {
      'access-token': token,
      'client': client,
      'uid': uid,
    };
    const params = {
      'password': data.password,
      'password_confirmation': data.password_confirmation,
    };

    const response = await axios.patch(url, params, {headers: headers});

    if (response.status !== 200) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    alert("パスワードを変更しました。");
    } catch (error) {
      console.error('エラー：' + error.message);
    }
  }

  return { requestReset, updatePassword }
}