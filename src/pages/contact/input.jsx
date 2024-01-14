import ContactForm from "@/components/ContactForm";
import { ErrorSnackbar } from "@/components/ErrorSnackbar";
import Header from "@/components/Header";
import { useContactForm } from "@/hooks/useContactForm";

export default function Page() {
  const { hasError, isLoading, handleFormSubmit, closeError } = useContactForm();

  return (
    <>
      <Header isLoading={isLoading} />
      <ContactForm handleFormSubmit={handleFormSubmit} isLoading={isLoading} />
      <ErrorSnackbar hasError={hasError} closeError={closeError} />
    </>
  )
}