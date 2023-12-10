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
    userStore: Storage<{ token: string }>;
  }
>('login', async ({ loginUser, repo, userStore }) => {
  const result = await repo.login(loginUser);
  userStore.set({ token: result.token });
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
