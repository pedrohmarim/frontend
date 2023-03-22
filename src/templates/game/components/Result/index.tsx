import { Row, FeatherIcons } from 'antd_components';
import React from 'react';
import { MessageContainer, GameTitle } from '../ChoosedMessage/styles';
import * as S from './styles';
import * as I from './IResult';

export default function Result({ awnsers, timer }: I.IResult) {
  const score = awnsers.reduce((accumulator, curValue) => {
    return accumulator + curValue.score;
  }, 0);

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
