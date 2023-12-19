import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useBeers } from './use.beers';
import { ApiRepoBeers } from '../services/beers/api.repo.beers';
import { Beer } from '../models/beer.model';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
  useSelector: jest.fn().mockReturnValue({
    currentBeerItem: null,
    beers: [],
  }),
}));

jest.mock('../services/beers/api.repo.beers', () => ({
  ApiRepoBeers: jest.fn(),
}));

describe('Given useBeers Hook', () => {
  const mockNewBeer = {} as FormData;

  const TestComponent = () => {
    const { createBeer, loadBeerById, loadBeer, handleBeerDetails } =
      useBeers();

    return (
      <>
        <button onClick={() => createBeer(mockNewBeer)}></button>
        <button onClick={() => loadBeerById()}></button>
        <button onClick={() => loadBeer()}></button>
        <button onClick={() => handleBeerDetails({} as Beer)}></button>
      </>
    );
  };

  let elements: HTMLElement[];

  beforeEach(() => {
    render(<TestComponent />);
    elements = screen.getAllByRole('button');
  });

  describe('When we click button createBeer', () => {
    test('Then the dispatch should have been called', async () => {
      ApiRepoBeers.prototype.createBeer = jest.fn();
      await userEvent.click(elements[0]);
      expect(useDispatch).toHaveBeenCalled();
    });
  });

  describe('When we click button loadBeerById', () => {
    test('Then the dispatch should have been called', async () => {
      ApiRepoBeers.prototype.loadBeerbyId = jest.fn();
      await userEvent.click(elements[1]);
      expect(useDispatch).toHaveBeenCalled();
    });
  });

  describe('When we click button loadBeer', () => {
    test('Then the dispatch should have been called', async () => {
      ApiRepoBeers.prototype.loadBeers = jest.fn();
      await userEvent.click(elements[2]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
  describe('When we click button loadBeer', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[3]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
});
