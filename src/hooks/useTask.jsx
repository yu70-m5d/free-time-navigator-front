import { useState } from "react"


export const useTodo = () => {
  const [isLoaded, setIsLoading] = useState(false);

  const sendData = async(data) => {

    setIsLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/tasks`
    } catch (error) {
      
    }
  }
}