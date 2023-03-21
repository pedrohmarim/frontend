import { Steps } from 'antd';

import styled from 'styled-components';

export const Step = styled(Steps.Step)``;

export const StepsAntd = styled(Steps)`
  margin-bottom: 35px;

  .ant-steps-item-title,
  .ant-steps-item-subtitle {
    color: ${(props) => props.theme.colors.text} !important;
  }

  .ant-steps-item::before {
    background-color: ${(props) => props.theme.colors.primary} !important;
  }
`;
