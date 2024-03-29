import React, { Fragment, useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import * as I from './IHomeDiscordleList';
import { Row, Avatar, FeatherIcons, Input, Col } from 'antd_components';
import DiscordGuildApi from 'services/DiscordleService/DiscordleGuilds';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IGuildsDto } from 'services/DiscordleService/IDiscordleService';

export default function HomeDiscordlesList({ isMobile }: I.IHomeDiscordleList) {
  const [totalGuilds, setTotalGuilds] = useState<number>(0);
  const [guilds, setGuilds] = useState<IGuildsDto[]>([]);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const pageSize = 12;
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

  useEffect(() => {
    GetGuilds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Container marginTop={isMobile ? 0 : 30}>
      <Row justify="space-between" align="middle">
        {!isMobile ? (
          <S.TextContainer>
            <FeatherIcons icon="trending-up" />
            <S.ListTitle>Instâncias de Servidores Criados</S.ListTitle>
          </S.TextContainer>
        ) : (
          <S.ListTitle>Instâncias de Servidores Criados</S.ListTitle>
        )}

        <S.InputContainer isMobile={isMobile}>
          <Input
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
          // loader={!noMoreDataToFetch && <Spin />}
          scrollableTarget="container"
        >
          <Row>
            {guilds.map(({ GuildName, Icon }, index) => (
              <Col key={index} xs={12} sm={8} md={6} lg={6} xl={6} xxl={6}>
                <S.GuildItem>
                  <Avatar
                    src={Icon}
                    alt="image"
                    style={{ height: '70px', width: 'auto' }}
                  />
                  <S.GuildName>
                    {GuildName.length <= 50
                      ? GuildName
                      : GuildName.substring(0, 32) + '...'}
                  </S.GuildName>
                </S.GuildItem>
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </S.ListContainer>

      <S.PaginationContainer justify="center" align="middle">
        <S.PrimaryTextColor>{totalGuilds}</S.PrimaryTextColor> servidores
        registrados.
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
  );
}
