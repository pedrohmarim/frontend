import React, { Fragment, useEffect, useState } from 'react';
import { Button } from 'antd_components';
import { useRouter } from 'next/router';
import { useMyContext } from 'Context';
import LoginApi from 'services/Login';
import { Notification, FeatherIcons } from 'antd_components';

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const { loggedUser, setLoggedUser } = useMyContext();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined')
      setToken(window.localStorage.getItem('token'));
  }, []);

  function handleSeila() {
    LoginApi.Seila().then((data) => console.log(data));
  }

  function handleLogout() {
    LoginApi.Logout(token).then(({ Message, Success }) => {
      if (Success) {
        setLoggedUser(null);

        return Notification.success({
          message: 'Succeso!',
          description: Message,
          icon: <FeatherIcons icon="check" color="green" />,
          duration: 3.5,
        });
      }

      return Notification.error({
        message: 'Erro!',
        description: Message,
        icon: <FeatherIcons icon="x" color="red" />,
        duration: 3.5,
      });
    });
  }

  return (
    <Fragment>
      {loggedUser ? (
        <Fragment>
          <Button onClick={handleLogout}>deslogar</Button>
          <span>{loggedUser.Username}</span>
          <Button onClick={handleSeila}>fazer outra req</Button>
        </Fragment>
      ) : (
        <Button onClick={() => router.push('/login')}>logar</Button>
      )}
    </Fragment>
  );
}
