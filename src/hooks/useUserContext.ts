import { createContext, useContext } from 'react';
import { User } from '../types/entity';

interface UserContext extends User {
  isAdmin: boolean;
}

export const UserContext = createContext({} as UserContext);

const useUserContext = () => useContext(UserContext);

export default useUserContext;
