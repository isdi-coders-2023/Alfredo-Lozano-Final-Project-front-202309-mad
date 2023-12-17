import { Beer } from '../../models/beer.model';
import { ApiRepoBeers } from '../../services/beers/api.repo.beers';
import { appStore } from '../../store/store';
import reducer, { LoginState, setCurrentBeerItem } from './beer.slice';
import { createBeerThunk, loadBeerThunks } from './beer.thunk';

const newBeer = {} as FormData;
const repo: ApiRepoBeers = {
  createBeer: jest.fn(),
  loadBeers: jest.fn(),
} as unknown as ApiRepoBeers;
const payloadMock = {} as Beer | null;

describe('Given the users slice reducer', () => {
  describe('when createBeerThunk.fulfilled action is dispatched', () => {
    const initialState = {
      currentBeerItem: null as Beer | null,
      beerState: 'idle' as LoginState,
      beers: [],
    };

    test('should update beerState state to idle', async () => {
      const action = setCurrentBeerItem(payloadMock);
      const newState = reducer(initialState, action);
      expect(newState.currentBeerItem).toEqual(payloadMock);
    });
  });

  describe('When it is instantiated correctly', () => {
    test('Then it should dispatch the registerUser', () => {
      appStore.dispatch(createBeerThunk({ newBeer, repo }));
      expect(repo.createBeer).toHaveBeenCalled();
    });
  });

  describe('when loadBeerThunks.fulfilled action is dispatched', () => {
    const initialState = {
      currentBeerItem: null as Beer | null,
      beerState: 'idle' as LoginState,
      beers: [],
    };

    test('should update beerState state to idle and set beers', async () => {
      const mockBeers: Beer[] = [{ id: '1', name: 'Beer1' } as unknown as Beer];
      await appStore.dispatch(loadBeerThunks.fulfilled(mockBeers, '', repo));
      const newState = reducer(initialState, {
        type: 'fake-action-to-get-new-state',
      });
      expect(newState.beerState).toBe('idle');
      expect(newState.beers).toEqual([]);
    });
  });

  describe('When it is instantiated incorrectly', () => {
    const repo: ApiRepoBeers = {
      createBeer: jest.fn().mockRejectedValueOnce(new Error('Login failed')),
    } as unknown as ApiRepoBeers;

    test('should set RegisterState to error when user fails to log in', async () => {
      await appStore.dispatch(createBeerThunk({ newBeer, repo }));
      const state = appStore.getState().usersState;
      expect(state.userState).toBe('error');
    });
  });
});
