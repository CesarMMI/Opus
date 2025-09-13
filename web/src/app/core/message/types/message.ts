import { MessageType } from './message-type';

export type Message = {
  type: MessageType;
  text: string;
};
