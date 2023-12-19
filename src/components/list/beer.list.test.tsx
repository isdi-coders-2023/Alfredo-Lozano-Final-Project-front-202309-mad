import { render, screen } from '@testing-library/react';
import BeerList from './beer.list';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useBeers } from '../../hooks/use.beers';

jest.mock('../../hooks/use.beers', () => ({
  useBeers: jest.fn().mockReturnValue({
    loadBeer: jest.fn(),
    beers: [],
  }),
}));

test('should load beers on mount', () => {
  render(
    <Provider store={appStore}>
      <Router>
        <BeerList />
      </Router>
    </Provider>
  );

  const beerList = screen.getByRole('list');
  expect(beerList).toBeInTheDocument();
  expect(useBeers().loadBeer).toHaveBeenCalled();
  expect(screen.getByText('Beers')).toBeInTheDocument();
});
