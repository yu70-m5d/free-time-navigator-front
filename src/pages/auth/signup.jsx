import { ErrorSnackbar } from "@/components/ErrorSnackbar";
import Header from "@/components/Header";
import SingUpForm from "@/components/SineUpForm";
import { useLineLogIn } from "@/hooks/useLineLogIn";
import { useSignUpForm } from "@/hooks/useSignUpForm"
import { Button } from "@mui/material";

export default function Page() {
  const { hasError, isLoading, sendData, closeError } = useSignUpForm();
  const { lineLogIn } = useLineLogIn();

  const handleLineLogIn = async () => {
    await lineLogIn();
  }

  return (
    <>
      <Header isLoading={isLoading} />
      <SingUpForm onSubmit={sendData} isLoading={isLoading} />
      <Button
        variant='contained'
        type="submit"
        onClick={handleLineLogIn}
        disabled={isLoading}
        >
        { !isLoading ? 'LINEログイン' : 'ログイン中' }
      </Button>
      <ErrorSnackbar hasError={hasError} closeError={closeError} />
    </>
  )
}