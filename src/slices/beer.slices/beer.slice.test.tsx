import { ApiRepoBeers } from '../../services/beers/api.repo.beers';
import { appStore } from '../../store/store';
import { createBeerThunk } from './beer.thunk';

const newBeer = {} as unknown as FormData;
jest.mock('../../services/beers/take.id', () => ({
  getUserIdFromLocalStorage: jest.fn().mockResolvedValue(''),
  getUserTokenFromLocalStorage: jest.fn().mockResolvedValue(''),
}));

describe('Given the users slice reducer', () => {
  describe('When it is instantiated correctly', () => {
    const repo: ApiRepoBeers = {
      createBeer: jest.fn(),
    } as unknown as ApiRepoBeers;
    test('Then it should dispatch the registerUser', () => {
      appStore.dispatch(createBeerThunk({ newBeer, repo }));
      expect(repo.createBeer).toHaveBeenCalled();
    });
  });
  describe('When it is instantiated incorrectly', () => {
    const repo: ApiRepoBeers = {
      createPub: jest.fn().mockRejectedValueOnce(new Error('Login failed')),
    } as unknown as ApiRepoBeers;

    test('should set RegisterState to error when user fails to log in', async () => {
      await appStore.dispatch(createBeerThunk({ newBeer, repo }));
      const state = appStore.getState().usersState;
      expect(state.loggingState).toBe('error');
    });
  });
});
