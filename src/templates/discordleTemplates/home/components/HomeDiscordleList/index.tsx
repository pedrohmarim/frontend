import React, { Fragment, useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import * as G from 'globalStyles/global';
import * as I from './IHomeDiscordleList';
import DiscordGuildApi from 'services/DiscordleService/DiscordleGuilds';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IGuildsDto } from 'services/DiscordleService/IDiscordleService';
import Animation from 'assets/homeAnimation.json';
import theme from 'globalStyles/theme';
import SelectChanneInstanceModal from '../SelectChanneInstanceModal';
import { Row, Avatar, FeatherIcons, Input, Col, Button } from 'antd_components';

export default function HomeDiscordleList({ width }: I.IHomeDiscordleList) {
  const isDesktop = width > 875;
  const pageSize = 18;
  const [totalGuilds, setTotalGuilds] = useState<number>(0);
  const [guilds, setGuilds] = useState<IGuildsDto[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [noMoreDataToFetch, setNoMoreDataToFetch] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedGuildName, setSelectedGuildName] = useState('');
  const [selectedGuildId, setSelectedGuildId] = useState('');

  function onClick() {
    const clientIdBot = '1089918362311733378';
    const permissions = '8'; //'75824';

    const redirectUri = encodeURIComponent(window.location.href);

    const responseType = 'code';
    const url = `https://discord.com/api/oauth2/authorize?client_id=${clientIdBot}&permissions=${permissions}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=connections%20bot`;

    window.open(url);
  }

  const GetGuilds = useCallback(() => {
    if (noMoreDataToFetch) return;

    DiscordGuildApi.GetGuilds(pageSize, pageNumber).then(
      ({ Guilds, Count }) => {
        setGuilds((prevGuilds) =>
          [...prevGuilds, ...Guilds].length === Count
            ? [...prevGuilds, ...Guilds]
            : Guilds
        );

        setTotalGuilds(Count);

        if (!noMoreDataToFetch) setPageNumber(pageNumber + 1);

        setNoMoreDataToFetch(Guilds.length < 10);
      }
    );
  }, [pageNumber, pageSize, noMoreDataToFetch]);

  const handleDebouncedSearch = useCallback(async (searchValue: string) => {
    if (searchValue.length)
      DiscordGuildApi.SearchGuildsByValue(searchValue).then((guilds) =>
        setGuilds(guilds)
      );
    else GetGuilds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounce = useCallback(
    (func: (value: string) => void, delay: number) => {
      let timerId: NodeJS.Timeout;

      return function (value: string) {
        if (timerId) clearTimeout(timerId);

        timerId = setTimeout(() => {
          func(value);
        }, delay);
      };
    },
    []
  );

  const debouncedFilter = debounce(handleDebouncedSearch, 1000);

  function filter(searchValue: string) {
    debouncedFilter(searchValue);
  }

  useEffect(() => {
    GetGuilds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFormatLabel() {
    if (totalGuilds === 0) return 'Nenhum servidor registrado.';

    if (totalGuilds === 1) return 'servidor registrado.';

    return 'servidores registrados.';
  }

  return (
    <Fragment>
      <SelectChanneInstanceModal
        open={open}
        setOpen={setOpen}
        title={`Instâncias de ${selectedGuildName}`}
        guildId={selectedGuildId}
      />

      <S.AnimationContainer>
        <S.ApresentationContainer isDesktop={isDesktop}>
          <S.Title justify="end">
            Bem-vindo ao{' '}
            <G.HomeSpan margin={isDesktop ? '0 0 0 10px' : ''}>
              Discordle
            </G.HomeSpan>
          </S.Title>

          <S.Description isMobile={!isDesktop} justify="end">
            Teste suas habilidades ao tentar identificar quem escreveu uma das
            cinco frases aleatórias geradas a partir de um canal de texto de seu
            servidor do Discord e desafie seus amigos na disputa pelo topo do
            ranking!
          </S.Description>

          <Row>
            <Button
              width={180}
              height={35}
              onClick={onClick}
              margin="20px 0 0 0"
              backgroundcolor={theme.discordleColors.primary}
              color={theme.discordleColors.text}
            >
              Convidar Bot
            </Button>
          </Row>
        </S.ApresentationContainer>

        {isDesktop && (
          <S.StyledLottie animationData={Animation} loop autoplay />
        )}

        <S.Container isMobile={!isDesktop}>
          <Row justify="space-between" align="middle">
            {isDesktop ? (
              <S.EmptyContainer>
                <FeatherIcons icon="trending-up" />
                <S.ListTitle>Discordles Criados</S.ListTitle>
              </S.EmptyContainer>
            ) : (
              <S.ListTitle>Discordles Criados</S.ListTitle>
            )}

            <S.InputContainer isMobile={!isDesktop}>
              <Input
                onChange={(event) => filter(event.target.value)}
                placeholder="Filtrar"
                suffix={<FeatherIcons icon="search" size={18} />}
              />
            </S.InputContainer>
          </Row>

          <S.ListContainer id="container">
            <InfiniteScroll
              dataLength={guilds.length}
              next={GetGuilds}
              hasMore
              loader={<Fragment />}
              scrollableTarget="container"
            >
              <Row
                style={{ padding: !isDesktop ? '2%' : '10px' }}
                justify={guilds.length ? 'start' : 'center'}
              >
                {guilds.length ? (
                  guilds.map(({ GuildName, Icon, GuildId }, index) => (
                    <Col
                      key={index}
                      xs={24}
                      sm={12}
                      md={8}
                      lg={8}
                      xl={6}
                      xxl={4}
                    >
                      <S.GuildItem
                        onClick={() => {
                          setOpen(!open);
                          setSelectedGuildName(GuildName);
                          setSelectedGuildId(GuildId);
                        }}
                      >
                        <S.GuildItemBackgroundImage icon={Icon} />

                        <S.InfoContainer>
                          <Avatar
                            src={Icon}
                            alt="image"
                            style={{
                              height: '130px',
                              width: 'auto',
                              marginBottom: '10px',
                            }}
                          />
                          <S.GuildName>
                            {GuildName.length <= (!isDesktop ? 50 : 90)
                              ? GuildName
                              : GuildName.substring(0, !isDesktop ? 50 : 90) +
                                '...'}
                          </S.GuildName>
                          <S.SpanEnterRoom>Clique para entrar</S.SpanEnterRoom>
                        </S.InfoContainer>
                      </S.GuildItem>
                    </Col>
                  ))
                ) : (
                  <>Nenhum discordle encontrado.</>
                )}
              </Row>
            </InfiniteScroll>
          </S.ListContainer>

          <S.PaginationContainer justify="center" align="middle">
            <S.PrimaryTextColor>{totalGuilds}</S.PrimaryTextColor>

            {handleFormatLabel()}
          </S.PaginationContainer>
        </S.Container>
      </S.AnimationContainer>
    </Fragment>
  );
}
