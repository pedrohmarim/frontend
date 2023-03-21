import { notification as antdNotification } from 'antd';
import * as I from './INotification';

const notification = {
  success({ title, description, duration }: I.INotification) {
    antdNotification.success({
      message: title || 'Sucesso',
      description,
      duration,
    });
  },
  warning({ title, description, duration }: I.INotification) {
    antdNotification.warning({
      message: title || 'Alerta',
      description,
      duration,
    });
  },
  error({ title, description, duration }: I.INotification) {
    antdNotification.error({
      message: title || 'Erro',
      description,
      duration,
    });
  },
  open({ title, description, duration }: I.INotification) {
    antdNotification.open({
      message: title || 'Aviso!',
      description,
      duration,
    });
  },
};

export default notification;
