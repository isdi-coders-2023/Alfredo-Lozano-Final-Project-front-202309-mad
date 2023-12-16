import { ApiRepoUsers } from '../../services/users/api.repo.users';
import {
  addBeertoTasteThunk,
  getUserByIdThunk,
  loginThunk,
  registerThunk,
} from './user.thunk';
import { Storage } from '../../services/storage';
import { appStore } from '../../store/store';
import { UserLogin } from '../../models/user.model';
import { Beer } from '../../models/beer.model';

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

    test('Then add beer should.. ', async () => {
      const beer = {
        id: '1',
        name: 'Beer 1',
        brewer: 'Brewer 1',
        style: 'Style 1',
        alcohol: '5%',
        beerImg: {},
        autor: {},
        pubs: {},
      } as unknown as Beer;
      const data = {
        repo: {
          addBeertoTaste: jest.fn().mockResolvedValue({}),
        } as unknown as ApiRepoUsers,
        beer,
      };
      await appStore.dispatch(addBeertoTasteThunk(data));
      expect(data.repo.addBeertoTaste).toHaveBeenCalled();
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
