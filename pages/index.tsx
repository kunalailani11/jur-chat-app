import { GetServerSideProps } from 'next';
import withLayout from 'lib/hoc/pages/withLayout';
import ContactList from 'components/ContactList';
import { Button, Typography } from 'antd';
import { useRouter } from 'next/router';
import { setCookie, AuthCookie } from 'lib/cookies';
import styles from '../styles/pages/indexpage.module.scss';
import { useAppContext } from 'context/state';
import { getContacts } from 'apis/contacts';
import { Contacts } from 'apis/models/contacts';
import { getConversation } from 'apis/conversation';

const { Title } = Typography;

type Props = {
  contacts: Contacts[];
};

const IndexPage: React.FC<Props> = ({ contacts }) => {
  const user = useAppContext();
  const router = useRouter();

  const redirectUserToMyContacts = async (): Promise<void> => {
    const { userInfo } = user;
    setCookie(AuthCookie.userId, userInfo.id);
    const conversations = await getConversation();
    if (conversations.length > 0) {
      router.push('/my-conversations');
    } else {
      router.push('/my-contacts');
    }
  };
  const setUserInfo = (selectUserItem): void => {
    user.setUserInfo && user.setUserInfo({ name: selectUserItem.name, id: selectUserItem.id });
  };

  return (
    <>
      <div className={styles.header}>
        <Title level={2}>Let us know who you are</Title>
      </div>
      <div className={styles.contact_list_wrapper}>
        {contacts && contacts.length > 0 && (
          <ContactList data={contacts} singleSelect setUserInfo={setUserInfo} />
        )}
      </div>
      <div className={styles.continue_btn_wrap}>
        <Button onClick={redirectUserToMyContacts}>Continue</Button>
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
export default withLayout(IndexPage);
