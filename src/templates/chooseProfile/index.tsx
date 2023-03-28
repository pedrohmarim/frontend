import React, { useEffect, useState } from 'react';
import { IMember } from 'services/DiscordMessages/IDiscordMessagesService';
import Cookie from 'cookiejs';
import * as S from './styles';
import DiscordMessagesApi from 'services/DiscordMessages';
import { ColumnContainer } from 'templates/game/styles';
import { Image, Row, Spin } from 'antd_components';
import { useRouter } from 'next/router';
import {
  GameTitle,
  MessageContainer,
} from 'templates/game/components/ChoosedMessage/styles';
import theme from 'globalStyles/theme';

export default function ChooseProfile() {
  const router = useRouter();
  const [members, setMembers] = useState<IMember[]>([]);

  useEffect(() => {
    const channelId = Cookie.get('channelId');
    const guildId = Cookie.get('guildId');

    if (channelId && guildId)
      DiscordMessagesApi.GetChannelMembers(
        channelId.toString(),
        guildId.toString()
      ).then((members) => setMembers(members));
    else router.push('/home');
  }, [router]);

  function handleSaveUser(userId: string) {
    Cookie.set('userId', userId);
    router.push('/game');
  }

  return members.length ? (
    <ColumnContainer>
      <MessageContainer>
        <GameTitle>Escolha seu Perfil</GameTitle>

        <Row justify="center">
          {members.map(({ avatarUrl, id, username }) => (
            <S.Card key={id} onClick={() => handleSaveUser(id)}>
              <Image
                alt="avatarUrl"
                src={avatarUrl}
                preview={false}
                width={130}
              />
              <S.Username>{username}</S.Username>
            </S.Card>
          ))}
        </Row>
      </MessageContainer>
    </ColumnContainer>
  ) : (
    <Spin color={theme.colors.text} spinText="Carregando..." />
  );
}
