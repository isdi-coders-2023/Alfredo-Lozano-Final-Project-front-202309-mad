import { logout } from '../slices/user.slices/user.slice';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { ApiRepoUsers } from '../services/users/api.repo.users';
import { User, UserLogin } from '../models/user.model';
import { Storage } from '../services/storage';
import * as ac from '../slices/user.slices/user.slice';
import { useSelector } from 'react-redux';
import { Beer } from '../models/beer.model';
import { useMemo } from 'react';
import { loginThunk, loginTokenThunk } from '../slices/user.slices/user.thunk';

export function useUsers() {
  const userStore = new Storage<{ token: string; id: string }>('user');
  const { loggedUser, user } = useSelector(
    (state: RootState) => state.usersState
  );
  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new ApiRepoUsers(), []);
  const register = (newUser: Partial<User>) => {
    repo.registerUser(newUser);
  };

  const login = (loginUser: UserLogin) => {
    dispatch(loginThunk({ loginUser, repo, userStore }));
  };

  const loginWithToken = () => {
    const userStoreData = userStore.get();
    if (userStoreData) {
      const { token } = userStoreData;
      dispatch(loginTokenThunk({ token, repo, userStore }));
    }
  };

  const handleUserDetails = async (user: User) => {
    dispatch(ac.setCurrentUser(user));
  };

  const addBeer = async (beer: Beer['id']) => {
    repo.addBeertoTaste(beer);
  };

  const delBeer = async (beer: Beer['id']) => {
    repo.delBeertoTaste(beer);
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
    addBeer,
    delBeer,
    logoutUser,
    login,
    loginWithToken,
    register,
    makeLogOut,
    handleUserDetails,
  };
}
