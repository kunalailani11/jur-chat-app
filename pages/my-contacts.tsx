import { GetServerSideProps } from 'next';
import withLayout from 'lib/hoc/pages/withLayout';
import ContactList from 'components/ContactList';
import { Button, Typography } from 'antd';
import { useAppContext } from 'context/state';
import styles from '../styles/pages/indexpage.module.scss';
import { useRouter } from 'next/router';
import { getContacts } from 'apis/contacts';
import { Contacts } from 'apis/models/contacts';

const { Title } = Typography;

type MyContactProps = {
  contacts: Contacts[];
};

const MyContacts: React.FC<MyContactProps> = ({ contacts }) => {
  const user = useAppContext();
  const router = useRouter();
  const {
    setSelectedContacts,
    userInfo: { name },
  } = user;
  const filteredContacts = contacts.filter((item) => item.id != user?.userInfo.id);
  const seeContactList = (): void => {
    router.push('/new-conversation');
  };
  return (
    <>
      <div className={styles.header + ' ' + styles.no_conversation_header}>
        <Title level={2}>Welcome {name}!</Title>
        <Title level={5}>{`You don't have any conversations`}</Title>
        <Title level={2} className={styles.sub_content}>
          Select contacts to message
        </Title>
      </div>

      <div className={styles.no_conversations_contact_list_wrapper}>
        {contacts && contacts.length > 0 && (
          <ContactList data={filteredContacts} setSelectedContacts={setSelectedContacts} />
        )}
      </div>
      <div className={styles.continue_btn_wrap}>
        <Button onClick={seeContactList}>Continue</Button>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const contacts = await getContacts();
  return {
    props: {
      contacts,
    },
  };
};
export default withLayout(MyContacts);
