import { ApiRepoUsers } from '../../services/users/api.repo.users';
import { getUserByIdThunk, loginThunk, registerThunk } from './user.thunk';
import { Storage } from '../../services/storage';
import { appStore } from '../../store/store';
import { UserLogin } from '../../models/user.model';

describe('Given...', () => {
  describe('When...', () => {
    const sharedData = {
      repo: {
        login: jest.fn().mockReturnValue({
          token: '',
        }),
        loginWithToken: jest.fn().mockReturnValue({
          token: '',
        }),
      } as unknown as ApiRepoUsers,
      userStore: {
        set: jest.fn(),
      } as unknown as Storage<{
        id: '';
        token: string;
      }>,
    };

    const newUser = {
      repo: {
        login: jest.fn().mockReturnValue({
          token: '',
        }),
      } as unknown as ApiRepoUsers,
      newUser: {},
    };

    const userid = {
      repo: {
        login: jest.fn().mockReturnValue({
          token: '',
        }),
      } as unknown as ApiRepoUsers,
      userId: '',
    };

    test('Then it should ...', async () => {
      const data = { ...sharedData, loginUser: {} as UserLogin };
      await appStore.dispatch(loginThunk(data));
      expect(data.repo.login).toHaveBeenCalled();
    });
    test('Then register it should ...', async () => {
      const data = { ...sharedData, loginUser: {} as UserLogin };
      await appStore.dispatch(registerThunk(newUser));
      expect(data.repo.login).toHaveBeenCalled();
    });

    test('Then getByID it should ...', async () => {
      const data = { ...sharedData, loginUser: {} as UserLogin };
      await appStore.dispatch(getUserByIdThunk(userid));
      expect(data.repo.login).toHaveBeenCalled();
    });
  });
});
