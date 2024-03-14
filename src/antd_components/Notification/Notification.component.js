import { notification as antdNotification } from 'antd';
import { FeatherIcons } from 'antd_components';

const notification = {
  success(title, description) {
    antdNotification.success({
      icon: <FeatherIcons icon="check" color="green" />,
      message: title ?? 'Sucesso',
      description: description,
      duration: 5,
      placement: 'topRight',
    });
  },
  error(title, description) {
    antdNotification.error({
      icon: <FeatherIcons icon="x" color="red" />,
      message: title ?? 'Erro',
      description: description,
      duration: 5,
      placement: 'topRight',
    });
  },
};

export default notification;
