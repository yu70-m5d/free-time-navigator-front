import { signingInState } from "@/state/atoms";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function Auth({ children }) {
  const signingIn = useRecoilValue(signingInState);

  const router = useRouter();

  useEffect(() => {
    if(!signingIn) {
      if (typeof window !== "undefined"){
      router.push("/");
      }
    }
  }, [signingIn]);

  if(!signingIn) {
    return null;
  }

  return children;
}