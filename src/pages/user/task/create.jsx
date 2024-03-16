import ContentForm from "@/components/ContentForm";
import TitleForm from "@/components/TitleForm";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "@/styles/TodoCreatePage.module.css";
import Header from "@/components/Header";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import { useTask } from "@/hooks/useTask";
import { useRouter } from "next/router";


export default function CreateTodo() {

  const { register, handleSubmit, formState: { errors }} = useForm();
  const { sendData } = useTask();
  const router = useRouter();

  const onSubmit = (data) => {
    sendData(data);
    router.push('/user/task');
  };

  const currentDate = new Date();

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.item1} >
          <div className={styles.titleForm}>
            <TitleForm
              register={register}
              errorMessage={errors.title?.message}
              className={styles.titleForm}
            />
          </div>
          <div className={styles.date}>
            <p className={styles.dateText}>{currentDate.toLocaleDateString()}</p>
          </div>
          <div className={styles.contentForm}>
            <ContentForm
              register={register}
              errorMessage={errors.content?.message}
            />
          </div>
          <div className={styles.button}>
            <Button type="submit" variant="contained" color="primary">作成</Button>
          </div>
        </form>
      </div>
    </>
  )
}