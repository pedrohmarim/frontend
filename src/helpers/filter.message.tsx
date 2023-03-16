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

  if (message.content.includes('<@')) {
    response.messageType = FilterMessageEnum.isMention;

    message.mentions.map(({ username, id }) => {
      message.content = message.content.replaceAll(`<@${id}>`, `@${username}`);
    });
  }

  const link = 'https://' || 'http://';

  if (message.content.includes(link)) {
    let url = message.content;

    const positions = message.content.split(' ');

    url = positions.find((x) => x.includes(link)) || '';

    if (message.content.includes('@')) {
      const mentions = positions.filter((x) => !x.includes(link));

      message.content = mentions.toString().replaceAll(',', ' ');
    } else {
      const notUrlPositions = positions.filter((x) => !x.includes(link));
      const hasMoreText = notUrlPositions.length > 0;

      if (hasMoreText)
        message.content = notUrlPositions.toString().replaceAll(',', ' ');
      else
        message.content = 'A mensagem selecionada se encontra no link abaixo.';
    }

    response.messageType = FilterMessageEnum.isLink;

    response.formattedAttachs.push(
      <a href={url} key={1} target="_blank" rel="noreferrer">
        {url}
      </a>
    );
  }

  response.message = message;

  return response;
}
