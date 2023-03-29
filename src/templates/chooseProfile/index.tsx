import React, { useEffect, useState } from 'react';
import { IMember } from 'services/DiscordMessages/IDiscordMessagesService';
import Cookie from 'cookiejs';
import * as S from './styles';
import DiscordMessagesApi from 'services/DiscordMessages';
import { ColumnContainer } from 'templates/game/styles';
import { Image, Spin } from 'antd_components';
import { useRouter } from 'next/router';
import theme from 'globalStyles/theme';
import {
  GameTitle,
  MessageContainer,
} from 'templates/game/components/ChoosedMessage/styles';

export default function ChooseProfile() {
  const router = useRouter();
  const [members, setMembers] = useState<IMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (router.isReady) {
      const { guildId, channelId } = router.query;

      const userId = Cookie.get('userId');

      if (Boolean(userId)) {
        router.push({
          pathname: '/game',
          query: {
            channelId,
            guildId,
          },
        });
      } else {
        if (guildId && channelId)
          DiscordMessagesApi.GetChannelMembers(
            channelId.toString(),
            guildId.toString()
          )
            .then((members) => setMembers(members))
            .catch(() => router.push('/'))
            .finally(() => setLoading(false));
        else router.push('/');
      }
    }
  }, [router]);

  function handleSaveUser(userId: string) {
    const { guildId, channelId } = router.query;

    Cookie.set('userId', userId);

    router.push({
      pathname: '/game',
      query: {
        channelId,
        guildId,
      },
    });
  }

  return !loading ? (
    <ColumnContainer>
      <MessageContainer>
        <GameTitle>Escolha seu Perfil</GameTitle>

        <S.MemberRow className="parent">
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
        </S.MemberRow>
      </MessageContainer>
    </ColumnContainer>
  ) : (
    <Spin color={theme.colors.text} spinText="Carregando..." />
  );
}
