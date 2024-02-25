import { ErrorSnackbar } from "@/components/ErrorSnackbar";
import Header from "@/components/Header";
import SingUpForm from "@/components/SineUpForm";
import { useSignUpForm } from "@/hooks/useSignupForm"

export default function Page() {
  const { hasError, isLoading, sendData, closeError } = useSignUpForm();

  return (
    <>
      <Header isLoading={isLoading} />
      <SingUpForm onSubmit={sendData} isLoading={isLoading} />
      <ErrorSnackbar hasError={hasError} closeError={closeError} />
    </>
  )
}