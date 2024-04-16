import styled from 'styled-components';
import { Row, Steps as StepsAntd } from 'antd_components';

export const Steps = styled(StepsAntd)`
  .ant-steps-item-icon {
    margin-top: 3px !important;
    margin-right: 5px;
  }

  .ant-steps-item-title {
    color: ${(props) => props.theme.discordleColors.text} !important;
  }

  .ant-steps-item-title::after {
    background-color: ${(props) => props.theme.discordleColors.text} !important;
  }
`;

export const Load = styled(Row)`
  height: 250px;
  font-size: 20pt;
`;

export const MessageTabTitle = styled.span`
  margin-top: -1px;
  margin-left: 4px;
`;

export const SwitchDescription = styled.span`
  color: ${(props) => props.theme.discordleColors.text};
  font-size: 12pt;
  margin-left: 10px;
`;

export const ModalTitle = styled.span`
  color: ${(props) => props.theme.discordleColors.text};
  font-size: 20pt;
  margin-left: 10px;
  margin-right: 10px;
`;
