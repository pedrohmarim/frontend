import React, { Fragment, useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import * as G from 'globalStyles/global';
import * as I from './IHomeDiscordleList';
import DiscordGuildApi from 'services/DiscordleService/DiscordleGuilds';
import InfiniteScroll from 'react-infinite-scroll-component';
import Animation from 'assets/homeAnimation.json';
import SelectChanneInstanceModal from '../SelectChanneInstanceModal';
import { Row, Avatar, FeatherIcons, Col } from 'antd_components';
import { useRouter } from 'next/router';
import DiscordGuildsApi from 'services/DiscordleService/DiscordleGuilds';
import DebouncedTextInput from 'templates/discordleTemplates/globalComponents/deboucedTextInput';
import {
  IGuildsDto,
  IInstanceChannels,
} from 'services/DiscordleService/IDiscordleService';

export default function HomeDiscordleList({
  width,
  botButton,
}: I.IHomeDiscordleList) {
  const router = useRouter();
  const isMobile = width < 875;
  const pageSize = 18;
  const [totalGuilds, setTotalGuilds] = useState<number>(0);
  const [guilds, setGuilds] = useState<IGuildsDto[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [noMoreDataToFetch, setNoMoreDataToFetch] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedGuildId, setSelectedGuildId] = useState<string | null>(null);
  const [selectedGuildName, setSelectedGuildName] = useState<string | null>(
    null
  );
  const [instanceChannels, setInstanceChannels] = useState<IInstanceChannels[]>(
    []
  );

  const GetGuilds = useCallback(() => {
    if (noMoreDataToFetch) return;

    DiscordGuildApi.GetGuilds(pageSize, pageNumber).then(
      ({ Guilds, Count }) => {
        setGuilds((prevGuilds) => [...prevGuilds, ...Guilds]);

        setTotalGuilds(Count);

        if (!noMoreDataToFetch) setPageNumber(pageNumber + 1);

        setNoMoreDataToFetch(Guilds.length < 10);
      }
    );
  }, [pageNumber, pageSize, noMoreDataToFetch]);

  const handleDebounce = useCallback(async (searchValue: string) => {
    if (searchValue.length)
      DiscordGuildApi.SearchGuildsByValue(searchValue).then((guilds) =>
        setGuilds(guilds)
      );
    else {
      setGuilds([]);
      GetGuilds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    GetGuilds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFormatLabel() {
    if (totalGuilds === 0) return 'Nenhum servidor registrado.';

    if (totalGuilds === 1)
      return (
        <>
          <S.PrimaryTextColor>{totalGuilds}</S.PrimaryTextColor>
          servidor registrado.
        </>
      );

    return (
      <>
        <S.PrimaryTextColor>{totalGuilds}</S.PrimaryTextColor>
        servidores registrados.
      </>
    );
  }

  useEffect(() => {
    if (router.isReady) {
      const { guild_id } = router.query;

      if (guild_id) {
        DiscordGuildsApi.GetGuildById(guild_id.toString(), false).then(
          (channels) => {
            setSelectedGuildId(guild_id.toString());
            setInstanceChannels(channels);
            setOpen(!open);
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <Fragment>
      {selectedGuildId && (
        <SelectChanneInstanceModal
          instanceChannels={instanceChannels}
          setInstanceChannels={setInstanceChannels}
          open={open}
          selectedGuildName={selectedGuildName}
          guildId={selectedGuildId}
          onClose={() => {
            setInstanceChannels([] as IInstanceChannels[]);
            setSelectedGuildId(null);
            setOpen(!open);
            router.push({ query: '' });
          }}
        />
      )}

      <S.AnimationContainer>
        <S.ApresentationContainer isMobile={isMobile}>
          <S.Title justify="end">
            Bem-vindo ao
            <G.HomeSpan margin="0 0 0 10px">Discordle</G.HomeSpan>
          </S.Title>

          <S.Description
            width={isMobile ? '100%' : '45%'}
            justify="end"
            fontSize="16pt"
          >
            Teste suas habilidades ao tentar identificar quem escreveu uma das
            cinco frases aleatórias geradas diariamente a partir de um canal de
            texto de seu servidor do Discord e desafie seus amigos na disputa
            pelo topo do ranking!
          </S.Description>

          {botButton()}

          <S.Description
            width={isMobile ? '100%' : '45%'}
            justify="end"
            fontSize="11pt"
            fontStyle="italic"
          >
            *Certifique-se de entrar com a conta que possui o cargo de dono do
            servidor
          </S.Description>
        </S.ApresentationContainer>

        {!isMobile && (
          <S.StyledLottie animationData={Animation} loop autoplay />
        )}

        <S.Container
          margin={`${!isMobile ? '-25%' : '42px'} 25px 0 25px`}
          maxHeight="100vh"
          padding="20px"
        >
          <Row justify="space-between" align="middle">
            {!isMobile ? (
              <S.EmptyContainer>
                <FeatherIcons icon="trending-up" />
                <S.ListTitle>Discordles Criados</S.ListTitle>
              </S.EmptyContainer>
            ) : (
              <S.ListTitle>Discordles Criados</S.ListTitle>
            )}

            <S.InputContainer ismobile={isMobile}>
              <DebouncedTextInput
                size="middle"
                suffix={<FeatherIcons icon="search" size={18} />}
                placeholder="Filtrar"
                handleDebounce={handleDebounce}
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
                style={{ padding: isMobile ? '2%' : '10px' }}
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
                            {GuildName.length <= (!isMobile ? 50 : 90)
                              ? GuildName
                              : GuildName.substring(0, !isMobile ? 50 : 90) +
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
            {handleFormatLabel()}
          </S.PaginationContainer>
        </S.Container>
      </S.AnimationContainer>
    </Fragment>
  );
}
