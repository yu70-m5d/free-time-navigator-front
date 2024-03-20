import Header from "@/components/Header";
import axios from "axios";
import styles from "@/styles/TodoCreatePage.module.css";
import { useForm } from "react-hook-form";
import { useTask } from "@/hooks/useTask";
import { useRouter } from "next/router";
import TitleForm from "@/components/TitleForm";
import ContentForm from "@/components/ContentForm";
import { Button } from "@mui/material";
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

export default function EditTask( {task} ) {
  const { register, handleSubmit, formState: { errors }} = useForm();
  const { editTask } = useTask();
  const router = useRouter();
  const currentDate = new Date();
  const taskId = task.id;


  const onSubmit = (data) => {
    editTask({taskId, data});
    router.push(`/user/task/${task.id}`);
  }

  return (
    <>
      <Layout>
        <Header />
        <div className={styles.container}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.item1} >
            <div className={styles.titleForm}>
              <TitleForm
                register={register}
                errorMessage={errors.title?.message}
                className={styles.titleForm}
                defaultValue={task.title}
              />
            </div>
            <div className={styles.date}>
              <p className={styles.dateText}>{currentDate.toLocaleDateString()}</p>
            </div>
            <div className={styles.contentForm}>
              <ContentForm
                register={register}
                errorMessage={errors.content?.message}
                defaultValue={task.content}
              />
            </div>
            <div className={styles.button}>
              <Button type="submit" variant="contained" color="primary">編集</Button>
            </div>
          </form>
        </div>
        <Footer />
      </Layout>
    </>
  );
}