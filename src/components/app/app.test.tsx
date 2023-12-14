import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './app';
import { Header } from '../header/header';

jest.mock('../header/header');
jest.mock('../router/router');
jest.mock('../../types/take.id.tsx', () => ({
  getUserIdFromLocalStorage: jest.fn().mockResolvedValue(''),
  getUserTokenFromLocalStorage: jest.fn().mockResolvedValue(''),
}));

describe('Given App component', () => {
  describe('When we instantiate', () => {
    beforeEach(() => {
      render(<App></App>);
    });
    test('renders App with Header', () => {
      expect(Header).toHaveBeenCalled();
    });
  });
});
