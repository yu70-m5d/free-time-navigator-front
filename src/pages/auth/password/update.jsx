import Header from "@/components/Header";
import PasswordConfirmationFrom from "@/components/PasswordConfirmationForm";
import PasswordFrom from "@/components/PasswordForm";
import { useResetPassword } from "@/hooks/useResetPassword";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styles from "@/styles/PasswordReset.module.css";
import { useEffect, useState } from "react";


export default function Update() {
  const router = useRouter();
  const { accessToken, client, clientId, config, expiry, resetPassword, token, uid} = router.query;
  const { register, handleSubmit, formState: { errors }} = useForm();
  const { updatePassword } = useResetPassword();
  const [loading, setLoading] = useState(false);

  const onSubmit = async(data) => {
    setLoading(true);
    try {
      if (token && client && uid) {
        await updatePassword({data, token, client, uid});
        router.push('/auth/signin');
      } else {
        alert("メールの送信からやり直してください。");
        router.push('/auth/password/reset');
      }
    } catch (error) {
      console.error('エラー：' + error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Header pageTitle={"パスワード再設定"} />
      <div className={styles.container}>
        <p className={styles.text}>新しいパスワードを設定してください。</p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
          <PasswordFrom
            register={register}
            errorMessage={errors.password?.message}
          />
          <PasswordConfirmationFrom
            register={register}
            errorMessage={errors.PasswordConfirmation?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            { !loading ? '変更' : '変更中' }
          </Button>
        </form>
      </div>
    </>
  )

}