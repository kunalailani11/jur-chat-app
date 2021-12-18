import withLayout from 'lib/hoc/pages/withLayout';
import { Button, Typography, Input } from 'antd';
import { GetServerSideProps } from 'next';
import { useAppContext } from 'context/state';
import styles from '../../../styles/pages/indexpage.module.scss';
import User from 'common/components/User';
import { get, post } from 'apis';
import { ConversationMessage } from 'apis/models/conversation';
import { useEffect, useState } from 'react';
import { getSpecificConversation, sendNewMessage } from 'apis/conversation';
import Conversation from 'common/components/Conversation';

const { Title } = Typography;

type StartConversationProps = {
  id: string;
};

const StartConversation: React.FC<StartConversationProps> = ({ id }) => {
  const [title, setTitle] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<Array<ConversationMessage>>([]);

  useEffect(() => {
    getConversations();
  }, []);

  const getConversations = async (): Promise<void> => {
    const data = await getSpecificConversation(id);
    if (data) {
      console.log('data', data);
      setTitle(data.title);
      setMessages(data.recent_messages);
    }
  };

  const inputChangeHandler = (e): void => {
    const {
      target: { value },
    } = e;
    setNewMessage(value);
  };
  const sendMessage = (): void => {
    const payload = {
      content: newMessage,
    };
    sendNewMessage(id, payload).then(() => {
      setNewMessage('');
      getConversations();
    });
  };
  return (
    <>
      <div className={styles.header}>
        <Title level={2}>{title}</Title>
      </div>
      <div className={styles.conversations_wrapper}>
        {messages &&
          messages?.length > 0 &&
          messages?.map((item) => (
            <Conversation title={item.sender_name} description={item.content} key={item.id} />
          ))}
      </div>
      <div className={styles.start_conversation_footer}>
        <Input
          name="conversation_topic"
          value={newMessage}
          onChange={inputChangeHandler}
          onPressEnter={inputChangeHandler}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query['id'];
  return {
    props: {
      id,
    },
  };
};

export default withLayout(StartConversation);
