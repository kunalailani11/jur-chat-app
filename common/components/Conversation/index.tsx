import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './Conversation.module.scss';

type ConversationProps = {
  title: string;
  description: string;
  sender_name?: string;
  id?: number;
  redirectToSpecificConversation?(id: number): void;
};

const Conversation = ({
  title,
  description,
  sender_name,
  id,
  redirectToSpecificConversation,
}: ConversationProps): JSX.Element => {
  const clickHandler = (): void => {
    redirectToSpecificConversation && id && redirectToSpecificConversation(id);
  };

  return (
    <div role="presentation" className={`${styles.user_wrap}`} onClick={() => clickHandler()}>
      <Avatar icon={<UserOutlined />} className={styles.avatar} />
      <div className={styles.user_content}>
        <h4 className={styles.title}>{title} </h4>
        {sender_name && <h5>{sender_name}</h5>}
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default Conversation;
