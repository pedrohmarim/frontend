import React from 'react';
import * as S from './styles';
import * as G from 'globalStyles/global';
import router from 'next/router';
import theme from 'globalStyles/theme';
import Head from 'next/head';
import { Button } from 'antd_components';

export default function HomeContainer() {
  return (
    <>
      <Head>
        <title>Guess the Idiot | Home</title>
      </Head>

      <S.ColumnContainer>
        <S.Title>
          Bem vindo colega, ao jogo <G.HomeSpan> Guess the Idiot</G.HomeSpan>
        </S.Title>

        <S.Description>
          Guess the Idiot resume-se em acertar quem escreveu uma frase gerada de
          forma aleatória, retirada do servidor{' '}
          <G.HomeSpan>Filminho</G.HomeSpan> do Discord.
        </S.Description>

        <S.Row justify="center">
          <Button
            onClick={() => router.push('/game')}
            backgroundcolor={theme.colors.primary}
            color={theme.colors.text}
          >
            Jogar
          </Button>
        </S.Row>
      </S.ColumnContainer>
    </>
  );
}
