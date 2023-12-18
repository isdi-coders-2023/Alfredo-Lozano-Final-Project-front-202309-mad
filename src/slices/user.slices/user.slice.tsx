import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/user.model';
import { loginThunk, registerThunk } from './user.thunk';
import { LoginResponse } from '../../types/login.user';

type LoginState = 'idle' | 'logging' | 'error';

export type UserState = {
  loggedUser: User | null;
  userState: LoginState;
  token: string;
  user: User[];
};

const initialState: UserState = {
  loggedUser: null,
  userState: 'idle',
  token: '',
  user: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout(state: UserState) {
      state.loggedUser = null;
      state.user = [];
      state.token = '';
      state.userState = 'idle';
    },
    setCurrentUser(state: UserState, { payload }: PayloadAction<User>) {
      state.loggedUser = payload;
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      loginThunk.fulfilled,
      (state: UserState, { payload }: PayloadAction<LoginResponse>) => {
        state.loggedUser = payload.user;
        state.token = payload.token;
      }
    );

    builder.addCase(
      registerThunk.fulfilled,
      (state: UserState, { payload }) => {
        state.loggedUser = payload;
        state.userState = 'idle';
        return state;
      }
    );

    builder.addCase(registerThunk.rejected, (state: UserState) => {
      state.userState = 'error';
      return state;
    });

    builder.addCase(loginThunk.pending, (state: UserState) => {
      state.userState = 'logging';
      return state;
    });
    builder.addCase(loginThunk.rejected, (state: UserState) => {
      state.userState = 'error';
      return state;
    });
  },
});

export const { logout, setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
