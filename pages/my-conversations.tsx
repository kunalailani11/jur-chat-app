import withLayout from 'lib/hoc/pages/withLayout';
import { Button, Typography } from 'antd';
import { useAppContext } from 'context/state';
import styles from '../styles/pages/indexpage.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getConversation } from 'apis/conversation';
import { ConversationType } from 'apis/models/conversation';
import Conversation from 'common/components/Conversation';

const { Title } = Typography;

const MyConversation: React.FC = () => {
  const user = useAppContext();
  const router = useRouter();
  const [conversations, setConversations] = useState<Array<ConversationType>>([]);
  const {
    userInfo: { id },
  } = user;

  useEffect(() => {
    getMyConversations();
  }, []);

  const getMyConversations = async (): Promise<void> => {
    const data = await getConversation();
    if (data && data.length > 0) {
      setConversations(data);
    }
  };

  const getValueFromProp = (item, prop): string => {
    const lastMessage = item.last_message[0];
    if (lastMessage) {
      if (prop === 'sender_name') return lastMessage.sender_id == id ? 'You' : lastMessage[prop];
      return lastMessage[prop];
    }
    return '';
  };

  const createNewConversation = (): void => {
    router.push('/my-contacts');
  };

  const redirectToSpecificConversation = (id): void => {
    router.push(`/start-conversation/${id}`);
  };

  return (
    <>
      <div className={styles.header}>
        <Title level={2}>Your Conversations</Title>
      </div>

      <div className={styles.conversations_wrapper}>
        {conversations &&
          conversations?.length > 0 &&
          conversations?.map((item) => (
            <div className={styles.single_conversation} key={item.id}>
              <Conversation
                title={item.title}
                sender_name={getValueFromProp(item, 'sender_name')}
                description={getValueFromProp(item, 'content')}
                id={item.id}
                redirectToSpecificConversation={redirectToSpecificConversation}
              />
            </div>
          ))}
      </div>
      <div className={styles.start_conversation_footer}>
        <Button onClick={createNewConversation}>Create New Conversation</Button>
      </div>
    </>
  );
};

export default withLayout(MyConversation);
