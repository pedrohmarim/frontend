import { IMessage } from 'services/DiscordleService/IDiscordleService';
import { FilterMessageEnum, IFilterMessageResponse } from './filterMessageEnum';
import { Image } from 'antd_components';

export default function filterMessage(message: IMessage) {
  const emptyContent: JSX.Element[] = [];
  const emptyMessage = {} as IMessage;

  const response: IFilterMessageResponse = {
    messageType: FilterMessageEnum.isText,
    formattedAttachs: emptyContent,
    urlLink: '',
    message: emptyMessage,
  };

  if (message.Attachments.length) {
    response.messageType = FilterMessageEnum.isImage;

    message.Attachments.forEach(({ Url }, index) => {
      response.formattedAttachs.push(
        <Image
          preview={false}
          src={Url}
          alt={`image_${index}`}
          height={500}
          width="100%"
        />
      );
    });
  }

  if (message.Content.includes('<@')) {
    response.messageType = FilterMessageEnum.isText;

    message.Mentions.map(({ Username, Id }) => {
      message.Content = message.Content.replaceAll(`<@${Id}>`, `@${Username}`);
    });
  }

  const includeLink =
    message.Content.includes('https://') || message.Content.includes('http://');

  if (includeLink) {
    response.messageType = FilterMessageEnum.isLink;

    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

    message.Content = message.Content.replace(urlRegex, (content: string) => {
      let hyperlink = content;

      if (!hyperlink.match('^https?://')) hyperlink = 'http://' + hyperlink;

      response.urlLink = hyperlink;

      return hyperlink;
    });
  }

  if (message.Attachments.length && message.Content.length)
    response.messageType = FilterMessageEnum.isImageWithText;

  if (message.Attachments.length && includeLink)
    response.messageType = FilterMessageEnum.isImageWithTextAndLink;

  if (!message.Attachments.length && includeLink)
    response.messageType = FilterMessageEnum.isImageWithTextAndLink;

  response.message = message;

  return response;
}
