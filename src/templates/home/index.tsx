import React, { useState, useEffect } from 'react';
import * as S from './styles';
import * as G from 'globalStyles/global';
import router from 'next/router';
import theme from 'globalStyles/theme';
import Cookie from 'cookiejs';
import Head from 'next/head';
import DiscordMessagesApi from 'services/DiscordMessages';
import { Form, Input } from 'antd_components';
import { MessageContainer } from 'templates/game/components/ChoosedMessage/styles';
import { LoadingOutlined } from '@ant-design/icons';
import { ButtonHTMLType } from 'antd/lib/button';
import { ICreateDiscordleInstancePost } from 'services/DiscordMessages/IDiscordMessagesService';

export default function HomeContainer() {
  const [showInputs, setShowInpts] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  function toGame() {
    router.push('/game');
  }

  useEffect(() => {
    const channelId = Cookie.get('channelId');

    if (channelId) toGame();
  }, []);

  const CenterButton = (
    type: ButtonHTMLType,
    buttonText: string,
    onClick?: () => void
  ) => (
    <S.Row justify="center">
      <S.Button
        onClick={onClick}
        boxshadow="0px 0px 10px 10px rgba(255, 255, 255, 0.08)"
        backgroundcolor={theme.colors.primary}
        color={theme.colors.text}
        width={165}
        height={35}
        icon={loading && <LoadingOutlined spin />}
        htmlType={type}
      >
        {buttonText}
      </S.Button>
    </S.Row>
  );

  const GamePresentation = () => (
    <>
      <S.Title>
        Bem vindo ao
        <G.HomeSpan> Discordle - Guess the Idiot</G.HomeSpan>
      </S.Title>

      <S.Description>
        Guess the Idiot resume-se em acertar quem escreveu uma frase gerada de
        forma aleatória, retirada de um canal de texto de um servidor do{' '}
        <G.HomeSpan> Discord</G.HomeSpan>
      </S.Description>

      {CenterButton('button', 'Começar', () => setShowInpts(true))}
    </>
  );

  async function onFinish(values: ICreateDiscordleInstancePost) {
    setLoading(true);
    await DiscordMessagesApi.CreateDiscordleInstance(values);

    Cookie.set('channelId', values.channelId);

    toGame();
  }

  const InputsContainer = () => (
    <MessageContainer>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ channelId: null, authToken: '' }}
      >
        <S.Title>
          <G.HomeSpan>
            {' '}
            Discordle - Guess the Idiot | Criar Instância
          </G.HomeSpan>
        </S.Title>

        <Form.Item
          required
          rules={[{ required: true, message: 'Campo obrigatório.' }]}
          label={<S.Label>ID Canal de Texto</S.Label>}
          name="channelId"
          tooltip="ID do Canal de Texto que terá as mensagens consumidas para organizar o Discordle."
        >
          <Input type="text" placeholder="Ex.: 790633545788324618" />
        </Form.Item>

        <Form.Item
          required
          rules={[{ required: true, message: 'Campo obrigatório.' }]}
          label={<S.Label>AuthToken</S.Label>}
          name="authToken"
          tooltip="Token de autorização de um dos membros presente do canal de texto escolhido."
        >
          <Input
            type="text"
            placeholder="Ex.: NTkwNKG8YTc5Nzg1NjA1MTIw.GIKTQ8.jQltZga3JVCZsHfgG-XvE_SANDaUw1aJUl9pZ"
          />
        </Form.Item>

        {CenterButton('submit', `${loading ? 'Criando' : 'Criar'} Instância`)}
      </Form>
    </MessageContainer>
  );

  return (
    <>
      <Head>
        <title>Discordle - Guess the Idiot | Home</title>
      </Head>

      <S.ColumnContainer>
        {!showInputs ? <GamePresentation /> : <InputsContainer />}
      </S.ColumnContainer>
    </>
  );
}
