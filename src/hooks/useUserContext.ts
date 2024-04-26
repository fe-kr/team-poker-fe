import { createContext, useContext } from 'react';

export const UserContext = createContext({});

const useUserContext = () => useContext(UserContext);

export default useUserContext;
