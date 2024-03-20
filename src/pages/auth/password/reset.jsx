import EmailFrom from "@/components/EmailForm";
import Header from "@/components/Header";
import { useResetPassword } from "@/hooks/useResetPassword";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "@/styles/PasswordReset.module.css";
import { useState } from "react";
import Layout from "@/components/Layout";

export default function Reset() {

  const { register, handleSubmit, formState: { errors }} = useForm();
  const { requestReset } = useResetPassword();
  const [loading, setLoading] = useState(false);

  const onSubmit = async(data) => {
    setLoading(true);
    try {
      await requestReset(data);
    } catch (error) {
      console.error('エラー：' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Layout>
        <Header pageTitle={"パスワード再設定"} />
        <div className={styles.container}>
          <p className={styles.text}>パスワード再設定用のメールを送信します。</p>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
              <EmailFrom
                register={register}
                errorMessage={errors.email?.message}
              />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              { !loading ? '送信' : '送信中' }
            </Button>
          </form>
        </div>
      </Layout>
    </>
  )
}