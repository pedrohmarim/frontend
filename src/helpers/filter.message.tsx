import { IMessage } from 'services/DiscordMessages/IDiscordMessagesService';
import { FilterMessageEnum, IFilterMessageResponse } from './filterMessageEnum';
import { Image } from 'antd_components';

const emptyContent: JSX.Element[] = [];

export default function filterMessage(message: IMessage) {
  const response: IFilterMessageResponse = {
    messageType: FilterMessageEnum.isText,
    formattedAttachs: emptyContent,
  };

  if (message.attachments.length) {
    response.messageType = FilterMessageEnum.isImage;

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
    response.messageType = FilterMessageEnum.isMention;

    message.mentions.map(({ username, id }) => {
      message.content = message.content.replaceAll(`<@${id}>`, `@${username}`);
    });
  }

  const link = 'https://' || 'http://';

  if (message.content.includes(link)) {
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

  if (response.messageType === FilterMessageEnum.isText)
    response.formattedAttachs = [];

  return response;
}
