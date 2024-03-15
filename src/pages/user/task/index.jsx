import { accessTokenState, clientState, loggedInState, uidState } from "@/state/atoms";
import axios from "axios"
import { useRecoilValue } from "recoil";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  try {
    const accessToken = context.req.cookies['access-token'];
    const client = context.req.cookies['client'];
    const uid = context.req.cookies['uid'];

    const url = `${process.env.NEXT_PUBLIC_FTN_API_ORIGIN}/api/v1/tasks`;

    const headers = {
      'access-token': accessToken,
      'client': client,
      'uid': uid,
    };

    console.log(headers);

    const response = await axios.get(url, {headers: headers});

    if (response.status !== 200) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const tasks = await response.data;
    console.log(tasks);

    return {
      props: {
        tasks,
      },
    };
  } catch (error) {
    console.error()

    return {
      props: {},
    }
  }
}

export default function Tasks({tasks}) {

  console.log(tasks);

  return (
    <>
      todoいんでっくす
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </>
  )
}