import { ErrorSnackbar } from "@/components/ErrorSnackbar";
import Header from "@/components/Header";
import SignUpForm from "@/components/SignUpForm";
import { useLineLogIn } from "@/hooks/useLineLogIn";
import { useSignUpForm } from "@/hooks/useSignUpForm"
import { Button } from "@mui/material";
import LineLoginButton from "@/components/LineLoginButton";
import styles from "@/styles/SignUp.module.css";

export default function Page() {
  const { hasError, isLoading, sendData, closeError } = useSignUpForm();
  const { lineLogIn } = useLineLogIn();

  const handleLineLogIn = async () => {
    await lineLogIn();
  }

  return (
    <>
      <Header isLoading={isLoading} pageTitle={"登録"} />
      <SignUpForm onSubmit={sendData} isLoading={isLoading} />
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