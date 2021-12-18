import { get } from './';
import { endpoints } from './endpoints';
import { Contacts } from './models/contacts';

const getContacts = (): Promise<Contacts[]> => {
  return get<Contacts[]>(endpoints.contacts);
};

export { getContacts };
