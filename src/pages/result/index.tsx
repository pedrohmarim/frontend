import React from 'react';
import { Row, Result, Button } from 'antd_components';
import theme from 'globalStyles/theme';
import * as G from 'globalStyles/global';
import * as S from './styles';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ResultContainer() {
  const router = useRouter();

  const { success, username } = router.query;

  const correctAwnser = success === 'true' ? true : false;

  function handleChooseOtherMessage() {
    router.push(
      {
        pathname: '/game',
      },
      '/game'
    );
  }

  const title = (
    <>
      {correctAwnser
        ? 'Acertou! Quem mandou essa mensagem foi '
        : 'Errou! A resposta certa era '}
      <G.HomeSpan>{username}</G.HomeSpan>
    </>
  );

  const subTitle = correctAwnser
    ? 'Parabéns você realmente conhece seus colegas.'
    : 'Você não é um bom colega...';

  const status = correctAwnser ? 'success' : 'error';

  return (
    <>
      <Head>
        <title>Guess the Idiot | Result</title>
      </Head>

      <Result
        title={<S.Span>{title}</S.Span>}
        subTitle={<S.Span>{subTitle}</S.Span>}
        status={status}
        extra={
          <Row justify="center">
            <Button
              backgroundcolor={theme.colors.primary}
              color={theme.colors.text}
              onClick={handleChooseOtherMessage}
            >
              Jogar novamente
            </Button>
          </Row>
        }
      />
    </>
  );
}
