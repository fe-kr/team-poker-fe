import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import tokenStorage from '@services/tokenStorage';

export default create()(
  immer(set => ({
    currentUser: tokenStorage.parseItem(),
    users: [],
    addUser: user =>
      set(state => {
        state.users.push(user);
      }),
    setUsers: users =>
      set(state => {
        state.users = users;
      }),
    deleteUser: ({ id }) =>
      set(state => {
        state.users = state.users.filter(user => user.id !== id);
      }),
  })),
);
