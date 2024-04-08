import React, { useEffect, useState, useRef, Fragment } from 'react';
import { IMember } from 'services/DiscordleService/IDiscordleService';
import * as S from './styles';
import DiscordMembersApi from 'services/DiscordleService/DiscordleMembers';
import { Image, Row, Col, Button } from 'antd_components';
import { useRouter } from 'next/router';
import { GameTitle } from 'templates/discordleTemplates/game/components/ChoosedMessage/styles';
import { HomeSpan, MessageContainer } from 'globalStyles/global';
import { Divider } from 'templates/discordleTemplates/game/components/Result/styles';
import ReactCodeInput from 'react-verification-code-input';
import theme from 'globalStyles/theme';
import { Description } from '../home/components/SelectChanneInstanceModal/styles';

export default function ChooseProfile() {
  const [windowWidth, setWindowWidth] = useState(1920);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const router = useRouter();
  const [members, setMembers] = useState<IMember[]>([]);
  const [channelName, setChannelName] = useState<string>('');
  const [validToken, setValidToken] = useState<boolean>(true);
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
    if (router.isReady) {
      const { channelId, code } = router.query;

      if (channelId && code) {
        DiscordMembersApi.GetChannelMembers(
          channelId.toString(),
          code.toString()
        ).then(({ ChannelName, Members }) => {
          setMembers(Members);
          setChannelName(ChannelName);
        });
      }
    }
  }, [router]);

  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);

  const secondsToAwait = 5;

  const startTimer = () => {
    setSecondsRemaining(secondsToAwait);
    let remainingTime = secondsToAwait;

    const timer = setInterval(() => {
      remainingTime -= 1;
      setSecondsRemaining(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timer);
        setSecondsRemaining(null);
      }
    }, 1000);
  };

  const debounce = (func: (token: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;

    return (token: string) => {
      if (secondsRemaining === null) {
        startTimer();
        func(token);
      } else {
        clearInterval(timeoutId);
        timeoutId = setTimeout(() => {
          func(token);
        }, delay * 1000);
      }
    };
  };

  const debouncedHandleSaveUser = debounce((token: string) => {
    const { channelId, guildId, code, backRoute } = router.query;

    if (channelId && guildId && code) {
      DiscordMembersApi.ValidateToken(
        token,
        showTokenInput.userId,
        channelId.toString()
      )
        .then((accessToken: string) => {
          const isValid = Boolean(accessToken.length);

          setValidToken(isValid);

          if (!isValid) return;

          window.localStorage.setItem('discordleToken', accessToken);

          if (backRoute) window.location.href = backRoute.toString();
          else
            router.push({
              pathname: '/discordle/game',
              query: {
                channelId,
                guildId,
                code,
              },
            });
        })
        .catch(() => setValidToken(false));
    }
  }, secondsToAwait);

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

  if (!members.length)
    return (
      <MessageContainer>
        <Description>Não há membros á serem exibidos</Description>

        <Col>
          <Description>
            Parâmetro ID do canal/código da sala inválidos ou inexistentes
          </Description>
        </Col>

        <Row justify="center">
          <Button
            margin="20px 0 0 0"
            width={200}
            backgroundcolor={theme.discordleColors.primary}
            color={theme.discordleColors.text}
            onClick={() => router.back()}
          >
            Voltar
          </Button>
        </Row>
      </MessageContainer>
    );

  return (
    <MessageContainer width={windowWidth > 1200 ? '100%' : ''} margin="auto">
      <Row justify="center">
        <GameTitle margin="0 0 15px 0">
          Escolha seu perfil para acessar <br /> #{channelName}
        </GameTitle>
      </Row>

      <S.MemberRow ref={memberRowRef} onMouseDown={handleMouseDown}>
        {members.map(({ AvatarUrl, Id, Username }, index) => (
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
                userId: Id,
                selectedItemIndex: index,
              })
            }
          >
            <Image
              alt="avatarUrl"
              src={AvatarUrl}
              preview={false}
              width={130}
            />
            <S.Username>{Username}</S.Username>
          </S.Card>
        ))}
      </S.MemberRow>

      {showTokenInput.view && (
        <Fragment>
          <Divider />

          <Row justify="center" align="middle" gutter={[16, 16]}>
            <Col span={24}>
              <Description fontSize="12pt">
                Digite o comando <HomeSpan>/code</HomeSpan> no canal de texto
                <HomeSpan> #{channelName}</HomeSpan>
                <br />
                para gerar seu token.
              </Description>
            </Col>

            <Row justify="center">
              <Col span={24}>
                <ReactCodeInput
                  onChange={() => setValidToken(true)}
                  disabled={secondsRemaining != null}
                  className="codeInput"
                  onComplete={debouncedHandleSaveUser}
                  fields={5}
                />

                {!validToken && <S.InvalidText>Codigo Inválido!</S.InvalidText>}

                {secondsRemaining && (
                  <Row justify="center">
                    <S.TimerText>
                      Tente novamente em <HomeSpan>{secondsRemaining}</HomeSpan>
                    </S.TimerText>
                  </Row>
                )}
              </Col>
            </Row>
          </Row>
        </Fragment>
      )}
    </MessageContainer>
  );
}
