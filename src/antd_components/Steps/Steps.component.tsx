import * as I from './ISteps';
import * as S from './styles';

export default function Steps({
  steps,
  current = 0,
  type,
  className,
  direction,
  iconPrefix,
  initial,
  labelPlacement,
  prefixCls,
  progressDot,
  responsive,
  size,
  status,
  style,
  percent,
  onChange,
}: I.StepsProps) {
  return (
    <>
      <S.StepsAntd
        current={current}
        type={type}
        className={className}
        direction={direction}
        iconPrefix={iconPrefix}
        initial={initial}
        labelPlacement={labelPlacement}
        prefixCls={prefixCls}
        responsive={responsive}
        size={size}
        status={status}
        style={style}
        percent={percent}
        progressDot={progressDot}
        onChange={onChange}
      >
        {steps.map(
          ({
            className,
            description,
            icon,
            onClick,
            status,
            disabled,
            title,
            subTitle,
            style,
            key,
          }: I.StepProps) => (
            <S.Step
              key={key}
              className={className}
              description={description}
              icon={icon}
              onClick={onClick}
              status={status}
              disabled={disabled}
              title={title}
              subTitle={subTitle}
              style={style}
            />
          )
        )}
      </S.StepsAntd>

      {steps[current]?.content}
    </>
  );
}
