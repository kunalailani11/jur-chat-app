import { get, post } from './';
import { endpoints } from './endpoints';
import { ConversationType } from './models/conversation';

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

const setNewConversation = (payload: conversationPayloadType): Promise<void> => {
  return post(endpoints.conversations, payload);
};

const sendNewMessage = (id, payload): Promise<void> => {
  return post(endpoints.sendMessage(id), payload);
};

export { getConversation, setNewConversation, getSpecificConversation, sendNewMessage };
