import withLayout from 'lib/hoc/pages/withLayout';
import { Button, Typography, Input } from 'antd';
import { useAppContext } from 'context/state';
import styles from '../styles/pages/indexpage.module.scss';
import User from 'common/components/User';
import { post } from 'apis';
import { useState } from 'react';
import { useRouter } from 'next/router';

const { Title } = Typography;

const NewConversation = () => {  
    const user = useAppContext();
    const router = useRouter(); 
    const [title, setTitle] = useState('');
    const { selectedContacts, userInfo: {name }} = user;
    const numOfParticipants = selectedContacts?.length;

    const inputChangeHandler = (e) => {
      const { target: { value }} = e;
      setTitle(value);
    }
    const startConversation = () => {
      const contactIds = selectedContacts?.map((item) => item.id);
      const payload = {
        title,
        contact_ids: contactIds
      }
        post('/conversations', payload).then((res) => {          
          if (res && res?.id) {
            const id = res.id;
            router.push(`/start-conversation/${id}`)
          }
        })
    }
  return (
    <>
    <div className={styles.header}>
      <Title level={2}>Welcome {name}!</Title>
      <Title level={5}>Give title to start a new conversation with {numOfParticipants} participants</Title>            
    </div>
    <div className={styles.selected_contacts}>
    {selectedContacts && selectedContacts?.length > 0 && selectedContacts?.map((item) => (
        <User item={item} isSelectionDisabled /> 
    ))}         
    </div>
    <div className={styles.start_conversation_footer}>
        <Input name="conversation_topic" onChange={inputChangeHandler} />
        <Button onClick={startConversation}>Start Conversation</Button>
    </div>
  </>
)
}

export default withLayout(NewConversation);
