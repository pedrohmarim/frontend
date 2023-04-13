import React, { useEffect, useState } from 'react';
import { GameTitle } from 'templates/game/components/ChoosedMessage/styles';
import { ColumnsType } from 'antd/es/table';
import Cookie from 'cookiejs';
import * as S from './styles';
import DiscordMessagesApi from 'services/DiscordMessages';
import { useRouter } from 'next/router';
import theme from 'globalStyles/theme';
import { IAwnser } from 'templates/game/IGame';
import { MarginRow } from 'templates/home/styles';
import {
  IRankingTableData,
  IUserScoreDetail,
} from 'services/DiscordMessages/IDiscordMessagesService';
import {
  Row,
  Avatar,
  FeatherIcons,
  Tooltip,
  Button,
  Empty,
  Table,
  Spin,
} from 'antd_components';

export default function Ranking() {
  const [dataSource, setDataSource] = useState<IRankingTableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadPage, setLoadPage] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [nameModalTitle, setNameModalTitle] = useState<string>('');
  const [channelName, setChannelName] = useState<string>('');
  const router = useRouter();
  const [scoreDetail, setScoreDetail] = useState<IUserScoreDetail[]>([]);

  useEffect(() => {
    function handleReset() {
      Cookie.remove('guildId');
      Cookie.remove('userId');
      Cookie.remove('channelId');
      router.push('/');
    }

    if (router.isReady) {
      const userId = Cookie.get('userId');

      const { channelId, guildId } = router.query;

      if (!userId) {
        router.push({
          pathname: '/chooseProfile',
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
          .then(({ channelName, rankingTableData }) => {
            setChannelName(channelName);
            setDataSource(rankingTableData);
          })
          .catch(() => handleReset())
          .finally(() => {
            setLoadPage(false);
            setLoading(false);
          });
      }
    }
  }, [router]);

  function showDetails(userId: string) {
    const { channelId } = router.query;

    if (channelId)
      DiscordMessagesApi.GetUserScoreDetail(userId, channelId?.toString())
        .then((data) => setScoreDetail(data))
        .catch(() => {
          Cookie.remove('guildId');
          Cookie.remove('userId');
          Cookie.remove('channelId');
          router.push('/');
        })
        .finally(() => setOpen(true));
  }

  const columns: ColumnsType<IRankingTableData> = [
    {
      title: 'Posição',
      align: 'center',
      dataIndex: 'position',
      render: (value) => <>{value}</>,
    },
    {
      title: 'Membro',
      dataIndex: 'member',
      render: ({ username, avatarUrl }) => (
        <Row align="middle">
          {avatarUrl && <Avatar src={avatarUrl} />}
          <S.UserSpan>{username}</S.UserSpan>
        </Row>
      ),
    },
    {
      title: 'Total de pontos',
      align: 'center',
      dataIndex: 'totalScore',
    },
    {
      title: 'Ações',
      align: 'center',
      key: 'operation',
      render: ({ member }) => {
        return (
          <Tooltip title="Ver detalhes">
            <S.Row
              justify="center"
              onClick={() => {
                setNameModalTitle(member.username);
                showDetails(member.userId);
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
      dataIndex: 'date',
      align: 'center',
      render: (value) => <>{value}</>,
    },
    {
      title: 'Detalhes do dia',
      dataIndex: 'scoreDetails',
      render: (scoreDetails) =>
        scoreDetails.map(({ score, success, tabKey }: IAwnser, key: number) => (
          <Row align="middle" key={key}>
            <S.UserSpan>{tabKey}º Pergunta -</S.UserSpan>
            <S.UserSpan>Pontuação: {score} -</S.UserSpan>
            <S.UserSpan>
              {success ? `Acertou ${score === 1 ? '(dica)' : ''}` : 'Errou'}
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
        .then(({ channelName, rankingTableData }) => {
          setChannelName(channelName);
          setDataSource(rankingTableData);
        })
        .catch(() => {
          Cookie.remove('guildId');
          Cookie.remove('userId');
          Cookie.remove('channelId');
          router.push('/');
        })
        .finally(() => setLoading(false));
    }
  }

  function toGame() {
    const { channelId, guildId } = router.query;

    router.push({
      pathname: '/game',
      query: {
        channelId,
        guildId,
      },
    });
  }

  return (
    <>
      {!loadPage ? (
        <S.TableContainer>
          <GameTitle>Discordle | Ranking - #{channelName}</GameTitle>

          <Table
            scroll={{ x: 600 }}
            loading={loading}
            size="middle"
            columns={columns}
            dataSource={dataSource}
            rowKey={(record: IRankingTableData) => record.rowId}
            locale={{ emptyText: <Empty description="Sem registros" /> }}
            pagination={{
              pageSize: 10,
              hideOnSinglePage: true,
              style: { color: theme.colors.text },
              total: dataSource.length,
              showTotal: (total) => `Total de ${total} registros`,
            }}
          />

          <S.Modal
            open={open}
            title={<S.ModalTitle>Detalhes de {nameModalTitle}</S.ModalTitle>}
            onCancel={() => setOpen(false)}
            onOk={() => setOpen(false)}
            bodyStyle={{ backgroundColor: theme.colors.background }}
            okText="Voltar"
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{
              style: {
                backgroundColor: theme.colors.primary,
                color: theme.colors.text,
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
              rowKey={(record: IUserScoreDetail) => record.rowId}
              pagination={{
                pageSize: 3,
                hideOnSinglePage: true,
                style: { color: theme.colors.text },
                total: scoreDetail.length,
                showTotal: (total) => `Total de ${total} registros`,
              }}
            />
          </S.Modal>

          <MarginRow justify="space-between" align="middle">
            <Button
              onClick={toGame}
              backgroundcolor={theme.colors.primary}
              color={theme.colors.text}
              icon={<FeatherIcons icon="arrow-left" size={18} />}
            >
              <S.UserSpan>Voltar</S.UserSpan>
            </Button>

            <Row justify="end" align="middle">
              <Button
                onClick={gridReload}
                backgroundcolor={theme.colors.primary}
                color={theme.colors.text}
                icon={<FeatherIcons icon="rotate-cw" size={18} />}
              >
                <S.UserSpan>Recarregar</S.UserSpan>
              </Button>
            </Row>
          </MarginRow>
        </S.TableContainer>
      ) : (
        <Row justify="center">
          <Spin color={theme.colors.text} />
        </Row>
      )}
    </>
  );
}
