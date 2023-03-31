import React, { useEffect, useState } from 'react';
import { Row, Avatar, FeatherIcons, Tooltip, Button } from 'antd_components';
import { GameTitle } from 'templates/game/components/ChoosedMessage/styles';
import { ColumnsType } from 'antd/es/table';
import Cookie from 'cookiejs';
import * as S from './styles';
import DiscordMessagesApi from 'services/DiscordMessages';
import {
  IRankingTableData,
  IUserScoreDetail,
} from 'services/DiscordMessages/IDiscordMessagesService';
import { useRouter } from 'next/router';
import theme from 'globalStyles/theme';
import { IAwnser } from 'templates/game/IGame';

export default function Ranking() {
  const [dataSource, setDataSource] = useState<IRankingTableData[]>([]);
  const [scoreDetail, setScoreDetail] = useState<IUserScoreDetail>(
    {} as IUserScoreDetail
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    function handleReset() {
      Cookie.remove('guildId');
      Cookie.remove('userId');
      Cookie.remove('channelId');
      router.push('/');
    }

    if (router.isReady) {
      const { channelId } = router.query;

      if (channelId) {
        DiscordMessagesApi.GetDiscordleHistory(channelId.toString())
          .then((dataSource) => setDataSource(dataSource))
          .catch(() => handleReset())
          .finally(() => setLoading(false));
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
      dataIndex: 'key',
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
      dataIndex: 'totalScore',
    },
    {
      title: 'Ações',
      align: 'center',
      key: 'operation',
      width: 100,
      render: ({ member }) => {
        return (
          <Tooltip title="Ver detalhes">
            <S.Row justify="center" onClick={() => showDetails(member.userId)}>
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
            <S.UserSpan>{success ? 'Acertou' : 'Errou'}</S.UserSpan>
          </Row>
        )),
    },
  ];

  function gridReload() {
    setLoading(true);

    const { channelId } = router.query;

    if (channelId) {
      DiscordMessagesApi.GetDiscordleHistory(channelId.toString())
        .then((dataSource) => setDataSource(dataSource))
        .catch(() => {
          Cookie.remove('guildId');
          Cookie.remove('userId');
          Cookie.remove('channelId');
          router.push('/');
        })
        .finally(() => setLoading(false));
    }
  }

  return (
    <S.TableContainer>
      <GameTitle>Discordle | Ranking - #geral</GameTitle>

      <Row justify="end" align="middle">
        <Button
          onClick={gridReload}
          backgroundcolor={theme.colors.primary}
          color={theme.colors.text}
          icon={<FeatherIcons icon="rotate-cw" size={18} />}
        >
          <S.Reload>Recarregar</S.Reload>
        </Button>
      </Row>

      <S.Table
        loading={loading}
        size="small"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />

      <S.Modal
        open={open}
        title={<S.ModalTitle>Detalhes de CãoFantasma</S.ModalTitle>}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
        bodyStyle={{ backgroundColor: theme.colors.background }}
        okText="Voltar"
        okButtonProps={{
          style: {
            backgroundColor: theme.colors.primary,
            color: theme.colors.text,
          },
        }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <S.Table
          loading={loading}
          size="small"
          columns={modalColumns}
          dataSource={scoreDetail}
          pagination={{
            size: 10,
            hideOnSinglePage: true,
            style: { color: theme.colors.text },
            total: scoreDetail?.scoreDetails?.length,
            showTotal: (total) => `Total de ${total} registros`,
          }}
        />
      </S.Modal>
    </S.TableContainer>
  );
}
