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
import { useTask } from "@/hooks/useTask";
import Layout from "@/components/Layout";


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


    const response = await axios.get(url, {headers: headers});

    if (response.status !== 200) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const initialTasks = await response.data;

    return {
      props: {
        initialTasks,
      },
    };
  } catch (error) {
    console.error()

    return {
      props: {},
    }
  }
}

export default function Tasks({initialTasks}) {

  const [tasks, setTasks] = useState(initialTasks);
  const { fetchTasks } = useTask();

  const router = useRouter();

  useEffect(()=>{
    const refreshTasks = async() => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('エラー：' + error.message);
      }
    };
    refreshTasks();
  }, []);


  const handleTask = (id) => {
    router.push(`/user/task/${id}`)
  };

  const handleAdd = () => {
    router.push('/user/task/create');
  }

  return (
    <>
    <Layout>
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
      </Layout>
    </>
  )
}