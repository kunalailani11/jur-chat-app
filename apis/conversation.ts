import { get, post } from './';
import { endpoints } from './endpoints';
import {
  ConversationType,
  ConversationMessage,
  CreateConversationType,
} from './models/conversation';

type conversationPayloadType = {
  title: string;
  contact_ids: number[] | undefined;
};

const getConversation = (): Promise<ConversationType[]> => {
  return get<ConversationType[]>(endpoints.conversations);
};

const getSpecificConversation = (id: string): Promise<ConversationType> => {
  return get<ConversationType>(endpoints.specificConversation(id));
};

const getSpecificMessage = (id: string, messageId: string): Promise<ConversationMessage> => {
  return get<ConversationMessage>(endpoints.specificMessage(id, messageId));
};

const setNewConversation = (payload: conversationPayloadType): Promise<CreateConversationType> => {
  return post(endpoints.conversations, payload);
};

const sendNewMessage = (id: string, payload: { content: string }): Promise<void> => {
  return post(endpoints.sendMessage(id), payload);
};

export {
  getConversation,
  setNewConversation,
  getSpecificConversation,
  sendNewMessage,
  getSpecificMessage,
};
