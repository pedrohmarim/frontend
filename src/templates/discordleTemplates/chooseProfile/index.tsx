import React, { useEffect, useState, Fragment } from 'react';
import DiscordInstanceApi from 'services/DiscordleService/DiscordleInstance';
import { useRouter } from 'next/router';
import { MessageContainer } from 'globalStyles/global';
import theme from 'globalStyles/theme';
import { Description } from '../home/components/SelectChanneInstanceModal/styles';
import GuildInfo from '../globalComponents/guildInfo';
import { deleteDiscordleToken, getItem } from 'utils/localStorage/User';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { Container } from 'templates/discordleTemplates/home/components/HomeDiscordleList/styles';
import { Row, Col, Button } from 'antd_components';
import { StatusInstanceEnum } from './statusInstanceEnum';
import MemberList from './components/memberList';
import SelectMembersToCreateDiscordleGameInstance from './components/selectMembersToCreateGameInstance';
import { useMyContext } from 'Context';

export default function ChooseProfile() {
  const router = useRouter();
  const { i18n, t } = useTranslation('ChooseProfile');
  const [renderSelectInput, setRenderSelectInput] = useState<boolean>(false);
  const [languageLoaded, setLanguageLoaded] = useState(false);
  const { setSessionUser } = useMyContext();

  useEffect(() => {
    const result = getItem('i18nextLng');
    if (result) i18n.changeLanguage(result).then(() => setLanguageLoaded(true));
    else setLanguageLoaded(true);
  }, [i18n]);

  function getDiscordleInstanceStatus() {
    if (router.isReady) {
      const { guildId, channelId, code } = router.query;

      if (guildId && channelId && code) {
        DiscordInstanceApi.GetDiscordleInstanceStatus(
          guildId.toString(),
          channelId.toString(),
          code.toString()
        ).then((status) =>
          setRenderSelectInput(
            status === StatusInstanceEnum.AguardandoEscolherUsuarios
          )
        );
      }
    }
  }

  useEffect(() => {
    deleteDiscordleToken();
    setSessionUser(null);
  }, [setSessionUser]);

  useEffect(() => {
    getDiscordleInstanceStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

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

        {!renderSelectInput ? (
          <MemberList />
        ) : (
          <SelectMembersToCreateDiscordleGameInstance />
        )}
      </Container>
    </Fragment>
  );
}
