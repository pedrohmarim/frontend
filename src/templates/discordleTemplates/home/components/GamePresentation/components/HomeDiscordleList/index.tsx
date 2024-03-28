import React, { useState, useEffect } from 'react';
import * as S from './styles';
import * as I from './IHomeDiscordleList';
import { Row, Avatar, FeatherIcons, Input, Pagination } from 'antd_components';

export default function HomeDiscordlesList({ isMobile }: I.IHomeDiscordleList) {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () =>
      setWindowHeight(window.innerWidth < 875 ? window.innerHeight - 90 : 300);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const array = [
    {
      GuildName:
        'Servidor de Pedro MarimServidor de Pedro MarimServidor de Pedro MarimServidor de Pedro MarimServidor de Pedro MarimServidor de Pedro MarimServidor de Pedro MarimServidor de Pedro MarimServidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
    {
      GuildName: 'Servidor de Pedro Marim',
      Icon: 'https://cdn.discordapp.com/icons/1090337882268504067/91fa12354424c0721de76141e9abb897.jpg?size=2048',
    },
    {
      GuildName: 'Filminho',
      Icon: 'https://cdn.discordapp.com/icons/711047895159275640/2ea67fbeb8c060fbaa08528d8f181348.jpg?size=2048',
    },
  ];

  return (
    <S.Container marginTop={isMobile ? 0 : 30} windowHeight={windowHeight}>
      <Row justify="space-between" align="middle">
        {!isMobile ? (
          <S.TextContainer>
            <FeatherIcons icon="trending-up" />
            <S.ListTitle>Instâncias de Servidores Criados</S.ListTitle>
            <S.Quantity>({array.length})</S.Quantity>
          </S.TextContainer>
        ) : (
          <S.ListTitle>Instâncias de Servidores Criados</S.ListTitle>
        )}

        <S.InputContainer isMobile={isMobile}>
          <Input
            placeholder="Filtrar"
            suffix={<FeatherIcons icon="search" size={18} />}
          />
        </S.InputContainer>
      </Row>

      <S.ListContainer windowHeight={windowHeight}>
        <Row justify="start">
          {array.map(({ GuildName, Icon }, index) => (
            <S.GuildItem key={index} isMobile={isMobile}>
              <Avatar
                src={Icon}
                alt="image"
                style={{ height: '70px', width: 'auto' }}
              />

              <S.GuildName>
                {GuildName.length <= 50
                  ? GuildName
                  : GuildName.substring(0, 32) + '...'}
              </S.GuildName>
            </S.GuildItem>
          ))}
        </Row>
      </S.ListContainer>

      <S.PaginationContainer justify="center" align="middle">
        <Pagination simple defaultCurrent={2} total={array.length} />
      </S.PaginationContainer>
    </S.Container>
  );
}
