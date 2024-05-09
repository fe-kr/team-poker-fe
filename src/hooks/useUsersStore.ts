import { User } from 'types/entity';
import { create } from 'zustand';
import { groupBy } from '@utils/common';

type Users = { [key: string]: User };

interface UsersState {
  users: Users;
  setUsers: (users: Users) => void;
  addUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

const useUsersStore = create<UsersState>()((set, get) => ({
  users: {},
  addUser: user => {
    set(state => ({ ...state, users: { ...state.users, [user.id]: user } }));
  },
  setUsers: users => {
    const groupedUsers = groupBy(users, 'id');

    set(state => ({ ...state, users: groupedUsers }));
  },
  deleteUser: id => {
    const clonedUsers = { ...get().users };

    delete clonedUsers[id];

    set(state => ({ ...state, users: clonedUsers }));
  },
}));

export default useUsersStore;
