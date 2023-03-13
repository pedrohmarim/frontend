import * as S from './Button.styled';

export default function Button({
  color,
  backgroundcolor,
  width,
  height,
  margin,
  children,
  onClick,
}) {
  return (
    <S.Button
      color={color}
      backgroundcolor={backgroundcolor}
      width={width}
      height={height}
      margin={margin}
      onClick={onClick}
    >
      {children}
    </S.Button>
  );
}
