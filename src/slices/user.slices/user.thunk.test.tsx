import { ApiRepoUsers } from '../../services/users/api.repo.users';
import {
  addBeertoTasteThunk,
  delBeertoTasteThunk,
  getUserByIdThunk,
  loginThunk,
  loginTokenThunk,
  registerThunk,
} from './user.thunk';
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

    test('Then it should ...', async () => {
      const data = { ...sharedData, loginUser: {} as UserLogin };
      await appStore.dispatch(loginThunk(data));
      expect(data.repo.login).toHaveBeenCalled();
    });

    test('Then it should dispatch loginTokenThunk and update user store', async () => {
      const data = { ...sharedData, token: '' };
      await appStore.dispatch(loginTokenThunk(data));
      expect(data.repo.login).toHaveBeenCalled();
    });

    test('Then add beer should.. ', async () => {
      const beer = 'id';
      const data = {
        repo: {
          addBeertoTaste: jest.fn().mockResolvedValue({}),
        } as unknown as ApiRepoUsers,
        beer,
      };
      await appStore.dispatch(addBeertoTasteThunk(data));
      expect(data.repo.addBeertoTaste).toHaveBeenCalled();
    });
    test('Then delBeer should.. ', async () => {
      const beer = 'id';
      const data = {
        repo: {
          delBeertoTaste: jest.fn().mockResolvedValue({}),
        } as unknown as ApiRepoUsers,
        beer,
      };
      await appStore.dispatch(delBeertoTasteThunk(data));
      expect(data.repo.delBeertoTaste).toHaveBeenCalled();
    });
    test('Then getById it should ...', async () => {
      const userId = '123';
      const data = {
        repo: {
          getUserbyID: jest.fn().mockResolvedValue({}),
        } as unknown as ApiRepoUsers,
        userId,
      };
      await appStore.dispatch(getUserByIdThunk(data));
      expect(data.repo.getUserbyID).toHaveBeenCalled();
    });
    test('Then register it should ...', async () => {
      const data = { ...sharedData, loginUser: {} as UserLogin };
      await appStore.dispatch(registerThunk(newUser));
      expect(data.repo.login).toHaveBeenCalled();
    });
  });
});
