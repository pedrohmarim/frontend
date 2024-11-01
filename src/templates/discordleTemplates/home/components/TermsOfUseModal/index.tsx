import React from 'react';
import * as I from './ITermsOfUse';
import * as S from './styles';
import { Button, Modal, Row } from 'antd_components';
import theme from 'globalStyles/theme';
import { useTranslation } from 'react-i18next';

export default function TermsOfUseModal({ open, setOpen }: I.ITermsOfUse) {
  const { t } = useTranslation('Terms');

  const footer = () => (
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
        onClick={() => {
          setOpen(!open);

          const clientIdBot = '1089918362311733378';
          const permissions = '2281770000'; //'8' ADMINISTRADOR;

          const redirectUri = encodeURIComponent(window.location.href);

          const responseType = 'code';
          const url = `https://discord.com/api/oauth2/authorize?client_id=${clientIdBot}&permissions=${permissions}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=connections%20bot`;

          window.open(url);
        }}
        width="fit-content"
        margin="10px 0 0 10px"
        backgroundcolor={theme.discordleColors.primary}
        color={theme.discordleColors.text}
      >
        {t('btn1')}
      </Button>
    </Row>
  );
  return (
    <Modal
      open={open}
      destroyOnClose
      footer={footer}
      maskClosable
      onCancel={() => setOpen(!open)}
      title={<S.ModalTitle>{t('modalTitle2')}</S.ModalTitle>}
    >
      <S.Span>
        {t('modalTitle')}{' '}
        <a href={window.location.href.replace('home', 'terms')} target="_blank">
          {t('modalTitle2')}
        </a>
        .
      </S.Span>
    </Modal>
  );
}
