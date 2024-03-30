import React, { Fragment, useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import * as I from './IHomeDiscordleList';
import { Row, Avatar, FeatherIcons, Input, Col } from 'antd_components';
import DiscordGuildApi from 'services/DiscordleService/DiscordleGuilds';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IGuildsDto } from 'services/DiscordleService/IDiscordleService';
import Animation from 'assets/homeAnimation.json';

export default function HomeDiscordleList({ isMobile }: I.IHomeDiscordleList) {
  const [totalGuilds, setTotalGuilds] = useState<number>(0);
  const [guilds, setGuilds] = useState<IGuildsDto[]>([]);

  const [pageNumber, setPageNumber] = useState<number>(0);
  const pageSize = 18;
  const [noMoreDataToFetch, setNoMoreDataToFetch] = useState<boolean>(false);

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

  const handleDebouncedSearch = useCallback(async (searchValue: string) => {
    DiscordGuildApi.SearchGuildsByValue(searchValue).then((guilds) =>
      setGuilds(guilds)
    );
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

  function Filter(searchValue: string) {
    if (searchValue.length) debouncedFilter(searchValue);

    //TO DO
    //else voltar a filtrar da pagina 1
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
      {!isMobile && <S.StyledLottie animationData={Animation} loop autoplay />}

      <S.Container>
        <Row justify="space-between" align="middle">
          {!isMobile ? (
            <S.EmptyContainer>
              <FeatherIcons icon="trending-up" />
              <S.ListTitle>Lista de Discordles Criados</S.ListTitle>
            </S.EmptyContainer>
          ) : (
            <S.ListTitle>Lista de Discordles Criados</S.ListTitle>
          )}

          <S.InputContainer isMobile={isMobile}>
            <Input
              onChange={(event) => Filter(event.target.value)}
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
              style={{ padding: isMobile ? '2%' : '10px' }}
              justify={guilds.length ? 'start' : 'center'}
            >
              {guilds.length ? (
                guilds.map(({ GuildName, Icon }, index) => (
                  <Col key={index} xs={24} sm={12} md={8} lg={8} xl={6} xxl={4}>
                    <S.GuildItem>
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
                          {GuildName.length <= (isMobile ? 50 : 90)
                            ? GuildName
                            : GuildName.substring(0, isMobile ? 50 : 90) +
                              '...'}
                        </S.GuildName>

                        <S.SpanEnterRoom>Clique para entrar</S.SpanEnterRoom>
                      </S.InfoContainer>
                    </S.GuildItem>
                  </Col>
                ))
              ) : (
                <>Sem dados</>
              )}
            </Row>
          </InfiniteScroll>
        </S.ListContainer>

        <S.PaginationContainer justify="center" align="middle">
          <S.PrimaryTextColor>{totalGuilds}</S.PrimaryTextColor>

          {handleFormatLabel()}
          {/* <S.Pagination
          size="small"
          total={totalGuilds}
          pageSize={pageSize}
          showLessItems
          showQuickJumper={false}
          showPrevNextJumpers={false}
          showSizeChanger={false}
          showTotal={showTotal}
          // onChange={(page, pageSize) => GetGuilds(true, page, pageSize)}
        /> */}
        </S.PaginationContainer>
      </S.Container>
    </Fragment>
  );
}
