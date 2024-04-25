import { create } from 'zustand';

const useUsersStore = create()(set => ({
  users: [],
  addUser: user => {
    set(state => ({ ...state, users: [...state.users, user] }));
  },
  setUsers: users => {
    set(state => ({ ...state, users }));
  },
  deleteUser: ({ id }) => {
    set(state => ({ ...state, users: state.users.filter(user => user.id !== id) }));
  },
}));

export default useUsersStore;
