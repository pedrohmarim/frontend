import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import * as S from './styles';
import DiscordMessagesApi from 'services/DiscordleService/DiscordleRanking';
import { useRouter } from 'next/router';
import theme from 'globalStyles/theme';
import { IAnswer } from 'templates/discordleTemplates/game/IGame';
import { MessageContainer } from 'globalStyles/global';
import { Container } from 'templates/discordleTemplates/home/components/HomeDiscordleList/styles';
import Head from 'next/head';
import GuildInfo from '../globalComponents/guildInfo';
import { useMyContext } from 'Context';
import ConfigurationModal from '../game/components/ConfigurationModal';
import * as G from 'globalStyles/global';
import { useTranslation } from 'react-i18next';
import { getItem } from 'utils/localStorage/User';
import ChangeNickNameModal from '../game/components/ChangeNicknameModal';
import notification from 'antd_components/Notification/Notification.component';
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
  Checkbox,
} from 'antd_components';

export default function Ranking() {
  const { i18n, t } = useTranslation('Ranking');
  const { windowWidth, sessionUser } = useMyContext();
  const isMobile = windowWidth <= 405;
  const [dataSource, setDataSource] = useState<IRankingTableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [showModalChangeNickame, setShowModalChangeNickname] = useState<{
    show: boolean;
    memberId: string;
    memberUsername: string;
  }>({ memberUsername: '', show: false, memberId: '' });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [checkBox, setCheckBox] = useState<boolean>(true);
  const [nameModalTitle, setNameModalTitle] = useState<string>('');
  const router = useRouter();
  const [scoreDetail, setScoreDetail] = useState<IUserScoreDetail[]>([]);

  useEffect(() => {
    const result = getItem('i18nextLng');
    if (result) i18n.changeLanguage(result);
  }, [i18n]);

  function getDiscordleHistory(
    code: string,
    channelId: string,
    guildId: string
  ) {
    DiscordMessagesApi.GetDiscordleHistory(code, channelId, guildId)
      .then((data) => setDataSource(data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (router.isReady) {
      const { channelId, guildId, code } = router.query;

      if (channelId && guildId && code)
        getDiscordleHistory(
          code.toString(),
          channelId.toString(),
          guildId.toString()
        );
    }
  }, [router]);

  function showDetails(userId: string) {
    const { guildId, channelId, code } = router.query;

    if (channelId && code && guildId)
      DiscordMessagesApi.GetUserScoreDetail(
        userId,
        channelId.toString(),
        guildId.toString(),
        code.toString()
      )
        .then((data) => setScoreDetail(data))
        .finally(() => setOpen(true));
  }

  const columns: ColumnsType<IRankingTableData> = [
    {
      title: t('titleTable1'),
      align: 'center',
      width: 80,
      dataIndex: 'Position',
      render: (value) => {
        switch (value) {
          case 1:
            return <FeatherIcons icon="star" color="yellow" size={27} />;
          case 2:
            return <FeatherIcons icon="star" color="silver" size={27} />;
          case 3:
            return <FeatherIcons icon="star" color="coral" size={27} />;
          default:
            return value;
        }
      },
    },
    {
      title: t('titleTable2'),
      dataIndex: 'Member',
      render: ({ Username, AvatarUrl }, record) => {
        const isLoggedUserFirst = dataSource.some(
          (item) =>
            item.Position === 1 && item.Member.Id === sessionUser?.MemberId
        );

        const isOwnRecord = record.Member.Id === sessionUser?.MemberId;

        return (
          <S.TableRow align="middle" justify="start">
            {AvatarUrl && <Avatar src={AvatarUrl} />}
            <S.UserSpan>{Username}</S.UserSpan>

            {isLoggedUserFirst && !isOwnRecord && (
              <S.TableButton
                onClick={() =>
                  setShowModalChangeNickname({
                    show: !showModalChangeNickame.show,
                    memberId: record.Member.Id,
                    memberUsername: record.Member.Username,
                  })
                }
              >
                <Row align="middle">
                  <FeatherIcons
                    icon="edit"
                    size={16}
                    style={{ marginRight: '5px' }}
                  />
                  {t('changeNickName')}
                </Row>
              </S.TableButton>
            )}
          </S.TableRow>
        );
      },
    },
    {
      title: t('titleTable3'),
      align: 'center',
      width: 150,
      dataIndex: 'TotalScore',
    },
    {
      title: t('titleTable4'),
      align: 'center',
      fixed: 'right',
      width: 80,
      key: 'operation',
      render: ({ Member }) => {
        return (
          <Tooltip title={t('tooltipAction')}>
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

  function handleFirstDescription(tabKey: number) {
    const language = getItem('i18nextLng');

    if (language === 'pt') return `${tabKey}º ${t('message')} -`;

    if (tabKey === 1) return `1st ${t('message')} -`;
    if (tabKey === 2) return `2nd ${t('message')} -`;
    if (tabKey === 3) return `3rd ${t('message')} -`;
    if (tabKey === 4) return `4th ${t('message')} -`;
    if (tabKey === 5) return `5th ${t('message')} -`;
  }

  const modalColumns: ColumnsType<IUserScoreDetail> = [
    {
      title: t('modalTitleTable1'),
      width: 100,
      dataIndex: 'Date',
      align: 'center',
      render: (value) => <>{value}</>,
    },
    {
      title: t('modalTitleTable2'),
      dataIndex: 'ScoreDetails',
      render: (scoreDetails) =>
        scoreDetails.map(({ Score, Success, TabKey }: IAnswer, key: number) => (
          <Row align="middle" key={key}>
            <S.UserSpan>{handleFirstDescription(TabKey)}</S.UserSpan>
            <S.UserSpan>
              {t('score')}: {Score} -
            </S.UserSpan>
            <S.UserSpan>
              {Success
                ? `${t('descriptionScore1')} ${
                    Score === 1 ? t('descriptionScore2') : ''
                  }`
                : t('descriptionScore3')}
            </S.UserSpan>
          </Row>
        )),
    },
  ];

  function gridReload() {
    setLoading(true);

    const { channelId, guildId, code } = router.query;

    if (channelId && guildId && code)
      getDiscordleHistory(
        code.toString(),
        channelId.toString(),
        guildId.toString()
      );
  }

  function toGame() {
    const { channelId, guildId, code } = router.query;

    if (channelId && guildId && code)
      router.push({
        pathname: '/discordle/game',
        query: {
          guildId,
          channelId,
          code,
        },
      });
  }

  useEffect(() => {
    const { channelId, guildId, code } = router.query;

    if (channelId && guildId && code && sessionUser?.MemberId)
      DiscordMessagesApi.GetCheckBoxRanking(
        code?.toString(),
        channelId?.toString(),
        guildId?.toString(),
        sessionUser.MemberId
      ).then((value) => setCheckBox(value));
  }, [router.query, sessionUser]);

  function changeCheckBox() {
    const { channelId, guildId, code } = router.query;

    if (channelId && guildId && code && sessionUser?.MemberId)
      DiscordMessagesApi.UpdateCheckBoxRanking(
        code?.toString(),
        channelId?.toString(),
        guildId?.toString(),
        sessionUser.MemberId,
        !checkBox
      ).then(() => {
        setCheckBox(!checkBox);
        notification.success(
          t('success'),
          checkBox ? t('outRankingInteration') : t('onRankingInteration')
        );
      });
  }

  return (
    <Container
      margin="25px"
      maxHeight="100%"
      padding="20px"
      alignItems="center"
    >
      <Head>
        <title>Discordle | {t('ranking')}</title>
      </Head>

      <ConfigurationModal openModal={openModal} setOpenModal={setOpenModal} />

      <ChangeNickNameModal
        gridReload={gridReload}
        userIdThatChangedNickname={sessionUser?.MemberId ?? ''}
        username={showModalChangeNickame.memberUsername}
        memberId={showModalChangeNickame.memberId}
        openModal={showModalChangeNickame.show}
        setOpenModal={setShowModalChangeNickname}
      />

      <MessageContainer width="100%">
        <GuildInfo openModal={openModal} setOpenModal={setOpenModal} />

        <S.ClassificationTitle justify="center">
          {t('rankingTitle')}
        </S.ClassificationTitle>

        <S.Description justify="center" align="middle">
          <G.HomeSpan margin="0 5px 0 0">{t('rankingDescription1')}</G.HomeSpan>
          {t('rankingDescription2')}
        </S.Description>

        <S.Description justify="end">
          <Checkbox checked={checkBox} onChange={changeCheckBox}>
            {t('checkBoxLabel')}
          </Checkbox>
        </S.Description>

        <S.TableContainer>
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
              showTotal: (total) =>
                `${t('paginationDescription1')} ${total} ${t(
                  'paginationDescription2'
                )}`,
            }}
          />

          <S.Modal
            destroyOnClose
            open={open}
            style={{ top: '5%' }}
            title={
              <S.ModalTitle>
                {t('modalTitle')} {nameModalTitle}
              </S.ModalTitle>
            }
            onCancel={() => setOpen(false)}
            onOk={() => setOpen(false)}
            okText={t('back')}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{
              style: {
                backgroundColor: theme.discordleColors.primary,
                border: 'none',
                color: theme.discordleColors.text,
              },
            }}
          >
            <Table
              scroll={{ x: 450 }}
              loading={loading}
              locale={{ emptyText: <Empty description={t('emptyData')} /> }}
              size="small"
              columns={modalColumns}
              dataSource={scoreDetail}
              rowKey={(record: IUserScoreDetail) => record.RowId}
              pagination={{
                pageSize: 3,
                hideOnSinglePage: true,
                style: { color: theme.discordleColors.text },
                total: scoreDetail.length,
                showTotal: (total) =>
                  `${t('paginationDescription1')} ${total} ${t(
                    'paginationDescription2'
                  )}`,
              }}
            />
          </S.Modal>

          <S.ButtonRow justify="space-between" align="middle">
            <Button
              onClick={toGame}
              backgroundcolor={theme.discordleColors.primary}
              color={theme.discordleColors.text}
              icon={<FeatherIcons icon="arrow-left" size={18} />}
              width={!isMobile ? 120 : ''}
            >
              <S.UserSpan>{t('back')}</S.UserSpan>
            </Button>

            <Button
              onClick={gridReload}
              backgroundcolor={theme.discordleColors.primary}
              color={theme.discordleColors.text}
              icon={<FeatherIcons icon="rotate-cw" size={18} />}
              width={!isMobile ? 140 : ''}
            >
              <S.UserSpan>{t('reload')}</S.UserSpan>
            </Button>
          </S.ButtonRow>
        </S.TableContainer>
      </MessageContainer>
    </Container>
  );
}
