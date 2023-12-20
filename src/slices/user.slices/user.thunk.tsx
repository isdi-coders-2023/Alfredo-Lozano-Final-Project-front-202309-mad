import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types/login.user';
import { User, UserLogin } from '../../models/user.model';
import { ApiRepoUsers } from '../../services/users/api.repo.users';
import { Storage } from '../../services/storage';

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

export const loginTokenThunk = createAsyncThunk<
  LoginResponse,
  {
    token: string;
    repo: ApiRepoUsers;
    userStore: Storage<{ token: string; id: string }>;
  }
>('loginWithToken', async ({ token, repo, userStore }) => {
  const loginResponse = await repo.loginWithToken(token);
  userStore.set({ token: loginResponse.token, id: loginResponse.user.id });
  return loginResponse;
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
  { userId: string; repo: ApiRepoUsers }
>('getByID', async (params) => {
  const { userId, repo } = params;
  const result = await repo.getUserbyID(userId);
  return result;
});

export const addBeertoTasteThunk = createAsyncThunk<
  User,
  { beer: string; repo: ApiRepoUsers }
>('addBeer', async ({ beer, repo }) => {
  const result = await repo.addBeertoTaste(beer);
  return result;
});

export const delBeertoTasteThunk = createAsyncThunk<
  User,
  { beer: string; repo: ApiRepoUsers }
>('addBeer', async ({ beer, repo }) => {
  const result = await repo.delBeertoTaste(beer);
  return result;
});
