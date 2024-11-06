import React, { Fragment, useState } from 'react';
import * as I from './ITermsOfUse';
import * as S from './styles';
import { Button, Col, Divider, Modal, Row } from 'antd_components';
import theme from 'globalStyles/theme';
import { useTranslation } from 'react-i18next';
import * as G from 'globalStyles/global';

export default function TermsOfUseModal({ open, setOpen }: I.ITermsOfUse) {
  const [showDescriptions, setShowDescriptions] = useState<boolean>(false);
  const { t } = useTranslation('Terms');

  function onClick() {
    setOpen(!open);

    const clientIdBot = '1089918362311733378';
    const permissions = '2281770000'; //'8' ADMINISTRADOR;

    const redirectUri = encodeURIComponent(window.location.href);

    const responseType = 'code';
    const url = `https://discord.com/api/oauth2/authorize?client_id=${clientIdBot}&permissions=${permissions}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=connections%20bot`;

    window.open(url);

    setShowDescriptions(!showDescriptions);
  }

  const description = [
    {
      label: t('permission_label1'),
      value: t('permission_description1'),
    },
    {
      label: t('permission_label2'),
      value: t('permission_description2'),
    },
    {
      label: t('permission_label3'),
      value: t('permission_description3'),
    },
    {
      label: t('permission_label4'),
      value: t('permission_description4'),
    },
    {
      label: t('permission_label5'),
      value: t('permission_description5'),
    },
  ] as I.IDescriptions[];

  const footer = () =>
    !showDescriptions ? (
      <Row justify="end">
        <Button
          width="fit-content"
          margin="10px 0 0 0"
          backgroundcolor={theme.discordleColors.text}
          onClick={() => setOpen(!open)}
        >
          {t('btn2')}
        </Button>

        <Button
          onClick={() => setShowDescriptions(!showDescriptions)}
          width="fit-content"
          margin="10px 0 0 10px"
          backgroundcolor={theme.discordleColors.primary}
          color={theme.discordleColors.text}
        >
          {t('btn1')}
        </Button>
      </Row>
    ) : (
      <Row justify="end">
        <Button
          width="fit-content"
          margin="10px 0 0 0"
          backgroundcolor={theme.discordleColors.text}
          onClick={() => {
            setOpen(!open);
            setShowDescriptions(!showDescriptions);
          }}
        >
          {t('btn3')}
        </Button>

        <Button
          onClick={onClick}
          width="fit-content"
          margin="10px 0 0 10px"
          backgroundcolor={theme.discordleColors.primary}
          color={theme.discordleColors.text}
        >
          {t('btn4')}
        </Button>
      </Row>
    );

  return (
    <Modal
      width={showDescriptions ? '70%' : '30%'}
      open={open}
      destroyOnClose
      footer={footer}
      maskClosable
      onCancel={() => {
        setOpen(!open);
        setShowDescriptions(!showDescriptions);
      }}
      title={
        <S.ModalTitle>
          {!showDescriptions ? t('modalTitle2') : t('modalTitleDescriptions')}
        </S.ModalTitle>
      }
    >
      {!showDescriptions ? (
        <S.Span>
          {t('modalTitle')}{' '}
          <a
            href={window.location.href.replace('home', 'terms')}
            target="_blank"
          >
            {t('modalTitle2')}
          </a>
          .
        </S.Span>
      ) : (
        <Fragment>
          <Divider
            style={{
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />

          <G.MessageContainer>
            <Row gutter={[16, 16]}>
              {description.map(({ label, value }, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <S.Container>
                    <S.Title>{label}</S.Title>
                    <S.Description>{value}</S.Description>
                  </S.Container>
                </Col>
              ))}
            </Row>
          </G.MessageContainer>
        </Fragment>
      )}
    </Modal>
  );
}
