import { IMessage } from 'services/DiscordMessages/IDiscordMessagesService';
import { FilterMessageEnum, IFilterMessageResponse } from './filterMessageEnum';
import { Image } from 'antd_components';

export default function filterMessage(message: IMessage, authors: string[]) {
  const emptyContent: JSX.Element[] = [];
  const emptyMessage = {} as IMessage;

  const response: IFilterMessageResponse = {
    messageType: FilterMessageEnum.isText,
    formattedAttachs: emptyContent,
    urlLink: '',
    authors: [],
    message: emptyMessage,
  };

  if (message.attachments.length) {
    response.messageType = FilterMessageEnum.isImage;

    message.attachments.forEach(({ url }, index) => {
      response.formattedAttachs.push(
        <Image
          preview={false}
          src={url}
          alt={`image_${index}`}
          height={500}
          width="100%"
        />
      );
    });
  }

  if (message.content.includes('<@')) {
    response.messageType = FilterMessageEnum.isText;

    message.mentions.map(({ username, id }) => {
      message.content = message.content.replaceAll(`<@${id}>`, `@${username}`);
    });
  }

  const includeLink =
    message.content.includes('https://') || message.content.includes('http://');

  if (includeLink) {
    response.messageType = FilterMessageEnum.isLink;

    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

    message.content = message.content.replace(urlRegex, (content: string) => {
      let hyperlink = content;

      if (!hyperlink.match('^https?://')) hyperlink = 'http://' + hyperlink;

      response.urlLink = hyperlink;

      return hyperlink;
    });
  }

  if (message.attachments.length && message.content.length)
    response.messageType = FilterMessageEnum.isImageWithText;

  if (message.attachments.length && includeLink)
    response.messageType = FilterMessageEnum.isImageWithTextAndLink;

  if (!message.attachments.length && includeLink)
    response.messageType = FilterMessageEnum.isImageWithTextAndLink;

  response.message = message;
  response.authors = authors;

  return response;
}
