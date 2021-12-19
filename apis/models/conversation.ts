export interface ConversationMessage {
  id: number;
  content: string;
  sender_id: number;
  sender_name: string;
}

export interface ConversationType {
  title: string;
  id: number;
  last_message: Array<ConversationMessage>;
  recent_messages: Array<ConversationMessage>;
}

export interface CreateConversationType {
  id: number;
}
