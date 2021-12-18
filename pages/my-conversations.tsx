import withLayout from 'lib/hoc/pages/withLayout';
import { Button, Typography, Input } from 'antd';
import { GetServerSideProps } from 'next';
import { useAppContext } from 'context/state';
import styles from '../styles/pages/indexpage.module.scss';
import User from 'common/components/User';
import { get, post } from 'apis';
import { useEffect, useState } from 'react';

const { Title } = Typography;

const MyConversation = () => {  
    const user = useAppContext();
    const [title, setTitle] = useState('');  
    const [conversations, setConversations]   = useState([]);
    const { selectedContacts, userInfo: {id} } = user;    

    useEffect(() => {
      id && getMyConversations();           
    }, []);

    const getMyConversations = async () => {               
      const data = await get(`/conversations/${id}`);
      
      console.log('data', data);
      if (data && data.recent_messages.length > 0) {
        setConversations(data.recent_messages);
      }
    }


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
          console.log(res);
        })
    }
  return (
    <>
    <div className={styles.header}>
      <Title level={2}>Your Conversations</Title>      
    </div>

    <div className={styles.conversations_wrapper}>
    {conversations && conversations?.length > 0 && conversations?.map((item) => (
      <div className={styles.single_conversation}> <User item={item} isSelectionDisabled /> </div>
    ))}
    </div>          
    <div className={styles.start_conversation_footer}>        
        <Button onClick={startConversation}>Start Conversation</Button>
    </div>
  </>
)
}

export default withLayout(MyConversation);
