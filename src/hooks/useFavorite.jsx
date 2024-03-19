import axios from "axios";
import Cookies from "js-cookie";


export const useFavorite = () => {
  const accessToken = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');
  const headers = {
    'access-token': accessToken,
    'client': client,
    'uid': uid,
  };

  const indexFavorites = async() => {
    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/favorites`;
      const response = await axios.get(url, {headers: headers});
      if (response.status !== 200) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      return response.data;
    } catch (error) {
      console.error('エラー：' + error.message);
    }
  };

  const checkFavorites = async(spotId) => {
    try {
      const favorites = await indexFavorites();

      const isFavorite = favorites.some(favorite => favorite.spot_id === spotId);
      return isFavorite;
    } catch (error) {
      console.error('エラー：' + error.message);
      return false; // エラーが発生した場合はfalseを返す
    }
  }

  const addFavorites = async(spotId) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/favorites`;
      const params = {
        spot_id : spotId,
      }

      const response = await axios.post(url, params, {headers: headers});

      if (response.status !== 200) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('エラー：' + error.message);
    }
  }

  const removeFavorites = async(spotId) => {
    try {
      const favoriteIndex = await indexFavorites();

      const foundRecord = favoriteIndex.find(record => record.spot_id === spotId);

      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/favorites/${foundRecord.id}`;

      const response = await axios.delete(url, {headers: headers});

      if (response.status !== 200) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('エラー：' + error.message);
    }
  }

  return { checkFavorites, addFavorites, removeFavorites };
}