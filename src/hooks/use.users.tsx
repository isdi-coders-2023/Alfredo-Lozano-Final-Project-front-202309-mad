import { logout } from '../slices/user.slices/user.slice';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { ApiRepoUsers } from '../services/api.repo.users';
import { User, UserLogin } from '../models/user.model';

export function useUsers() {
  const { token } = useSelector((state: RootState) => state.usersState);
  const dispatch = useDispatch<AppDispatch>();
  const repo = new ApiRepoUsers();

  const register = (newUser: Partial<User>) => {
    repo.registerUser(newUser);
  };

  const login = (loginUser: UserLogin) => {
    repo.login(loginUser);
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    token,
    logoutUser,
    login,
    register,
  };
}
