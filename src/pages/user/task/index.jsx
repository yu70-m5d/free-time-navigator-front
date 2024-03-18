import { accessTokenState, clientState, loggedInState, uidState } from "@/state/atoms";
import axios from "axios"
import { useRecoilValue } from "recoil";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import styles from "@/styles/TaskIndexPage.module.css";
import Header from "@/components/Header";
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/router";
import Footer from "@/components/Footer";


export async function getServerSideProps(context) {

  const accessToken = context.req.cookies['access-token'];
  const client = context.req.cookies['client'];
  const uid = context.req.cookies['uid'];

  if (!accessToken || !client || !uid) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {

    const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/tasks`;

    const headers = {
      'access-token': accessToken,
      'client': client,
      'uid': uid,
    };

    console.log(headers);

    const response = await axios.get(url, {headers: headers});

    if (response.status !== 200) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const tasks = await response.data;
    console.log(tasks);

    return {
      props: {
        tasks,
      },
    };
  } catch (error) {
    console.error()

    return {
      props: {},
    }
  }
}

export default function Tasks({tasks}) {

  console.log(tasks);

  const router = useRouter();

  const handleTask = (id) => {
    console.log(id);
    router.push(`/user/task/${id}`)
  };

  const handleAdd = () => {
    router.push('/user/task/create');
  }

  return (
    <>
      <Header pageTitle={"やりたいこと"} />
      <div className={styles.container}>
        {tasks.map((task) => (
          <div className={styles.item} key={task.id} onClick={() => handleTask(task.id)} >
            <p className={styles.title}>{task.title}</p>
            <p className={styles.date}>{task.created_at.split('T')[0]}</p>
          </div>
        ))}
        <div className={styles.addBtn} onClick={handleAdd}>
          <AddIcon />
          <p>追加</p>
        </div>
      </div>
      <Footer />
    </>
  )
}