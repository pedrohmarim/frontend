import React, { useEffect, useState, useRef } from 'react';
import { IMember } from 'services/DiscordMessages/IDiscordMessagesService';
import Cookie from 'cookiejs';
import * as S from './styles';
import DiscordMessagesApi from 'services/DiscordMessages';
import { Image, Spin, Row, Col } from 'antd_components';
import { useRouter } from 'next/router';
import theme from 'globalStyles/theme';
import { GameTitle } from 'templates/game/components/ChoosedMessage/styles';
import dynamic from 'next/dynamic';
import { LoadingOutlined } from '@ant-design/icons';
import { Description } from 'templates/home/styles';
import { HomeSpan } from 'globalStyles/global';
import { Divider } from 'templates/game/components/Result/styles';
const ReactCodeInput = dynamic(import('react-code-input'));

export default function ChooseProfile() {
  const router = useRouter();
  const [members, setMembers] = useState<IMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [validToken, setValidToken] = useState<boolean>(true);
  const [loadingValidateToken, setLoadingValidateToken] =
    useState<boolean>(false);
  const [showTokenInput, setShowTokenInput] = useState<{
    view: boolean;
    userId: string;
    selectedItemIndex: number | null;
  }>({
    view: false,
    userId: '',
    selectedItemIndex: null,
  });

  useEffect(() => {
    function handleReset() {
      Cookie.remove('guildId');
      Cookie.remove('userId');
      Cookie.remove('channelId');
      router.push('/');
    }

    if (router.isReady) {
      const { guildId, channelId } = router.query;

      const userId = Cookie.get('userId');

      if (userId) {
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
            .catch(() => handleReset())
            .finally(() => setLoading(false));
        else handleReset();
      }
    }
  }, [router]);

  function handleSaveUser(token: string) {
    const { guildId, channelId } = router.query;

    if (token.length !== 5) {
      setValidToken(true);
      setLoadingValidateToken(false);
      return;
    }

    if (guildId) {
      setLoadingValidateToken(true);

      DiscordMessagesApi.ValidateToken(token, showTokenInput.userId)
        .then((validToken) => {
          if (!validToken) {
            setValidToken(validToken);
            return;
          }

          Cookie.set('userId', showTokenInput.userId);
          Cookie.set('guildId', guildId?.toString());
          Cookie.set('channelId', channelId?.toString());

          router.push({
            pathname: '/game',
            query: {
              channelId,
              guildId,
            },
          });
        })
        .finally(() => setLoadingValidateToken(false));
    }
  }

  const memberRowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (memberRowRef.current) {
      memberRowRef.current.style.cursor = 'grabbing';
      const startX = e.pageX - memberRowRef.current.offsetLeft;
      const scrollLeftStart = memberRowRef.current.scrollLeft;

      const handleMouseMove = (e: MouseEvent) => {
        if (memberRowRef.current) {
          const x = e.pageX - memberRowRef.current.offsetLeft;
          const scrollLeftDelta = (x - startX) * 2;
          memberRowRef.current.scrollLeft = scrollLeftStart - scrollLeftDelta;
        }
      };

      const handleMouseUp = () => {
        if (memberRowRef.current) {
          memberRowRef.current.style.cursor = 'grab';
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  return !loading ? (
    <>
      <GameTitle>Escolha seu Perfil</GameTitle>

      <S.MemberRow ref={memberRowRef} onMouseDown={handleMouseDown}>
        {members.map(({ avatarUrl, id, username }, index) => (
          <S.Card
            className={
              showTokenInput.selectedItemIndex === index
                ? 'active-item-row '
                : ''
            }
            key={index}
            onClick={() =>
              setShowTokenInput({
                view: true,
                userId: id,
                selectedItemIndex: index,
              })
            }
          >
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

      {showTokenInput.view && (
        <>
          <Divider />

          <Row justify="center" align="middle" gutter={[16, 16]}>
            <Col span={24}>
              <Description>
                Digite o comando <HomeSpan>/code</HomeSpan> no canal de texto
                <HomeSpan> #daily-discordle</HomeSpan>
              </Description>

              <Col span={24}>
                <Description>para recuperar seu token.</Description>
              </Col>
            </Col>

            <Col span={24}>
              <ReactCodeInput
                isValid={validToken}
                inputMode="numeric"
                name="code"
                onChange={handleSaveUser}
                fields={5}
              />
              {loadingValidateToken && <LoadingOutlined spin />}
            </Col>
          </Row>
        </>
      )}
    </>
  ) : (
    <Row justify="center">
      <Spin color={theme.colors.text} />
    </Row>
  );
}
