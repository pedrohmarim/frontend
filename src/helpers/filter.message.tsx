import { IMessage } from 'services/DiscordMessages/IDiscordMessagesService';
import { FilterMessageEnum, IFilterMessageResponse } from './filterMessageEnum';
import { Image } from 'antd_components';

const emptyContent: JSX.Element[] = [];
const emptyMessage = {} as IMessage;

const response: IFilterMessageResponse = {
  messageType: FilterMessageEnum.isText,
  formattedAttachs: emptyContent,
  message: emptyMessage,
};

export default function filterMessage(message: IMessage) {
  if (message.attachments.length) {
    response.messageType = FilterMessageEnum.isImage;

    message.attachments.forEach(({ url, height, width }, index) => {
      response.formattedAttachs.push(
        <Image
          preview={false}
          src={url}
          height={height > 300 ? 300 : height}
          width={width > 500 ? 500 : width}
          alt={`image_${index}`}
        />
      );
    });
  }

  if (message.content.includes('https://')) {
    response.messageType = FilterMessageEnum.isLink;

    response.formattedAttachs.push(
      <a href={message.content} key={1} target="_blank" rel="noreferrer">
        {message.content}
      </a>
    );

    message.content = 'A mensagem selecionada se encontrada no link abaixo.';
  }

  if (message.content.includes('<@')) {
    response.messageType = FilterMessageEnum.isMention;

    message.mentions.map(({ username, id }) => {
      message.content = message.content.replace(`<@${id}>`, `@${username}`);
    });
  }

  response.message = message;

  return response;
}
