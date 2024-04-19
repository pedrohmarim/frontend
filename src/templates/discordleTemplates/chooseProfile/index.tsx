import React, {
  useEffect,
  useState,
  useRef,
  Fragment,
  useCallback,
} from 'react';
import { IMember } from 'services/DiscordleService/IDiscordleService';
import * as S from './styles';
import DiscordMembersApi from 'services/DiscordleService/DiscordleMembers';
import { useRouter } from 'next/router';
import { GameTitle } from 'templates/discordleTemplates/game/components/ChoosedMessage/styles';
import { HomeSpan, MessageContainer } from 'globalStyles/global';
import { Divider } from 'templates/discordleTemplates/game/components/Result/styles';
import ReactCodeInput from 'react-verification-code-input';
import theme from 'globalStyles/theme';
import { Description } from '../home/components/SelectChanneInstanceModal/styles';
import GuildInfo from '../globalComponents/guildInfo';
import { useMyContext } from 'Context';
import { deleteDiscordleToken } from 'utils/localStorage/User';
import DebouncedTextInput from '../globalComponents/deboucedTextInput';
import {
  Container,
  InputContainer,
} from 'templates/discordleTemplates/home/components/HomeDiscordleList/styles';
import {
  Image,
  Row,
  Col,
  Button,
  FeatherIcons,
  Skeleton,
} from 'antd_components';

export default function ChooseProfile() {
  const router = useRouter();
  const { windowWidth, serverInfos } = useMyContext();
  const isMobile = windowWidth <= 875;
  const [members, setMembers] = useState<IMember[]>([]);
  const [validToken, setValidToken] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [showTokenInput, setShowTokenInput] = useState<{
    view: boolean;
    userId: string;
    selectedItemIndex: number | null;
  }>({
    view: false,
    userId: '',
    selectedItemIndex: null,
  });

  function getMembers() {
    setLoading(true);

    if (router.isReady) {
      const { channelId, code } = router.query;

      if (channelId && code) {
        DiscordMembersApi.GetChannelMembers(
          channelId.toString(),
          code.toString()
        ).then((members) => setMembers(members));
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    getMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    deleteDiscordleToken();

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
                guildId,
                channelId,
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
      if (members.length) memberRowRef.current.style.cursor = 'grabbing';
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
          if (members.length) memberRowRef.current.style.cursor = 'grab';
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleDebounce = useCallback(
    async (searchValue: string) => {
      setShowTokenInput({
        view: false,
        userId: '',
        selectedItemIndex: null,
      });

      if (searchValue.length) {
        const { channelId, code } = router.query;

        if (channelId && code) {
          setLoading(true);

          DiscordMembersApi.GetChannelMemberBySearchValue(
            searchValue,
            channelId.toString(),
            code.toString()
          ).then((members) => {
            setLoading(false);
            setMembers(members);
          });
        }
      } else getMembers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router]
  );

  if (
    router.isReady &&
    (!router.query.code || !router.query.channelId || !router.query.guildId)
  )
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
    <Container margin="25px" maxHeight="100%" padding="20px">
      <GuildInfo />

      <S.Row justify="space-between">
        <Row justify="center" align="middle">
          <GameTitle margin="0 6px 0 0">
            Escolha seu perfil para começar a jogar
          </GameTitle>
        </Row>

        <InputContainer ismobile={isMobile}>
          <DebouncedTextInput
            handleDebounce={handleDebounce}
            placeholder="Filtrar"
            suffix={<FeatherIcons icon="search" size={18} />}
            size="middle"
          />
        </InputContainer>
      </S.Row>

      <MessageContainer maxWidth="100%" margin="10px 0 0 0">
        <S.MemberRow
          onlyOneMember={members.length === 1}
          ref={memberRowRef}
          onMouseDown={handleMouseDown}
          showSkeleton={loading}
          empty={members.length === 0}
        >
          <Skeleton loading={loading} active={loading}>
            {members.length ? (
              members.map(({ AvatarUrl, Id, Username }, index) => (
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
                    style={{ borderRadius: '4px' }}
                  />

                  <S.Username>{Username}</S.Username>
                </S.Card>
              ))
            ) : (
              <S.Empty>Nenhum resultado encontrado.</S.Empty>
            )}
          </Skeleton>
        </S.MemberRow>

        {members.length > 0 && showTokenInput.view && (
          <Fragment>
            <Divider />

            <Row justify="center" align="middle" gutter={[16, 16]}>
              <Col span={24}>
                <Description fontSize="12pt">
                  Digite o comando <HomeSpan>/code</HomeSpan> no canal de texto
                  #{serverInfos.ServerName.split('#')[1]}
                  <br /> <br />
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

                  {!validToken && (
                    <S.InvalidText>Codigo Inválido!</S.InvalidText>
                  )}

                  {secondsRemaining && (
                    <Row justify="center">
                      <S.TimerText>
                        Tente novamente em{' '}
                        <HomeSpan>{secondsRemaining}</HomeSpan>
                      </S.TimerText>
                    </Row>
                  )}
                </Col>
              </Row>
            </Row>
          </Fragment>
        )}
      </MessageContainer>
    </Container>
  );
}
