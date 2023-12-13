import { logout } from '../slices/user.slices/user.slice';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { ApiRepoUsers } from '../services/users/api.repo.users';
import { User, UserLogin } from '../models/user.model';
import { Storage } from '../services/storage';
import * as ac from '../slices/user.slices/user.slice';
import { getUserByIdThunk, loginThunk } from '../slices/user.slices/user.thunk';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export function useUsers() {
  const userStore = new Storage<{ token: string; id: string }>('user');
  const {
    loggedUser: currentUserItem,
    loggedUser,
    user,
  } = useSelector((state: RootState) => state.usersState);

  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new ApiRepoUsers(), []);

  const register = (newUser: Partial<User>) => {
    repo.registerUser(newUser);
  };

  const login = (loginUser: UserLogin) => {
    dispatch(loginThunk({ loginUser, repo, userStore }));
  };

  const getUserByID = () => {
    if (currentUserItem) {
      dispatch(
        getUserByIdThunk({
          userId: currentUserItem.id,
          repo,
        })
      );
    }
  };

  const makeLogOut = () => {
    dispatch(ac.logout());
  };

  const logoutUser = () => {
    dispatch(logout());
    userStore.remove();
  };

  return {
    user,
    loggedUser,
    logoutUser,
    login,
    register,
    makeLogOut,
    getUserByID,
  };
}
