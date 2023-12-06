import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginResponse } from "../../types/login.user";
import { User, UserLogin } from "../../models/user.model";
import { ApiRepoUsers } from "../../services/api.repo.users";

export const LoginThunk = createAsyncThunk<
  LoginResponse,
  {
    loginUser: UserLogin;
    repo: ApiRepoUsers;
  }
>("login", async ({ loginUser, repo }) => {
  const result = await repo.login(loginUser);
  return result;
});

export const registerThunk = createAsyncThunk<
  User,
  {
    newUser: Partial<User>;
    repo: ApiRepoUsers;
  }
>("register", async ({ newUser, repo }) => {
  const result = await repo.registerUser(newUser);
  return result;
});
