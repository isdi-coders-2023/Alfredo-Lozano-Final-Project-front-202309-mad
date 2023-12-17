import { logout } from '../slices/user.slices/user.slice';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { ApiRepoUsers } from '../services/users/api.repo.users';
import { User, UserLogin } from '../models/user.model';
import { Storage } from '../services/storage';
import * as ac from '../slices/user.slices/user.slice';
import { getUserByIdThunk, loginThunk } from '../slices/user.slices/user.thunk';
import { useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { Beer } from '../models/beer.model';
import { useParams } from 'react-router-dom';

export function useUsers() {
  const userStore = new Storage<{ token: string; id: string }>('user');
  const { loggedUser, user } = useSelector(
    (state: RootState) => state.usersState
  );

  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new ApiRepoUsers(), []);
  const { userId } = useParams();

  const loadUserId = useCallback(async () => {
    if (userId) {
      dispatch(getUserByIdThunk({ userId, repo }));
    }
  }, [dispatch, repo]);

  const register = (newUser: Partial<User>) => {
    repo.registerUser(newUser);
  };

  const handleUserDetails = async (user: User) => {
    dispatch(ac.setCurrentUser(user));
  };

  const addBeer = async (beer: Beer) => {
    repo.addBeertoTaste(beer);
  };

  const login = (loginUser: UserLogin) => {
    dispatch(loginThunk({ loginUser, repo, userStore }));
  };

  const getUserByID = () => {
    if (loggedUser) {
      dispatch(
        getUserByIdThunk({
          userId: loggedUser.id,
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
    loadUserId,
    addBeer,
    logoutUser,
    login,
    register,
    makeLogOut,
    getUserByID,
    handleUserDetails,
  };
}
