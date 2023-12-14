import { Storage } from './storage';

test('should set and get data successfully', () => {
  const storage = new Storage<string>('test');
  const data = 'test data';

  storage.set(data);
  const result = storage.get();

  expect(result).toEqual(data);
});
