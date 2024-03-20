import { ErrorSnackbar } from "@/components/ErrorSnackbar";
import Header from "@/components/Header";
import SignUpForm from "@/components/SignUpForm";
import { useLineLogIn } from "@/hooks/useLineLogIn";
import { useSignUpForm } from "@/hooks/useSignUpForm"
import { Button } from "@mui/material";
import LineLoginButton from "@/components/LineLoginButton";
import styles from "@/styles/SignUp.module.css";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function Page() {
  const { hasError, isLoading, sendData, closeError } = useSignUpForm();
  const { lineLogIn } = useLineLogIn();

  const handleLineLogIn = async () => {
    await lineLogIn();
  }

  return (
    <>
      <Layout>
        <Header isLoading={isLoading} pageTitle={"登録"} />
        <h2 className={styles.appName}>Free Time Navigator</h2>
        <div className={styles.linkBox}>
          <div className={styles.flexItem1}>
            <Link href={"https://www.kiyac.app/termsOfService/pIdEs0GXmPGjVT7UMnUa"}>
              <p>利用規約</p>
            </Link>
          </div>
          <div className={styles.flexItem2}>
            <Link href={"https://www.kiyac.app/privacypolicy/VfYPLKTsPDuvjwh4AAMM"}>
              <p>プライバシーポリシー</p>
            </Link>
          </div>
        </div>
        <SignUpForm onSubmit={sendData} isLoading={isLoading} />
        <div className={styles.lineLogin} >
          <div>
            <div className={styles.orBox}>
              <div className={styles.horizontalLine}></div>
              <p className={styles.orText}>or</p>
              <div className={styles.horizontalLine}></div>
              <div></div>
            </div>
            <LineLoginButton />
          </div>
        </div>
        <ErrorSnackbar hasError={hasError} closeError={closeError} />
      </Layout>
    </>
  )
}