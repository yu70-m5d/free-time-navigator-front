import { ErrorSnackbar } from "@/components/ErrorSnackbar";
import Header from "@/components/Header";
import SignInForm from "@/components/SignInForm";
import { useLineLogIn } from "@/hooks/useLineLogIn";
import { useSignUpForm } from "@/hooks/useSignUpForm"
import { useSignIn } from "@/hooks/useSignIn";
import LineLoginButton from "@/components/LineLoginButton";
import styles from "@/styles/SignIn.module.css";
import Link from "next/link";

export default function SignIn() {
  const { hasError, isLoading, sendData, closeError } = useSignUpForm();
  const { signIn } = useSignIn();
  const { lineLogIn } = useLineLogIn();

  return (
    <>
      <Header isLoading={isLoading} pageTitle={"ログイン"} />
      <h2 className={styles.appName}>Free Time Navigator</h2>
      <SignInForm onSubmit={signIn} isLoading={isLoading} />
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
      <p className={styles.text}>アカウントをお持ちでないですか？</p>
      <Link href="/auth/signup">
        <p className={styles.text}>登録する</p>
      </Link>
      <ErrorSnackbar hasError={hasError} closeError={closeError} />
    </>
  )
}