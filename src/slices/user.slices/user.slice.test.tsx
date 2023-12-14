import { User } from '../../models/user.model';
import { ApiRepoUsers } from '../../services/users/api.repo.users';
import { appStore } from '../../store/store';
import userSlice, { logout } from './user.slice';
import { loginThunk, registerThunk } from './user.thunk';
import { Storage } from '../../services/storage';
import { UserState } from './user.slice';
import { LoginResponse } from '../../types/login.user';
import { PayloadAction } from '@reduxjs/toolkit';

const loginUser = { email: 'pepe', password: '123' };
const newUser = {} as unknown as Partial<User>;

describe('Given the users slice reducer', () => {
  describe('When it is instantiated correctly', () => {
    const repo: ApiRepoUsers = {
      registerUser: jest.fn(),
      login: jest.fn().mockReturnValue({
        loginUser,
        token: '',
      }),
    } as unknown as ApiRepoUsers;

    test('Then it should dispatch the registerUser', () => {
      appStore.dispatch(registerThunk({ newUser, repo }));
      expect(repo.registerUser).toHaveBeenCalled();
    });

    test('should update the state with the logged in user and token when loginThunk is fulfilled', () => {
      const payload: LoginResponse = {
        user: {} as unknown as User,
        token: '',
      };
      const state: UserState = {
        loggedUser: null,
        userState: 'idle',
        token: '',
        user: [],
      };
      const action: PayloadAction<LoginResponse> = {
        type: 'loginThunk/fulfilled',
        payload,
      };

      const newState = userSlice(state, action);

      expect(newState.token).toEqual(payload.token);
      expect(newState.userState).toEqual('idle');
    });
    test('Then it should dispatch the loginUserAsync', () => {
      appStore.dispatch(
        loginThunk({
          loginUser,
          repo,
          userStore: { set: jest.fn() } as unknown as Storage<{
            token: string;
            id: string;
          }>,
        })
      );
      expect(repo.login).toHaveBeenCalled();
    });
    test('should update state when user logs out', () => {});
    appStore.dispatch(logout());
    const state = appStore.getState().usersState;
    expect(state.loggedUser).toBeNull();
    expect(state.token).toBe('');
    expect(state.userState).toBe('idle');
  });
  test('should set loggedUser state to payload from getUserByIdThunk', () => {
    const state: UserState = {
      loggedUser: null,
      userState: 'idle',
      token: '',
      user: [],
    };
    const payload = null;

    expect(state.loggedUser).toEqual(payload);
  });

  describe('When it is instantiated incorrectly', () => {
    const repo: ApiRepoUsers = {
      login: jest.fn().mockRejectedValueOnce(new Error('Login failed')),
      registerUser: jest.fn().mockRejectedValueOnce(new Error('Login failed')),
    } as unknown as ApiRepoUsers;

    test('should set loggingState to error when user fails to log in', async () => {
      await appStore.dispatch(
        loginThunk({
          loginUser,
          repo,
          userStore: { set: jest.fn() } as unknown as Storage<{
            token: string;
            id: string;
          }>,
        })
      );
      const state = appStore.getState().usersState;
      expect(state.userState).toBe('error');
    });
    test('should set RegisterState to error when user fails to log in', async () => {
      await appStore.dispatch(registerThunk({ newUser, repo }));
      const state = appStore.getState().usersState;
      expect(state.userState).toBe('error');
    });
  });
});
