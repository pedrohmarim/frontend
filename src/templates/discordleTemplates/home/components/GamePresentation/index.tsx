import React from 'react';
import * as I from './IGamePresentation';
import * as S from '../../styles';
import * as G from 'globalStyles/global';
import { Row } from 'antd_components';
import { Divider } from 'templates/discordleTemplates/game/components/Result/styles';
import theme from 'globalStyles/theme';
import Header from './components/Header';

export default function GamePresentation({ width }: I.IGamePresentation) {
  function onClick() {
    const clientIdBot = '1089918362311733378';
    const permissions = '8'; //'75824';

    const redirectUri = encodeURIComponent(window.location.href);

    const responseType = 'code';
    const url = `https://discord.com/api/oauth2/authorize?client_id=${clientIdBot}&permissions=${permissions}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=connections%20bot`;

    window.open(url);
  }

  return <Header />;

  return (
    <G.MessageContainer width={width > 850 ? '60%' : '100%'} margin="auto">
      <S.Title>
        Bem vindo ao
        <G.HomeSpan> Discordle</G.HomeSpan>
      </S.Title>

      <S.Description>
        Esse jogo resume-se em acertar quem escreveu uma frase gerada de forma
        aleatória, retirada de um canal de texto de um servidor do{' '}
        <G.HomeSpan> Discord</G.HomeSpan>
      </S.Description>

      <Divider />

      <S.Description>
        Primeiro, convite o bot para o servidor desejado
      </S.Description>

      <Row justify="center">
        <S.Button
          onClick={onClick}
          boxshadow="0px 0px 10px 10px rgba(255, 255, 255, 0.08)"
          backgroundcolor={theme.discordleColors.primary}
          color={theme.discordleColors.text}
          width={165}
          height={35}
          margin="25px 0 55px 0"
        >
          Convidar bot
        </S.Button>
      </Row>

      <Row justify="end">
        <S.Description fontSize="10.5pt" fontStyle="italic">
          *Certifique-se de estar logado na conta de cargo
          <G.HomeSpan> Dono </G.HomeSpan> do servidor que deseje usar.
        </S.Description>
      </Row>
    </G.MessageContainer>
  );
}
