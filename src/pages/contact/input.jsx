import ContactForm from "@/components/ContactForm";
import { ErrorSnackbar } from "@/components/ErrorSnackbar";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { useContactForm } from "@/hooks/useContactForm";

export default function Page() {
  const { hasError, isLoading, sendData, closeError } = useContactForm();

  return (
    <>
      <Layout>
        <Header isLoading={isLoading} pageTitle={"お問い合わせ"} />
        <ContactForm onSubmit={sendData} isLoading={isLoading} />
        <ErrorSnackbar hasError={hasError} closeError={closeError} />
      </Layout>
    </>
  )
}