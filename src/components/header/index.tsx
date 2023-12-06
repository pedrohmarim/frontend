import React from 'react';
import { FeatherIcons, Menu, Popover, Notification } from 'antd_components';
import * as S from './styles';
import LoginApi from 'services/Login';
import { useRouter } from 'next/router';
import { useMyContext } from 'Context';
import { MenuProps } from 'antd';

export default function Header() {
  const router = useRouter();
  const { login, setLogin } = useMyContext();

  function handleLogin() {
    router.push('/login');
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

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick?: () => void
  ): MenuItem {
    return {
      key,
      icon,
      label,
      onClick,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    !login
      ? getItem('Entrar', '1', <FeatherIcons icon="log-in" />, handleLogin)
      : getItem('Sair', '2', <FeatherIcons icon="log-out" />, handleLogout),
  ];

  const content = <Menu mode="inline" theme="dark" items={items} />;

  return (
    <S.Header>
      <span>afsaf</span>

      <Popover content={content}>
        <S.Avatar
          src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"
          size={40}
        />
      </Popover>
    </S.Header>
  );
}
