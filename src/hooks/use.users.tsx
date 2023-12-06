import { logout } from '../slices/user.slices/user.slice';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { ApiRepoUsers } from '../services/api.repo.users';
import { User, UserLogin } from '../models/user.model';
import { Storage } from '../services/storage';
import * as ac from '../slices/user.slices/user.slice';

export function useUsers() {
  const userStore = new Storage<{ token: string }>('user');
  const dispatch = useDispatch<AppDispatch>();
  const repo = new ApiRepoUsers();

  const register = (newUser: Partial<User>) => {
    repo.registerUser(newUser);
  };

  const login = (loginUser: UserLogin) => {
    repo.login(loginUser);
  };

  const makeLogOut = () => {
    dispatch(ac.logout());
  };

  const logoutUser = () => {
    dispatch(logout());
    userStore.remove();
  };

  return {
    logoutUser,
    login,
    register,
    makeLogOut,
  };
}