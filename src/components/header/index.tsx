import React from 'react';
import * as S from './styles';
import LoginApi from 'services/Login';
import { useRouter } from 'next/router';
import { useMyContext } from 'Context';
import { MenuProps } from 'antd';
import theme from 'globalStyles/theme';
import {
  FeatherIcons,
  Menu,
  Notification,
  Button,
  Popover,
} from 'antd_components';
import { deleteUser } from 'utils/localStorage/User';

export default function Header() {
  const router = useRouter();
  const { login, setLogin } = useMyContext();

  function handleLogin() {
    router.push('/login');
  }

  function handleLogout() {
    LoginApi.Logout().then(({ Message, Success }) => {
      if (Success) {
        deleteUser();
        setLogin(null);

        return Notification.success(Message);
      }

      return Notification.error(Message);
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
    getItem('Sair', '1', <FeatherIcons icon="log-out" />, handleLogout),
  ];

  const content = <Menu mode="inline" theme="dark" items={items} />;

  return (
    <S.Header>
      <span>Seila123</span>

      {login ? (
        <Popover content={content}>
          <S.Avatar
            src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"
            size={40}
          />
        </Popover>
      ) : (
        <Button
          color={theme.colors.background}
          backgroundcolor={theme.colors.textSecondary}
          width="auto"
          onClick={handleLogin}
          icon={<FeatherIcons icon="user" />}
        >
          Entrar
        </Button>
      )}
    </S.Header>
  );
}
