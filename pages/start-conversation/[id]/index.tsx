import withLayout from 'lib/hoc/pages/withLayout';
import { Button, Typography, Input } from 'antd';
import { GetServerSideProps } from 'next';
import { useAppContext } from 'context/state';
import styles from '../../../styles/pages/indexpage.module.scss';
import User from 'common/components/User';
import { get, post } from 'apis';
import { useEffect, useState } from 'react';

const { Title } = Typography;

const StartConversation = ({id}) => {  
    const user = useAppContext();
    const [title, setTitle] = useState('');  
    const [messages, setMessages]   = useState([]);
    const { selectedContacts } = user;    

    useEffect(() => {
      getConversations();           
    }, []);

    const getConversations = async () => {     
      const data = await get(`/conversations/${id}`);
      if (data) {
        setTitle(data.title);
          setMessages(data.messages);
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
      <Title level={2}>{title}</Title>      
    </div>
    <div className={styles.selected_contacts}>
    {messages && messages?.length > 0 && messages?.map((item) => (
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query['id'];
  // const conversations = await get(`/conversations/${id}`);
    return {
        props: {
            id,
            // conversations
        }
    }
  }

export default withLayout(StartConversation);
