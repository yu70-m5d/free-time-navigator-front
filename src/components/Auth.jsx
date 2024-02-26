import { signInState } from "@/state/atoms";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function Auth({ children }) {
  const signIn = useRecoilValue(signInState);

  const router = useRouter();

  useEffect(() => {
    if(!signIn) {
      if (typeof window !== "undefined"){
      router.push("/");
      }
    }
  }, [signIn]);

  if(!signIn) {
    return null;
  }

  return children;
}