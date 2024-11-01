import React, { Fragment, useEffect, useState } from 'react';
import * as S from './styles';
import * as I from './ITerms';
import * as G from 'globalStyles/global';
import { Button, Row } from 'antd_components';
import { useRouter } from 'next/router';
import theme from 'globalStyles/theme';
import { getItem } from 'utils/localStorage/User';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';

export default function Terms() {
  const router = useRouter();
  const { i18n, t } = useTranslation('Terms');

  const [languageLoaded, setLanguageLoaded] = useState(false);

  useEffect(() => {
    const result = getItem('i18nextLng');
    if (result) i18n.changeLanguage(result).then(() => setLanguageLoaded(true));
    else setLanguageLoaded(true);
  }, [i18n]);

  const infos: I.IInfos[] = [
    {
      title: t('title1'),
      description: t('description1'),
    },
    {
      title: t('title2'),
      description: t('description2'),
    },
    {
      title: t('title3'),
      description: t('description3'),
    },
    {
      title: t('title4'),
      description: t('description4'),
    },
    {
      title: t('title5'),
      description: t('description5'),
    },
    {
      title: t('title6'),
      description: t('description6'),
    },
    {
      title: t('title7'),
      description: t('description7'),
    },
    {
      title: t('title8'),
      description: t('description8'),
    },
    {
      title: t('title9'),
      description: t('description9'),
    },
  ];

  if (!languageLoaded) return null;

  return (
    <Fragment>
      <Head>
        <title>Discordle | {t('tabTitle')}</title>
      </Head>

      <G.MessageContainer margin="30px 25px 30px 25px">
        <S.PageTitle>
          {t('pageTitle1')}
          <br></br> <br></br>
          {t('pageTitle2')}
        </S.PageTitle>

        {infos.map(({ title, description }, index) => (
          <S.Row key={index}>
            <S.Title>{title}</S.Title>
            <S.Description>{description}</S.Description>
          </S.Row>
        ))}

        <Row justify="center">
          <Button
            width={180}
            height={35}
            onClick={() => router.push('/discordle/home')}
            margin="20px 0 20px 0"
            backgroundcolor={theme.discordleColors.primary}
            color={theme.discordleColors.text}
          >
            {t('btnLabel')}
          </Button>
        </Row>
      </G.MessageContainer>
    </Fragment>
  );
}
