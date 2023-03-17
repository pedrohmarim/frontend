import * as S from './Button.styled';
import * as I from './IButton';

export default function Button({
  color,
  width,
  height,
  margin,
  children,
  backgroundcolor,
  icon,
  type,
  onClick,
}: I.IButton) {
  return (
    <S.Button
      type={type}
      icon={icon}
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
