import { ErrorSnackbar } from "@/components/ErrorSnackbar";
import Header from "@/components/Header";
import SingUpForm from "@/components/SignUpForm";
import SignInForm from "@/components/SignInForm";
import { useLineLogIn } from "@/hooks/useLineLogIn";
import { useSignUpForm } from "@/hooks/useSignUpForm"
import { Button } from "@mui/material";
import useSignIn from "@/hooks/useSignIn";
import LineLoginButton from "@/components/LineLoginButton";
import styles from "@/styles/SignUp.module.css";

export default function SignIn() {
  const { hasError, isLoading, sendData, closeError } = useSignUpForm();
  const { signIn } = useSignIn();
  const { lineLogIn } = useLineLogIn();

  const handleLineLogIn = async () => {
    await lineLogIn();
  }

  return (
    <>
      <Header isLoading={isLoading} pageTitle={"ログイン"} />
      <SignInForm onSubmit={signIn} isLoading={isLoading} />
      <div className={styles.lineLogin} >
        <div>
          <p className={styles.orText}>-------------------- もしくは --------------------</p>
          <LineLoginButton />
        </div>
      </div>
      <ErrorSnackbar hasError={hasError} closeError={closeError} />
    </>
  )
}