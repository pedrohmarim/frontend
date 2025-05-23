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
  disabled,
  ref,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: I.IButton) {
  return (
    <S.Button
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      boxshadow={boxshadow}
      type={type}
      icon={icon}
      color={color}
      backgroundcolor={backgroundcolor}
      width={width ? `${width}px` : '100%'}
      height={height ? `${height}px` : '100%'}
      margin={margin}
      htmlType={htmlType}
      onClick={onClick}
    >
      {children}
    </S.Button>
  );
}
