import React from 'react';
import * as S from './styles';
import * as I from './IHomeDiscordleList';
import { Row, Avatar } from 'antd_components';

export default function HomeDiscordlesList({ isMobile }: I.IHomeDiscordleList) {
  const array = [
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
    <S.Container marginTop={isMobile ? 30 : 0}>
      <Row justify="center" align="middle">
        <S.ListTitle>Instâncias de Servidores Criados</S.ListTitle>
      </Row>

      <S.ListContainer>
        {array.map(({ GuildName, Icon }, index) => (
          <Row key={index}>
            <S.GuildItem>
              <Avatar
                src={Icon}
                alt="image"
                style={{ height: 60, width: 60 }}
              />
              <S.GuildName>{GuildName}</S.GuildName>
            </S.GuildItem>
          </Row>
        ))}
      </S.ListContainer>
    </S.Container>
  );
}
