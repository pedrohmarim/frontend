import React, { useState } from 'react';
import Head from 'next/head';
import { Button } from 'antd_components';
import UserApi from 'services/User';
import { IUserResponse } from 'services/User/IUserService';

export default function Home() {
  const [user, setUser] = useState({} as IUserResponse);

  function handleGetUser() {
    UserApi.GetUser({ username: 'cavelanipedro' }).then((data) =>
      setUser(data)
    );
  }

  const UserSection = () => (
    <>
      <p>{user.name}</p>
      <p>{user.age}</p>
      <p>{user.username}</p>
    </>
  );

  return (
    <>
      <Head>
        <title>WhatsApp | Home</title>
      </Head>
      <Button onClick={handleGetUser}>Get</Button>

      {user && <UserSection />}
    </>
  );
}
