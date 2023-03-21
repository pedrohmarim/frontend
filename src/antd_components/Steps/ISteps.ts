import {
  StepsProps as StepsPropsAntd,
  StepProps as StepPropsAntd,
} from 'antd/lib/steps';

export interface StepsProps extends StepsPropsAntd {
  steps: StepProps[];
}

export interface StepProps extends StepPropsAntd {
  content: JSX.Element | string;
  key: string | number;
}
