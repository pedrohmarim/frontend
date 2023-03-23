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
  boxshadow,
  htmlType,
  onClick,
}: I.IButton) {
  return (
    <S.Button
      boxshadow={boxshadow}
      type={type}
      icon={icon}
      color={color}
      backgroundcolor={backgroundcolor}
      width={width}
      height={height}
      margin={margin}
      htmlType={htmlType}
      onClick={onClick}
    >
      {children}
    </S.Button>
  );
}
