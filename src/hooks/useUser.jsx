import axios from "axios";
import Cookies from "js-cookie";


export const useUser = () => {
  const accessToken = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');
  const headers = {
    'access-token': accessToken,
    'client': client,
    'uid': uid,
  };

  const fetchUser = async(userId) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/users/${userId}`;
      const response = await axios.get(url, {headers: headers});

      if (response.status !== 200) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const fetchedUser = await response.data;
      return fetchedUser;

    } catch (error) {
      console.error('エラー：' + error.message);
    }
  }

  const editUserProfile = async( {userId, data} ) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/users/${userId}`;
      const params = {
        name: data.name,
      };

      const response = await axios.patch(url, params, {headers: headers});

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status ${response.status}`);
      };


      alert("名前を変更しました。");

      return response.data;
    } catch (error) {
      console.error('エラー：' + error.message);
    }
  }

  return { fetchUser, editUserProfile };

}