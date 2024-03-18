import { loggedInState, signingInState } from "@/state/atoms";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function Auth({ children }) {
  // const loggedIn = useRecoilValue(loggedInState);
  const loggedIn = Cookies.get('loggedIn');

  const router = useRouter();

  useEffect(() => {
    const loggedIn = Cookies.get('loggedIn');
    if (!loggedIn && typeof window !== "undefined") {
      router.push("/");
    }
  }, []);

  if(typeof window === "undefined") {
    return null;
  }

  return children;
}