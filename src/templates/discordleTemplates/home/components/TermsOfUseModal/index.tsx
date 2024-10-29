import React from 'react';
import * as I from './ITermsOfUse';
import * as S from './styles';
import { Button, Modal, Row } from 'antd_components';
import theme from 'globalStyles/theme';

export default function TermsOfUseModal({ open, setOpen }: I.ITermsOfUse) {
  const footer = () => (
    <Row justify="end">
      <Button
        width="fit-content"
        margin="10px 0 0 0"
        backgroundcolor={theme.discordleColors.text}
        onClick={() => setOpen(!open)}
      >
        Não concordo
      </Button>

      <Button
        onClick={() => {
          setOpen(!open);

          const clientIdBot = '1089918362311733378';
          const permissions = '2349018128'; //'8' ADMINISTRADOR;

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
        Eu concordo
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
      title={<S.ModalTitle>Termos de Uso</S.ModalTitle>}
    >
      <S.Span>
        Antes de começar a usar o Discordle, por favor, leia atentamente nossos
        Termos de Uso. Eles contêm informações importantes sobre seus direitos e
        responsabilidades ao utilizar nossa plataforma, incluindo detalhes sobre
        o funcionamento do jogo, uso do bot e diretrizes da comunidade. Ao
        clicar em &quot;Concordo&quot;, você aceita todos os termos
        estabelecidos. Leia aqui os{' '}
        <a href={window.location.href.replace('home', 'terms')} target="_blank">
          Termos de uso
        </a>
        .
      </S.Span>
    </Modal>
  );
}
