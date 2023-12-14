import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Router } from './router';
import '@testing-library/jest-dom';

jest.mock('../../types/take.id.tsx', () => ({
  getUserIdFromLocalStorage: jest.fn().mockResolvedValue(''),
  getUserTokenFromLocalStorage: jest.fn().mockResolvedValue(''),
}));

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
  describe('When it is instantiate with a route addPub', () => {
    const MockedComponentaddPub = jest.fn().mockReturnValue(<h2>Add Pub</h2>);
    jest.mock('../pubs/pubs.form', () => MockedComponentaddPub);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () =>
        render(
          <MemoryRouter initialEntries={['/addPub']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        )
      );
      element = screen.getByText('Add Pub');
    });
    test('Then it should render RegisterPage', () => {
      expect(MockedComponentaddPub).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
  describe('When it is instantiate with a route addBeer', () => {
    const MockedComponentaddBeer = jest
      .fn()
      .mockReturnValue(<h1>Create Beers</h1>);
    jest.mock('../beers/beers.form', () => MockedComponentaddBeer);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () =>
        render(
          <MemoryRouter initialEntries={['/addBeer']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        )
      );
      element = screen.getByText('Create Beers');
    });
    test('Then it should render RegisterPage', () => {
      expect(MockedComponentaddBeer).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
  describe('When it is instantiate with a route pubs', () => {
    const MockedComponentaddPubList = jest.fn().mockReturnValue(<h2>Pubs</h2>);
    jest.mock('../list/pub.list', () => MockedComponentaddPubList);
    let element: HTMLElement;
    beforeEach(async () => {
      await act(async () =>
        render(
          <MemoryRouter initialEntries={['/pubs']} initialIndex={0}>
            <Router></Router>
          </MemoryRouter>
        )
      );
      element = screen.getByText('Pubs');
    });
    test('Then it should render RegisterPage', () => {
      expect(MockedComponentaddPubList).toHaveBeenCalled();
      expect(element).toBeInTheDocument();
    });
  });
});
