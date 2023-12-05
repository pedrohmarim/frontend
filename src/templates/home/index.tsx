import React, { Fragment } from 'react';
import { Button } from 'antd_components';
import { useRouter } from 'next/router';
import { useMyContext } from 'Context';

export default function Home() {
  const { loggedUser } = useMyContext();
  const router = useRouter();

  return (
    <Fragment>
      <Button onClick={() => router.push('/login')}>logar</Button>
      {loggedUser && <span>{loggedUser.Username}</span>}
    </Fragment>
  );
}
