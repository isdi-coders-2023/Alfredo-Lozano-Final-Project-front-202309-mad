import { Beer } from '../../models/beer.model';
import { User } from '../../models/user.model';
import { ApiRepoUsers } from './api.repo.users';

const mockLogin = {
  email: 'test@example.com',
  password: 'password123',
};
const mockBeer = {} as unknown as Beer;
const mockRegister: Partial<User> = {
  id: '123',
  name: 'John',
  surname: 'Doe',
  age: 25,
  userName: 'johndoe',
};
const mockUserID = '123';
localStorage.setItem('user', JSON.stringify({ token: mockUserID }));

const repo = new ApiRepoUsers();
describe('Given User ApiRepo class', () => {
  describe('When we instantiate it and response is ok', () => {
    let jsonMock: jest.Mock;
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });

    test('Then method login should be used', async () => {
      const expected: User[] = [];
      const result = await repo.login(mockLogin);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });
    test('then method registerUser should be used', async () => {
      const result = await repo.registerUser(mockRegister);
      expect(result).toEqual([]);
    });
    test('should return a user object when provided with a valid user ID', async () => {
      const mockUserID = '123';
      const repo = new ApiRepoUsers();
      const fetchMock = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({}),
      });
      global.fetch = fetchMock;

      const result = await repo.getUserbyID(mockUserID);
      expect(result).toEqual({});
    });
    test('should add a beer to users taste list', async () => {
      const result = await repo.addBeertoTaste(mockBeer);
      expect(result).toEqual([]);
    });
  });

  describe('When we instantiate it and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method login dont should be used', async () => {
      expect(repo.login(mockLogin)).rejects.toThrow();
    });
    test('Then method reegisterUser dont shoul be used', async () => {
      expect(repo.registerUser(mockRegister)).rejects.toThrow();
    });
    test('Then method getUserIddont shoul be used', async () => {
      expect(repo.getUserbyID(mockUserID)).rejects.toThrow();
    });
    test('should throw an error when the server response is 404', async () => {
      await expect(repo.addBeertoTaste(mockBeer)).rejects.toThrow();
    });
  });
});
