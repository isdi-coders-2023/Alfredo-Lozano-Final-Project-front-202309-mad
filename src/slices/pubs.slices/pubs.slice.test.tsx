import { Pubs } from '../../models/pub.model';
import { ApiRepoPubs } from '../../services/pubs/api.repo.pubs';
import { appStore } from '../../store/store';
import { createThunk } from './pubs.thunk';

const newPub = {} as unknown as Partial<Pubs>;

describe('Given the users slice reducer', () => {
  describe('When it is instantiated correctly', () => {
    const repo: ApiRepoPubs = {
      createPub: jest.fn(),
    } as unknown as ApiRepoPubs;
    test('Then it should dispatch the registerUser', () => {
      appStore.dispatch(createThunk({ newPub, repo }));
      expect(repo.createPub).toHaveBeenCalled();
    });
  });
  describe('When it is instantiated incorrectly', () => {
    const repo: ApiRepoPubs = {
      createPub: jest.fn().mockRejectedValueOnce(new Error('Login failed')),
    } as unknown as ApiRepoPubs;

    test('should set RegisterState to error when user fails to log in', async () => {
      await appStore.dispatch(createThunk({ newPub, repo }));
      const state = appStore.getState().usersState;
      expect(state.userState).toBe('error');
    });
  });
});
