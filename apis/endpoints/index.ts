const endpoints = {
  contacts: `/contacts`,
  conversations: `/conversations`,
  specificConversation: (id): string => `/conversations/${id}`,
  sendMessage: (id): string => `/conversations/${id}/messages`,
  specificMessage: (id, messageId): string => `/conversations/${id}/messages/${messageId}`,
};
export { endpoints };
