import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/user.model';
import { loginThunk, registerThunk } from './user.thunk';
import { LoginResponse } from '../../types/login.user';

type LoginState = 'idle' | 'logging' | 'error';

type UserState = {
  loggedUser: User | null;
  loggingState: LoginState;
  token: string;
};

const initialState: UserState = {
  loggedUser: null,
  loggingState: 'idle',
  token: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout(state: UserState) {
      state.loggedUser = null;
      state.token = '';
      state.loggingState = 'idle';
    },
  },
  extraReducers(builder) {
    builder.addCase(
      loginThunk.fulfilled,
      (state: UserState, { payload }: PayloadAction<LoginResponse>) => {
        state.loggedUser = payload.user;
        state.token = payload.token;
        state.loggingState = 'idle';
      }
    );
    builder.addCase(registerThunk.pending, (state: UserState) => {
      state.loggingState = 'logging';
    });
    builder.addCase(
      registerThunk.fulfilled,
      (state: UserState, { payload }) => {
        state.loggedUser = payload;
        state.loggingState = 'idle';
      }
    );
    builder.addCase(registerThunk.rejected, (state: UserState) => {
      state.loggingState = 'error';
    });
    builder.addCase(loginThunk.pending, (state: UserState) => {
      state.loggingState = 'logging';
    });
    builder.addCase(loginThunk.rejected, (state: UserState) => {
      state.loggingState = 'error';
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
