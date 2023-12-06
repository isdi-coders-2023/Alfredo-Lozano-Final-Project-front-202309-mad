import { User, UserLogin } from '../models/user.model';
import { useUsers } from './use.users';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useDispatch } from 'react-redux';
import { ApiRepoUsers } from '../services/api.repo.users';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

const mockLoginUser = {} as UserLogin;
const mockNewUser = {} as unknown as Partial<User>;
describe('Given useUsers Hook', () => {
  const TestComponent = () => {
    const { logoutUser, login, register, makeLogOut } = useUsers();

    return (
      <>
        <button onClick={() => makeLogOut()}></button>
        <button onClick={() => login(mockLoginUser)}> </button>
        <button onClick={() => register(mockNewUser)}> </button>
        <button onClick={() => logoutUser()}> </button>
      </>
    );
  };

  let elements: HTMLElement[];

  beforeEach(() => {
    const jsonMock = jest.fn().mockResolvedValue([]);
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jsonMock,
    });
    render(<TestComponent></TestComponent>);
    elements = screen.getAllByRole('button');
  });

  describe('When we click button makeLogOut', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[0]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button login', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[1]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button loginWithToken', () => {
    test('Then the dispacht should have been called', async () => {
      Storage.prototype.get = jest.fn().mockReturnValue('test');
      await userEvent.click(elements[2]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button register ', () => {
    test('Then the dispacht should have been called', async () => {
      ApiRepoUsers.prototype.registerUser = jest.fn();
      await userEvent.click(elements[3]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When we click button logoutUser ', () => {
    test('Then the dispacht should have been called', async () => {
      await userEvent.click(elements[4]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
});
