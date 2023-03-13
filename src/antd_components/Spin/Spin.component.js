import * as S from './Spin.styled';

export default function Spin({ color, tip }) {
  return (
    <S.Spin tip={<S.SpinTip>{tip}</S.SpinTip>} size="large" color={color} />
  );
}
