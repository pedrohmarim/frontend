import React, { useEffect } from 'react';
import { Row, Result, Button, Spin } from 'antd_components';
import theme from 'globalStyles/theme';
import * as G from 'globalStyles/global';
import * as S from './styles';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ResultContainer() {
  const router = useRouter();

  const { success, authorMessage } = router.query;

  const correctAwnser = success === 'true' ? true : false;

  useEffect(() => {
    if (!Object.keys(router.query).length)
      router.push(
        {
          pathname: '/home',
        },
        '/home'
      );
  }, [router, router.query]);

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
      <G.HomeSpan>{authorMessage}</G.HomeSpan>
    </>
  );

  const subTitle = correctAwnser
    ? 'Parabéns você realmente conhece seus colegas.'
    : 'Você não é um bom colega...';

  const status = correctAwnser ? 'success' : 'error';

  return (
    <>
      <Head>
        <title>Discordle - Guess the Idiot | Result</title>
      </Head>

      {success && authorMessage ? (
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
      ) : (
        <Spin color={theme.colors.text} spinText="Carregando ..." />
      )}
    </>
  );
}
