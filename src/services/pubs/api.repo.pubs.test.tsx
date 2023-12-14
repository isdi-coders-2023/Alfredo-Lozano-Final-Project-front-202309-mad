import { Pubs } from '../../models/pub.model';
import { ApiRepoPubs } from './api.repo.pubs';

const newPub: Partial<Pubs> = {
  id: '1',
  name: 'Pub Name',
  direction: 'Pub Direction',
  owner: 'Pub Owner',
  beers: [],
};
const pubs: Pubs[] = [
  { id: '1', name: 'Pub 1', direction: 'Direction 1', owner: 'Owner 1' },
];

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
    test('should fetch data from the API successfully and return an array of Pubs', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(pubs),
      });
      const result = await apiRepoPubs.loadPubs();
      expect(result).toEqual(pubs);
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
    test('should throw an error if the API call fails', async () => {
      const apiRepoPubs = new ApiRepoPubs();
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });
      await expect(apiRepoPubs.loadPubs()).rejects.toThrow(
        '500 Internal Server Error'
      );
    });
  });
});
