import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Router } from './router';
import '@testing-library/jest-dom';

describe('Given the AppRoutes component', () => {
  describe('When it is instantiate with a route /', () => {
    const MockedComponentLogin = jest.fn().mockReturnValue(<h2>Login</h2>);
    jest.mock('../login/login', () => MockedComponentLogin);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () =>
        render(
          <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        )
      );

      element = screen.getByText('Login');
    });
    test('Then it should render Home', () => {
      expect(MockedComponentLogin).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
  describe('When it is instantiate with a route *', () => {
    const MockedComponentError = jest
      .fn()
      .mockReturnValue(<p>404 ERROR NOT FOUND</p>);
    jest.mock('../error/error', () => MockedComponentError);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () =>
        render(
          <MemoryRouter initialEntries={['/*']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        )
      );
      element = screen.getByText('404 ERROR NOT FOUND');
    });
    test('Then it should render ErrorPage', () => {
      expect(MockedComponentError).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
  describe('When it is instantiate with a route register', () => {
    const MockedComponentRegister = jest
      .fn()
      .mockReturnValue(<h2>Register</h2>);
    jest.mock('../register/register', () => MockedComponentRegister);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () =>
        render(
          <MemoryRouter initialEntries={['/register']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        )
      );
      element = screen.getByText('Register');
    });
    test('Then it should render RegisterPage', () => {
      expect(MockedComponentRegister).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
});
