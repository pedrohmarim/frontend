import React, { useState, useCallback, useEffect } from 'react';
import formatDate from 'helpers/formatDate';
import DiscordMessagesApi from 'services/DiscordMessages';
import { Row, FeatherIcons } from 'antd_components';
import { MessageContainer, GameTitle } from '../ChoosedMessage/styles';
import * as S from './styles';
import * as I from './IResult';

export default function Result({ awnsers }: I.IResult) {
  const score = awnsers.reduce((accumulator, curValue) => {
    return accumulator + curValue.score;
  }, 0);

  const [timer, setTimer] = useState<string>('Carregando...');

  const handleFormatDate = useCallback((timer: string) => {
    formatDate(timer, setTimer);
  }, []);

  useEffect(() => {
    DiscordMessagesApi.GetTimer().then((timer) => handleFormatDate(timer));
  }, [handleFormatDate]);

  return (
    <MessageContainer>
      <GameTitle>
        🥳🎉<S.MarginSpan>Resultado</S.MarginSpan>🎉🥳
      </GameTitle>

      <Row justify="center">
        <FeatherIcons icon="award" size={21} />
        <S.Subtitle>Pontuação final: {score}/10</S.Subtitle>
      </Row>

      <Row>
        {awnsers &&
          awnsers.map(({ score, success, tabKey }, index) => (
            <S.AwnserItem success={success} score={score} key={index}>
              {tabKey}
            </S.AwnserItem>
          ))}
      </Row>

      <S.Divider />

      <S.Span>Próxima atualização em:</S.Span>

      <S.TimerContainer>{timer}</S.TimerContainer>
    </MessageContainer>
  );
}
