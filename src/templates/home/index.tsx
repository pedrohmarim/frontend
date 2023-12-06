import React, { Fragment } from 'react';
import { Button } from 'antd_components';
import { useRouter } from 'next/router';
import { useMyContext } from 'Context';
import LoginApi from 'services/Login';
import { Notification, FeatherIcons } from 'antd_components';

export default function Home() {
  const { login, setLogin } = useMyContext();
  const router = useRouter();

  function handleSeila() {
    LoginApi.Seila().then((data) => console.log(data));
  }

  function handleLogout() {
    LoginApi.Logout().then(({ Message, Success }) => {
      if (Success) {
        window.localStorage.removeItem('login');
        setLogin(null);

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
      {login ? (
        <Fragment>
          <Button onClick={handleLogout}>deslogar</Button>
          <span>{login.Account.Id}</span>
          <Button onClick={handleSeila}>fazer outra req</Button>
        </Fragment>
      ) : (
        <Button onClick={() => router.push('/login')}>logar</Button>
      )}
    </Fragment>
  );
}
