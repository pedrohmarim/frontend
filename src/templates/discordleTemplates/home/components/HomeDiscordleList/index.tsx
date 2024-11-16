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
import DebouncedTextInput from 'templates/discordleTemplates/globalComponents/deboucedTextInput';
import { IGuildsDto } from 'services/DiscordleService/IDiscordleService';
import DiscordGuildsApi from 'services/DiscordleService/DiscordleGuilds';
import { useMyContext } from 'Context';
import { useTranslation } from 'react-i18next';
import { GetWebSocketMessage } from 'utils/websocket';

export default function HomeDiscordleList({
  width,
  botButton,
}: I.IHomeDiscordleList) {
  const router = useRouter();
  const webSocketMessage = GetWebSocketMessage();
  const { t } = useTranslation('Home');
  const { setInstanceChannels } = useMyContext();
  const isMobile = width < 875;
  const pageSize = 18;
  const [totalGuilds, setTotalGuilds] = useState<number>(0);
  const [guilds, setGuilds] = useState<IGuildsDto[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [noMoreDataToFetch, setNoMoreDataToFetch] = useState<boolean>(false);
  const [selectedGuildId, setSelectedGuildId] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedGuildName, setSelectedGuildName] = useState<string | null>(
    null
  );

  const GetGuildsInfiniteScroll = useCallback(() => {
    if (noMoreDataToFetch) return;

    DiscordGuildApi.GetGuildsPaginated(pageSize, pageNumber).then(
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
      GetGuildsInfiniteScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    GetGuildsInfiniteScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!webSocketMessage) return;

    if (webSocketMessage.ReloadHomeGuildList) {
      DiscordGuildApi.GetAllGuilds().then(({ Guilds, Count }) => {
        setGuilds((prevGuilds) => {
          const newGuilds = Guilds.filter(
            (newGuild) =>
              !prevGuilds.some(
                (existingGuild) => existingGuild.GuildId === newGuild.GuildId
              )
          );

          const removedGuilds = prevGuilds.filter(
            (existingGuild) =>
              !Guilds.some(
                (newGuild) => newGuild.GuildId === existingGuild.GuildId
              )
          );

          const updatedNewGuilds = newGuilds.map((guild) => ({
            ...guild,
            isNew: true,
          }));

          const updatedGuilds = prevGuilds.filter(
            (guild) =>
              !removedGuilds.some(
                (removed) => removed.GuildId === guild.GuildId
              )
          );

          return [...updatedGuilds, ...updatedNewGuilds];
        });

        setTotalGuilds(Count);
      });
    }
  }, [webSocketMessage]);

  function handleFormatLabel() {
    if (totalGuilds === 0) return t('emptyGuildList');

    if (totalGuilds === 1)
      return (
        <Fragment>
          <S.PrimaryTextColor>{totalGuilds}</S.PrimaryTextColor>
          {t('totalCreatedDiscordlesSingular')}
        </Fragment>
      );

    return (
      <Fragment>
        <S.PrimaryTextColor>{totalGuilds}</S.PrimaryTextColor>
        {t('totalCreatedDiscordles')}
      </Fragment>
    );
  }

  function getGuildChannels(
    guildId: string,
    getChannelsWithoutDiscordleInstance: boolean
  ) {
    DiscordGuildsApi.GetGuildChannels(
      guildId,
      getChannelsWithoutDiscordleInstance
    ).then((channels) => {
      setInstanceChannels(channels);
      setOpen(!open);
    });
  }

  useEffect(() => {
    if (router.isReady) {
      const { guild_id } = router.query;

      if (guild_id) {
        setSelectedGuildId(guild_id.toString());
        getGuildChannels(guild_id.toString(), true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  function onClose() {
    setSelectedGuildName(null);
    setOpen(!open);
    router.push({ query: '' });
  }

  const GuildCard = ({ GuildId, GuildName, Icon, isNew }: IGuildsDto) => (
    <Col
      xs={24}
      sm={12}
      md={8}
      lg={8}
      xl={6}
      xxl={4}
      className={isNew ? 'is-new' : ''}
    >
      {isNew && <S.IsNew>{t('new')}</S.IsNew>}

      <S.GuildItem
        onClick={() => {
          setSelectedGuildName(GuildName);
          setSelectedGuildId(GuildId);
          getGuildChannels(GuildId, false);
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
              : GuildName.substring(0, !isMobile ? 50 : 90) + '...'}
          </S.GuildName>

          <S.SpanEnterRoom>{t('hoverGuildItem')}</S.SpanEnterRoom>
        </S.InfoContainer>
      </S.GuildItem>
    </Col>
  );

  return (
    <Fragment>
      {selectedGuildId && (
        <SelectChanneInstanceModal
          open={open}
          selectedGuildName={selectedGuildName}
          guildId={selectedGuildId}
          onClose={onClose}
        />
      )}

      <S.AnimationContainer>
        <S.ApresentationContainer isMobile={isMobile}>
          <S.Title justify="end">
            {t('presentationFirstMessage')}
            <G.HomeSpan margin="0 0 0 10px">Discordle</G.HomeSpan>
          </S.Title>

          <S.Description
            width={isMobile ? '100%' : '45%'}
            justify="end"
            fontSize="16pt"
          >
            {t('presentationSecondMessage')}
          </S.Description>

          {botButton()}

          <S.Description
            width={isMobile ? '100%' : '45%'}
            justify="end"
            fontSize="11pt"
            fontStyle="italic"
          >
            {t('italicSpan')}
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
                <S.ListTitle>{t('titleDiscordleLists')}</S.ListTitle>
              </S.EmptyContainer>
            ) : (
              <S.ListTitle>{t('titleDiscordleLists')}</S.ListTitle>
            )}

            <S.InputContainer ismobile={isMobile}>
              <DebouncedTextInput
                size="middle"
                suffix={<FeatherIcons icon="search" size={18} />}
                placeholder={t('filterPlaceholder')}
                handleDebounce={handleDebounce}
              />
            </S.InputContainer>
          </Row>

          <S.ListContainer id="container" emptyList={guilds.length === 0}>
            <InfiniteScroll
              dataLength={guilds.length}
              next={GetGuildsInfiniteScroll}
              hasMore
              loader={<Fragment />}
              scrollableTarget="container"
            >
              <Row
                style={{ padding: isMobile ? '2%' : '10px' }}
                justify={guilds.length ? 'start' : 'center'}
                align="middle"
              >
                {guilds.length > 0 &&
                  guilds.map(({ GuildId, GuildName, Icon, isNew }, index) => (
                    <GuildCard
                      GuildId={GuildId}
                      GuildName={GuildName}
                      Icon={Icon}
                      isNew={isNew}
                      key={index}
                    />
                  ))}
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
