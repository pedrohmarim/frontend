import { Result as ResultAntd } from 'antd';

export default function Result({ status, title, subTitle, extra }) {
  return (
    <ResultAntd
      status={status}
      title={title}
      subTitle={subTitle}
      extra={extra}
    />
  );
}
