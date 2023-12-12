import { Beer } from '../../models/beer.model';
import { ApiRepoBeers } from './api.repo.beers';

const newBeer: FormData = {} as unknown as FormData;
jest.mock('./take.id', () => ({
  getUserIdFromLocalStorage: jest.fn().mockResolvedValue(''),
  getUserTokenFromLocalStorage: jest.fn().mockResolvedValue(''),
}));

describe('Given User ApiRepo class', () => {
  describe('When we instantiate it and response is ok', () => {
    test('should send a POST request to the correct URL with the correct body and headers, and return the parsed response', async () => {
      const newBeer: FormData = {} as unknown as FormData;
      const userToken = '';
      const expectedResponse: Beer = {} as unknown as Beer;
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(expectedResponse),
      });

      const apiRepoBeers = new ApiRepoBeers(userToken);
      const result = await apiRepoBeers.createBeer(newBeer);

      expect(result).toEqual(expectedResponse);
    });
  });
  describe('When we instantiate it and response is fail', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('should throw an error when newPub parameter is null', async () => {
      const apiRepoBeer = new ApiRepoBeers('');
      await expect(apiRepoBeer.createBeer(newBeer)).rejects.toThrow();
    });
  });
});
