import { ApiRepoBeers } from '../../services/beers/api.repo.beers';
import { appStore } from '../../store/store';
import { loadBeerByIdThunk, loadBeerThunks } from './beer.thunk';

describe('Given...', () => {
  describe('When...', () => {
    const mockBeerRepo = {
      repo: {
        createBeer: jest.fn().mockReturnValue([]),
        loadBeers: jest.fn().mockReturnValue({}),
        loadBeerbyId: jest.fn().mockResolvedValue({}),
      } as unknown as ApiRepoBeers,
    };

    test('Then it should dispatch loadBeers', async () => {
      const data = { repo: mockBeerRepo.repo };
      await appStore.dispatch(loadBeerThunks(data.repo));
      expect(data.repo.loadBeers).toHaveBeenCalled();
    });

    test('Then it should dispatch loadBeersByID', async () => {
      const data = { beerId: '123', repo: mockBeerRepo.repo };
      await appStore.dispatch(loadBeerByIdThunk(data));
      expect(data.repo.loadBeerbyId).toHaveBeenCalled();
    });
  });
});
