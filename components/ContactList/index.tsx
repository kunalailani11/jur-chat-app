import User from 'common/components/User';
import { useState } from 'react';
import styles from './ContactList.module.scss';

type ContactListProps = {
    data: Array<any>;
    singleSelect?: boolean;
    setUserInfo?: (userInfo) => void;
    setSelectedContacts?: (contactInfo) => void;
}

const ContactList = ({ data, singleSelect, setUserInfo, setSelectedContacts }: ContactListProps) => {     
    const [selectedUser, setSelectedUser] = useState<string | Array<string>>(singleSelect ? '' : []);
    const selectUser = (selectUserItem): void => {  
        if (singleSelect) {            
            setSelectedUser(selectUserItem.name);
            setUserInfo && setUserInfo(selectUserItem);
        }
        else {
            if (typeof selectedUser === 'object'){
                if (!selectedUser.includes(selectUserItem.name)) {
                    selectedUser.push(selectUserItem.name);
                    setSelectedUser([...selectedUser]);
                    const selectedContacts = data.filter((item) => selectedUser.includes(item.name))
                    setSelectedContacts && setSelectedContacts([...selectedContacts]);
                }                
            } 
        }
    }    
    return (
        <div className={styles.contact_list_wrapper}>
        {data.length > 0 && data.map((item) => (
            <div className={styles.contact_list} key={item.id}>
                <User singleSelect={singleSelect} item={item} selectUser={selectUser} selectedUser={selectedUser} />
            </div>
        ))}  
        </div>      
    )
}

export default ContactList;