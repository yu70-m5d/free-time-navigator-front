import ContactForm from "@/components/ContactForm";
import { ErrorSnackbar } from "@/components/ErrorSnackbar";
import Header from "@/components/Header";
import { useContactForm } from "@/hooks/useContactForm";

export default function Page() {
  const { hasError, isLoading, sendData, closeError } = useContactForm();

  return (
    <>
      <Header />
      お問い合わせページ
      <ContactForm onSubmit={sendData} isLoading={isLoading} />
      <ErrorSnackbar hasError={hasError} closeError={closeError} />
    </>
  )
}