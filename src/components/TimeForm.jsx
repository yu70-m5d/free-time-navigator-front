import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { timeState } from "@/state/atoms";
import useFetchSpots from "@/hooks/useFetchSpots";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function TimeForm() {

  const { register, handleSubmit, setValue } = useForm();
  // const setTime = useSetRecoilState(timeState);
  const [time, setTime] = useRecoilState(timeState);
  const { loading } = useFetchSpots();
  const router = useRouter();


  const handleTime = (data) => {
    setTime(data.time);
    router.push('/spots');
  }

  useEffect(() => {
    setValue("time",time);
  }, [time, setValue]);


  return (
    <>
      <form onSubmit={handleSubmit(handleTime)}>
        <label htmlFor='time'>
          <span className="label">空き時間</span>
        </label>
        <input
          id="time"
          type="time"
          placeholder='空き時間'
          {...register("time", {
            required: "空き時間を入力してください"
          })}
        />
        <button type="submit">
          検索
        </button>
      </form>
    </>
  )
}