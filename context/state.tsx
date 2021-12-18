import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type UserInfo = {
  name: string;
  id: number;
}

type AppContextType = {
  userInfo: UserInfo;
  setUserInfo?: Dispatch<SetStateAction<UserInfo>>;
  selectedContacts?: Array<UserInfo>;
  setSelectedContacts?: Dispatch<SetStateAction<Array<UserInfo>>>;
}

const sharedState = {
  name: '',
  id: 0
}

const AppContext = createContext<AppContextType>({ userInfo: sharedState });

const AppWrapper: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ ...sharedState });
  const [selectedContacts, setSelectedContacts] = useState<Array<UserInfo>>([]);
  return <AppContext.Provider
    value={{ userInfo, setUserInfo: setUserInfo, 
      selectedContacts, setSelectedContacts: setSelectedContacts }}>{children}</AppContext.Provider>
}

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
}

export default AppWrapper;
