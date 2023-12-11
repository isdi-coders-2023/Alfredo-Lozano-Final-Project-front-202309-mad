import { Beer } from '../../models/beer.model';
import { ApiRepoBeers } from './api.repo.beers';

const newBeer: Partial<Beer> = {} as unknown as Beer;

describe('Given User ApiRepo class', () => {
  describe('When we instantiate it and response is ok', () => {
    let jsonMock: jest.Mock;
    const apiRepoBeer = new ApiRepoBeers();
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue(newBeer);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('should successfully create a new pub with valid input', async () => {
      const createdPub = await apiRepoBeer.createBeer(newBeer);
      expect(createdPub).toEqual(newBeer);
    });
  });
  describe('When we instantiate it and response is fail', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('should throw an error when newPub parameter is null', async () => {
      const apiRepoBeer = new ApiRepoBeers();
      await expect(apiRepoBeer.createBeer(newBeer)).rejects.toThrow();
    });
  });
});
