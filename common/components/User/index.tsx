import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './User.module.scss';

type UserPros = {
  item: {
    name: string;
    title?: string;
    sender_name?: string;
    content?: string;
  },
  selectedUser?: string | Array<string>;
  selectUser?: (name) => void;
  singleSelect?: boolean;
  isSelectionDisabled?: boolean;
}

const User = ({ item, selectUser, selectedUser, singleSelect, isSelectionDisabled }: UserPros): JSX.Element => {
  const hasSelectedUser = (name): boolean => {
    return singleSelect ? selectedUser === name : (selectedUser ? selectedUser.indexOf(name) > -1 : false)
  }
  const active_class_name = hasSelectedUser(item.name) ? styles.active_user : '';

  const clickHandler = () => {
    if (isSelectionDisabled) return false;   
    selectUser && selectUser(item)
  }

  return (
    <div
      role="presentation"
      className={`${styles.user_wrap} ${active_class_name}`}
      onClick={() => clickHandler()}
    >
      <Avatar icon={<UserOutlined />} className={styles.avatar} />
      <div className={styles.user_content}>
        <h4 className={styles.title}>{item.name || item.sender_name} </h4>
        {false && <h5>Hi</h5>}
        {item.content && <div className={styles.description}>{item.content}</div>}
      </div>
    </div>
  );
};

export default User;
