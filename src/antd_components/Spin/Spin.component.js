import * as S from "./Spin.styled";

export default function Spin({ color }) {
  return (
    <S.Spin
      tip={<S.SpinTip>Carregando...</S.SpinTip>}
      size='large'
      color={color}
    />
  );
}
