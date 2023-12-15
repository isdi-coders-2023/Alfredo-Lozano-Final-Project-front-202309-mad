import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types/login.user';
import { User, UserLogin } from '../../models/user.model';
import { ApiRepoUsers } from '../../services/users/api.repo.users';
import { Storage } from '../../services/storage';
import { Beer } from '../../models/beer.model';

export const loginThunk = createAsyncThunk<
  LoginResponse,
  {
    loginUser: UserLogin;
    repo: ApiRepoUsers;
    userStore: Storage<{ token: string; id: string }>;
  }
>('login', async ({ loginUser, repo, userStore }) => {
  const result = await repo.login(loginUser);
  userStore.set({
    token: result.token,
    id: result.user.id,
  });
  return result;
});

export const registerThunk = createAsyncThunk<
  User,
  {
    newUser: Partial<User>;
    repo: ApiRepoUsers;
  }
>('register', async ({ newUser, repo }) => {
  const result = await repo.registerUser(newUser);
  return result;
});

export const getUserByIdThunk = createAsyncThunk<
  User,
  { userId: User['id']; repo: ApiRepoUsers }
>('getByID', async ({ userId, repo }) => {
  const result = await repo.getUserbyID(userId);
  return result;
});

export const addBeertoTasteThunk = createAsyncThunk<
  User,
  { userId: User['id']; beerId: Beer['id']; repo: ApiRepoUsers }
>('addBeer', async ({ userId, repo, beerId }) => {
  const result = await repo.addBeertoTaste(userId, beerId);
  return result;
});
