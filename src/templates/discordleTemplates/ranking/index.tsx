import React, { Fragment, useEffect, useState } from 'react';
import { GameTitle } from 'templates/discordleTemplates/game/components/ChoosedMessage/styles';
import { ColumnsType } from 'antd/es/table';
import Cookie from 'cookiejs';
import * as S from './styles';
import DiscordMessagesApi from 'services/DiscordleService/DiscordleRanking';
import { useRouter } from 'next/router';
import theme from 'globalStyles/theme';
import { IAwnser } from 'templates/discordleTemplates/game/IGame';
import { MarginRow } from 'templates/discordleTemplates/home/styles';
import { MessageContainer } from 'globalStyles/global';
import {
  IRankingTableData,
  IUserScoreDetail,
} from 'services/DiscordleService/IDiscordleService';
import {
  Row,
  Avatar,
  FeatherIcons,
  Tooltip,
  Button,
  Empty,
  Table,
} from 'antd_components';

export default function Ranking() {
  const [dataSource, setDataSource] = useState<IRankingTableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [nameModalTitle, setNameModalTitle] = useState<string>('');
  const [channelName, setChannelName] = useState<string>('');
  const router = useRouter();
  const [scoreDetail, setScoreDetail] = useState<IUserScoreDetail[]>([]);

  useEffect(() => {
    function wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww(
      channelId: string,
      guildId: string
    ) {
      Cookie.remove('guildId');
      Cookie.remove('userId');
      Cookie.remove('channelId');
      router.push({
        pathname: '/discordle/chooseProfile',
        query: {
          channelId,
          guildId,
        },
      });
    }

    if (router.isReady) {
      const userId = Cookie.get('userId');

      const { channelId, guildId } = router.query;

      if (!userId) {
        router.push({
          pathname: '/discordle/chooseProfile',
          query: {
            channelId,
            guildId,
          },
        });
      }

      if (channelId && guildId) {
        DiscordMessagesApi.GetDiscordleHistory(
          channelId.toString(),
          guildId.toString()
        )
          .then(({ ChannelName, RankingTableData }) => {
            setChannelName(ChannelName);
            setDataSource(RankingTableData);
          })
          .catch(() =>
            wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww(
              channelId.toString(),
              guildId.toString()
            )
          )
          .finally(() => setLoading(false));
      }
    }
  }, [router]);

  function showDetails(userId: string) {
    const { channelId, guildId } = router.query;

    if (channelId)
      DiscordMessagesApi.GetUserScoreDetail(userId, channelId?.toString())
        .then((data) => setScoreDetail(data))
        .catch(() => {
          Cookie.remove('guildId');
          Cookie.remove('userId');
          Cookie.remove('channelId');
          router.push({
            pathname: '/discordle/chooseProfile',
            query: {
              channelId,
              guildId,
            },
          });
        })
        .finally(() => setOpen(true));
  }

  const columns: ColumnsType<IRankingTableData> = [
    {
      title: 'Posição',
      align: 'center',
      width: 80,
      dataIndex: 'Position',
      render: (value) => <>{value}</>,
    },
    {
      title: 'Membro',
      dataIndex: 'Member',
      render: ({ Username, AvatarUrl }) => (
        <Row align="middle">
          {AvatarUrl && <Avatar src={AvatarUrl} />}
          <S.UserSpan>{Username}</S.UserSpan>
        </Row>
      ),
    },
    {
      title: 'Total de pontos',
      align: 'center',
      width: 150,
      dataIndex: 'TotalScore',
    },
    {
      title: 'Ações',
      align: 'center',
      fixed: 'right',
      width: 80,
      key: 'operation',
      render: ({ Member }) => {
        return (
          <Tooltip title="Ver detalhes">
            <S.Row
              justify="center"
              onClick={() => {
                setNameModalTitle(Member.Username);
                showDetails(Member.Id);
              }}
            >
              <FeatherIcons icon="eye" size={18} />
            </S.Row>
          </Tooltip>
        );
      },
    },
  ];

  const modalColumns: ColumnsType<IUserScoreDetail> = [
    {
      title: 'Data',
      width: 100,
      dataIndex: 'Date',
      align: 'center',
      render: (value) => <>{value}</>,
    },
    {
      title: 'Detalhes do dia',
      dataIndex: 'ScoreDetails',
      render: (scoreDetails) =>
        scoreDetails.map(({ Score, Success, TabKey }: IAwnser, key: number) => (
          <Row align="middle" key={key}>
            <S.UserSpan>{TabKey}º Pergunta -</S.UserSpan>
            <S.UserSpan>Pontuação: {Score} -</S.UserSpan>
            <S.UserSpan>
              {Success ? `Acertou ${Score === 1 ? '(dica)' : ''}` : 'Errou'}
            </S.UserSpan>
          </Row>
        )),
    },
  ];

  function gridReload() {
    setLoading(true);

    const { channelId, guildId } = router.query;

    if (channelId && guildId) {
      DiscordMessagesApi.GetDiscordleHistory(
        channelId.toString(),
        guildId.toString()
      )
        .then(
          ({
            ChannelName: channelName,
            RankingTableData: rankingTableData,
          }) => {
            setChannelName(channelName);
            setDataSource(rankingTableData);
          }
        )
        .catch(() => {
          Cookie.remove('guildId');
          Cookie.remove('userId');
          Cookie.remove('channelId');
          router.push('/discordle/chooseProfile');
        })
        .finally(() => setLoading(false));
    }
  }

  function toGame() {
    const { channelId, guildId } = router.query;

    router.push({
      pathname: '/discordle/game',
      query: {
        channelId,
        guildId,
      },
    });
  }

  return (
    <MessageContainer>
      <S.TableContainer>
        <GameTitle>Discordle | Ranking - #{channelName}</GameTitle>

        {dataSource.length && (
          <Table
            scroll={{ x: 600 }}
            loading={loading}
            size="middle"
            columns={columns}
            dataSource={dataSource}
            rowKey={(record: IRankingTableData) => record.RowId}
            locale={{ emptyText: <Empty description="Sem registros" /> }}
            pagination={{
              pageSize: 10,
              hideOnSinglePage: true,
              style: { color: theme.discordleColors.text },
              total: dataSource.length,
              showTotal: (total) => `Total de ${total} registros`,
            }}
          />
        )}

        <S.Modal
          destroyOnClose
          open={open}
          style={{ top: '5%' }}
          title={<S.ModalTitle>Detalhes de {nameModalTitle}</S.ModalTitle>}
          onCancel={() => setOpen(false)}
          onOk={() => setOpen(false)}
          bodyStyle={{ backgroundColor: theme.discordleColors.background }}
          okText="Voltar"
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{
            style: {
              backgroundColor: theme.discordleColors.primary,
              color: theme.discordleColors.text,
            },
          }}
        >
          <Table
            scroll={{ x: 450 }}
            loading={loading}
            locale={{ emptyText: <Empty description="Sem registros" /> }}
            size="small"
            columns={modalColumns}
            dataSource={scoreDetail}
            rowKey={(record: IUserScoreDetail) => record.RowId}
            pagination={{
              pageSize: 3,
              hideOnSinglePage: true,
              style: { color: theme.discordleColors.text },
              total: scoreDetail.length,
              showTotal: (total) => `Total de ${total} registros`,
            }}
          />
        </S.Modal>

        <MarginRow justify="space-between" align="middle">
          <Button
            onClick={toGame}
            backgroundcolor={theme.discordleColors.primary}
            color={theme.discordleColors.text}
            icon={<FeatherIcons icon="arrow-left" size={18} />}
            width={120}
          >
            <S.UserSpan>Voltar</S.UserSpan>
          </Button>

          <Row justify="end" align="middle">
            <Button
              onClick={gridReload}
              backgroundcolor={theme.discordleColors.primary}
              color={theme.discordleColors.text}
              icon={<FeatherIcons icon="rotate-cw" size={18} />}
            >
              <S.UserSpan>Recarregar</S.UserSpan>
            </Button>
          </Row>
        </MarginRow>
      </S.TableContainer>
    </MessageContainer>
  );
}
