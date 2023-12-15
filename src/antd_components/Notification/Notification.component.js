import { notification as antdNotification } from 'antd';
import { FeatherIcons } from 'antd_components';

const notification = {
  success(description) {
    antdNotification.success({
      icon: <FeatherIcons icon="check" color="green" />,
      message: 'Sucesso',
      description: description,
      duration: 5,
      placement: 'topRight',
    });
  },
  error(description) {
    antdNotification.error({
      icon: <FeatherIcons icon="x" color="red" />,
      message: 'Erro',
      description: description,
      duration: 5,
      placement: 'topRight',
    });
  },
};

export default notification;
