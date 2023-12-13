import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/user.model';
import { getUserByIdThunk, loginThunk, registerThunk } from './user.thunk';
import { LoginResponse } from '../../types/login.user';

type LoginState = 'idle' | 'logging' | 'error';

type UserState = {
  currentUserItem: User | null;
  userState: LoginState;
  token: string;
  user: User[];
};

const initialState: UserState = {
  currentUserItem: null,
  userState: 'idle',
  token: '',
  user: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout(state: UserState) {
      state.currentUserItem = null;
      state.user = [];
      state.token = '';
      state.userState = 'idle';
    },
  },
  extraReducers(builder) {
    builder.addCase(
      loginThunk.fulfilled,
      (state: UserState, { payload }: PayloadAction<LoginResponse>) => {
        state.currentUserItem = payload.user;
        state.token = payload.token;
        state.userState = 'idle';
      }
    );

    builder.addCase(
      getUserByIdThunk.fulfilled,
      (state: UserState, { payload }: PayloadAction<User>) => {
        state.currentUserItem = payload;
        state.userState = 'idle';
      }
    );

    builder.addCase(
      registerThunk.fulfilled,
      (state: UserState, { payload }) => {
        state.currentUserItem = payload;
        state.userState = 'idle';
      }
    );

    builder.addCase(getUserByIdThunk.pending, (state: UserState) => {
      state.userState = 'logging';
    });

    builder.addCase(getUserByIdThunk.rejected, (state: UserState) => {
      state.userState = 'error';
    });

    builder.addCase(registerThunk.pending, (state: UserState) => {
      state.userState = 'logging';
    });

    builder.addCase(registerThunk.rejected, (state: UserState) => {
      state.userState = 'error';
    });

    builder.addCase(loginThunk.pending, (state: UserState) => {
      state.userState = 'logging';
    });
    builder.addCase(loginThunk.rejected, (state: UserState) => {
      state.userState = 'error';
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
