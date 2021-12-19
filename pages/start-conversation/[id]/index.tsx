import withLayout from 'lib/hoc/pages/withLayout';
import { Button, Typography, Input } from 'antd';
import { GetServerSideProps } from 'next';
import styles from '../../../styles/pages/indexpage.module.scss';
import { ConversationMessage } from 'apis/models/conversation';
import { useEffect, useState } from 'react';
import { getSpecificConversation, getSpecificMessage, sendNewMessage } from 'apis/conversation';
import Conversation from 'common/components/Conversation';
import { useAppContext } from 'context/state';
import { DateTime } from 'luxon';
import { isToday } from 'lib/date';

const { Title } = Typography;

type StartConversationProps = {
  id: string;
};

const StartConversation: React.FC<StartConversationProps> = ({ id }) => {
  const user = useAppContext();
  const [title, setTitle] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<Array<ConversationMessage>>([]);
  const {
    userInfo: { id: user_id },
  } = user;

  useEffect(() => {
    getConversations();
  }, []);

  const getConversations = async (): Promise<void> => {
    const data = await getSpecificConversation(id);
    if (data) {
      setTitle(data.title);
      attachTimeStampWithContent(data.recent_messages);
    }
  };

  const attachTimeStampWithContent = async (recent_messages): Promise<void> => {
    const messageWithTimeStamp: ConversationMessage[] = [];
    for (let i = 0; i < recent_messages.length; i++) {
      if (recent_messages[i].id) {
        const specifiMessage = await getSpecificMessage(id, recent_messages[i].id);
        if (specifiMessage) {
          messageWithTimeStamp.push({
            ...specifiMessage,
          });
        }
      }
    }
    setMessages(messageWithTimeStamp);
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

  const convertToMeaningfullDate = (date): string => {
    const day = DateTime.fromJSDate(new Date(date));
    if (isToday(date)) return `${day.toFormat('t a')} Today`;
    return day.toFormat('t a');
  };

  const getDescription = (item): string => {
    let desc = `${item.sender_name} at ${convertToMeaningfullDate(item.updated_at)}`;
    if (item.sender_id == user_id) {
      desc = `You at ${convertToMeaningfullDate(item.updated_at)}`;
    }
    return desc;
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
            <Conversation title={item.content} description={getDescription(item)} key={item.id} />
          ))}
      </div>
      <div className={styles.start_conversation_footer}>
        <Input
          name="new_message"
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
