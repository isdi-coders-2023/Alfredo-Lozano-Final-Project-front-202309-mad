import { User } from '../models/user.model';
import { ApiRepoUsers } from './api.repo.users';

const mockLogin = {
  email: 'test@example.com',
  password: 'password123',
};
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
  });
});
