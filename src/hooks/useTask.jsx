import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react"


export const useTask = () => {
  const [isLoaded, setIsLoading] = useState(false);

  const accessToken = Cookies.get('access-token');
  const client = Cookies.get('client');
  const uid = Cookies.get('uid');

  const fetchTasks = async() => {

    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/tasks`;
      const headers = {
        'access-token': accessToken,
        'client': client,
        'uid': uid,
      };

      const response = await axios.get(url, {headers: headers});

      if (response.status !== 200) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const fetchedTasks = await response.data;

      return fetchedTasks;
    } catch (error) {
      console.error('エラー：' + error.message);
    }
  }

  const createTask = async(data) => {

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

      alert("タスクを作成しました。");

    } catch (error) {
      console.error('エラー：' + error.message);
    }
  }

  const editTask = async({taskId, data}) => {

    setIsLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/tasks/${taskId}`;
      const headers = {
        'access-token': accessToken,
        'client': client,
        'uid': uid,
      };

      const params = {
        title: data.title,
        content: data.content,
      };

      const response = await axios.patch(url, params, {headers: headers});

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status ${response.status}`);
      };

      alert("タスクを編集しました。");

    } catch (error) {
      console.error('エラー：' + error.message);
    }
  }

  const deleteTask = async(taskId) => {

    setIsLoading(true);

    const isConfirmed = window.confirm("このメモを削除しますか？");

    if (!isConfirmed) {
      return;
    };

    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/tasks/${taskId}`;
      const headers = {
        'access-token': accessToken,
        'client': client,
        'uid': uid,
      };

      const response = await axios.delete(url, {headers: headers});

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status ${response.status}`);
      };

      alert("タスクを削除しました。");

    } catch (error) {
      console.error('エラー：' + error.message);
    }
  }

  return { fetchTasks, createTask, editTask, deleteTask };
};