import { IMessage } from 'services/DiscordMessages/IDiscordMessagesService';
import { FilterMessageEnum, IFilterMessageResponse } from './filterMessageEnum';
import { Image } from 'antd_components';

export default function filterMessage(message: IMessage) {
  const emptyContent: JSX.Element[] = [];

  const response: IFilterMessageResponse = {
    messageType: [FilterMessageEnum.isText],
    formattedAttachs: emptyContent,
  };

  if (message.attachments.length) {
    response.messageType.push(FilterMessageEnum.isImage);

    message.attachments.forEach(({ url, height, width }, index) => {
      response.formattedAttachs.push(
        <Image
          preview={false}
          src={url}
          height={height > 350 ? 350 : height}
          width={width > 500 ? 500 : width}
          alt={`image_${index}`}
        />
      );
    });
  }

  if (message.content.includes('<@')) {
    response.messageType.push(FilterMessageEnum.isMention);

    message.mentions.map(({ username, id }) => {
      message.content = message.content.replaceAll(`<@${id}>`, `@${username}`);
    });
  }

  const link = 'https://' || 'http://';

  if (message.content.includes(link)) {
    response.messageType.push(FilterMessageEnum.isLink);
    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

    message.content = message.content.replace(urlRegex, function (url: string) {
      let hyperlink = url;
      if (!hyperlink.match('^https?://')) {
        hyperlink = 'http://' + hyperlink;
      }
      return (
        '<a href="' +
        hyperlink +
        '" target="_blank" rel="noopener noreferrer">' +
        url +
        '</a>'
      );
    });
  }

  if (!message.content.length && message.attachments.length) {
    response.messageType = response.messageType.filter(
      (x) => x === FilterMessageEnum.isImage
    );
  }

  return response;
}
