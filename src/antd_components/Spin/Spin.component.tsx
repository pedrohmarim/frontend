import * as S from './Spin.styled';
import * as I from './ISpin';

export default function Spin({ color = '#fff', spinText }: I.ISpin) {
  return (
    <S.Spin
      tip={<S.SpinTip>{spinText}</S.SpinTip>}
      size="large"
      color={color}
    />
  );
}
