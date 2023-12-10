import { Pubs } from '../../models/pub.model';
import { ApiRepoPubs } from './api.repo.pubs';

const newPub: Partial<Pubs> = {
  id: '1',
  name: 'Pub Name',
  direction: 'Pub Direction',
  owner: 'Pub Owner',
  beers: [],
};

describe('Given User ApiRepo class', () => {
  describe('When we instantiate it and response is ok', () => {
    let jsonMock: jest.Mock;
    const apiRepoPubs = new ApiRepoPubs();
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue(newPub);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });
    test('should successfully create a new pub with valid input', async () => {
      const createdPub = await apiRepoPubs.createPub(newPub);
      expect(createdPub).toEqual(newPub);
    });
  });
  describe('When we instantiate it and response is fail', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('should throw an error when newPub parameter is null', async () => {
      const apiRepoPubs = new ApiRepoPubs();
      await expect(apiRepoPubs.createPub(newPub)).rejects.toThrow();
    });
  });
});
