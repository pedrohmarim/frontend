import React, {
  useEffect,
  useState,
  useRef,
  Fragment,
  useCallback,
} from 'react';
import { IMember } from 'services/DiscordleService/IDiscordleService';
import * as S from './styles';
import * as G from 'globalStyles/global';
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
import { deleteDiscordleToken, getItem } from 'utils/localStorage/User';
import DebouncedTextInput from '../globalComponents/deboucedTextInput';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
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
  const { i18n, t } = useTranslation('ChooseProfile');
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

  const [languageLoaded, setLanguageLoaded] = useState(false);

  useEffect(() => {
    const result = getItem('i18nextLng');
    if (result) i18n.changeLanguage(result).then(() => setLanguageLoaded(true));
    else setLanguageLoaded(true);
  }, [i18n]);

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

  if (!languageLoaded) return null;

  if (
    router.isReady &&
    (!router.query.code || !router.query.channelId || !router.query.guildId)
  )
    return (
      <Fragment>
        <Head>
          <title>Discordle | {t('tabTitle')}</title>
        </Head>

        <MessageContainer>
          <Description>{t('noMembers')}</Description>

          <Col>
            <Description>{t('description')}</Description>
          </Col>

          <Row justify="center">
            <Button
              margin="20px 0 0 0"
              width={200}
              backgroundcolor={theme.discordleColors.primary}
              color={theme.discordleColors.text}
              onClick={() => router.back()}
            >
              {t('back')}
            </Button>
          </Row>
        </MessageContainer>
      </Fragment>
    );

  return (
    <Fragment>
      <Head>
        <title>Discordle | {t('tabTitle')}</title>
      </Head>
      <Container margin="25px" maxHeight="100%" padding="20px">
        <GuildInfo />

        <S.Row justify="space-between">
          <Row justify="center" align="middle">
            <GameTitle margin="0 6px 0 0">{t('gameTitle')}</GameTitle>
          </Row>

          <InputContainer ismobile={isMobile}>
            <DebouncedTextInput
              handleDebounce={handleDebounce}
              placeholder={t('filterPlaceholder')}
              suffix={<FeatherIcons icon="search" size={18} />}
              size="middle"
            />
          </InputContainer>
        </S.Row>

        <Fragment>
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
                <S.Empty>{t('noResultFound')}</S.Empty>
              )}
            </Skeleton>
          </S.MemberRow>

          {members.length > 0 && showTokenInput.view && (
            <Fragment>
              <Divider />

              <Row justify="center" align="middle">
                <Description fontSize="12pt" margin="0 0 15px 0">
                  {i18n.language === 'pt-BR' ? (
                    <>
                      Digite o comando <G.HomeSpan>/code</G.HomeSpan> no canal
                      de texto #{serverInfos.ServerName.split('#')[1]} <br />
                      <br />
                      para gerar seu token.
                    </>
                  ) : (
                    <>
                      Type the <G.HomeSpan>/code</G.HomeSpan> command in the #
                      {serverInfos.ServerName.split('#')[1]} <br /> <br /> text
                      channel to generate your token.
                    </>
                  )}
                </Description>
              </Row>

              <Row justify="center">
                <ReactCodeInput
                  onChange={() => setValidToken(true)}
                  disabled={secondsRemaining != null}
                  className="codeInput"
                  onComplete={debouncedHandleSaveUser}
                  fields={5}
                />
              </Row>

              <Row justify="center">
                {!validToken && (
                  <S.InvalidText>{t('invalidCode')}</S.InvalidText>
                )}

                {secondsRemaining && (
                  <S.TimerText>
                    {t('tryAgain')} <HomeSpan>{secondsRemaining}</HomeSpan>
                  </S.TimerText>
                )}
              </Row>
            </Fragment>
          )}
        </Fragment>
      </Container>
    </Fragment>
  );
}
