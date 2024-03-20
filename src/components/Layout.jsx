import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Footer from "./Footer";
import Header from "./Header";


export default function Layout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      {loading ? (
        <>
          <Header />
          <Loading />
          <Footer />
        </>
      ) : (
        <>
        {children}
        </>
      )}
    </>
  );
}