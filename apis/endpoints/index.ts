const endpoints = {
  contacts: `/contacts`,
  conversations: `/conversations`,
  specificConversation: (id): string => `/conversations/${id}`,
  sendMessage: (id): string => `/conversations/${id}/messages`,
};
export { endpoints };
