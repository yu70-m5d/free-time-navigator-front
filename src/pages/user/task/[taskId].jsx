import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "@/styles/TaskShowPage.module.css";
import { style } from "@mui/system";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useTask } from "@/hooks/useTask";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

export async function getServerSideProps(context) {
  const { params } = context;
  const taskId = params.taskId;
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
    const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/tasks/${taskId}`;
    const headers = {
      'access-token': accessToken,
      'client': client,
      'uid': uid,
    };

    const response = await axios.get(url, {headers: headers});

    if (response.status !== 200) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const task = await response.data;

    return {
      props: {
        task,
      },
    };
  } catch (error) {
    console.error(`Error in getStaticProps for task ID ${taskId}:`, error);
    return {
      props: {},
    };
  }
}

export default function Task( {task} ) {

  const { deleteTask } = useTask();
  const router = useRouter();

  const handleEditPage = () => {
    router.push(`/user/task/edit/${task.id}`);
  }

  const handleDelete = () => {
    deleteTask(task.id);
    router.push('/user/task');
  }

  return (
    <>
      <Layout>
        <Header />
        <div className={styles.container}>
          <div className={styles.item}>
            <div className={styles.title}>
              <p className={styles.titleText}>{task.title}</p>
            </div>
            <div className={styles.date}>
              <p className={styles.dataText}>作成日：{task.created_at.split('T')[0]}</p>
            </div>
            <div></div>
            <div className={styles.content}>
              <p>{task.content}</p>
            </div>
            <div className={styles.box}>
              <div className={styles.btn}>
                <div className={styles.deleteBtn} onClick={handleDelete}>
                  <DeleteIcon />
                  <p>削除</p>
                </div>
                <div className={styles.editBtn} onClick={handleEditPage}>
                  <EditIcon />
                  <p>編集</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  )
}