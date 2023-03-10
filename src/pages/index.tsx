import React from 'react';
import Head from 'next/head';
import { Button } from 'antd_components';
import UserApi from 'services/User';

export default function Home() {
  function handleGetUser() {
    UserApi.GetUser({ userId: 1 }).then((data) => console.log(data));
  }

  return (
    <>
      <Head>
        <title>WhatsApp | Home</title>
      </Head>
      <Button onClick={handleGetUser}>Get</Button>
    </>
  );
}
