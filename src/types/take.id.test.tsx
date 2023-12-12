import {
  getUserIdFromLocalStorage,
  getUserTokenFromLocalStorage,
} from './take.id';

describe(' havin the id method', () => {
  test('should return the user ID when it exists in localStorage', () => {
    const user = { id: '123' };
    const userString = JSON.stringify(user);
    localStorage.setItem('user', userString);

    const result = getUserIdFromLocalStorage();

    expect(result).toBe(user.id);
  });
});
test('should return the user ID when it exists in localStorage', () => {
  const user = { token: '123' };
  const userString = JSON.stringify(user);
  localStorage.setItem('user', userString);

  const result = getUserTokenFromLocalStorage();

  expect(result).toBe(user.token);
});

test('should throw an error when user information is found in localStorage but does not contain an id property', () => {
  const user = { name: 'John Doe' };
  const userString = JSON.stringify(user);
  localStorage.setItem('user', userString);

  expect(() => {
    getUserIdFromLocalStorage();
  }).toThrow('No se encontró la propiedad "id" en la información del usuario');
});

test('should throw an error when localStorage.getItem returns null', () => {
  localStorage.getItem = jest.fn().mockReturnValue(null);

  expect(() => getUserTokenFromLocalStorage()).toThrow(
    'No se encontró la propiedad "token" en la información del usuario'
  );
});
