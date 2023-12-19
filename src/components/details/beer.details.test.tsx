import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { appStore } from '../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import BeerDetails from './beer.details';

jest.mock('../../hooks/use.beers', () => ({
  useBeers: jest.fn().mockReturnValue({
    currentBeerItem: {
      id: '1',
      name: 'Beer 1',
      brewer: 'Brewer 1',
      style: 'Style 1',
      alcohol: '5%',
      beerImg: {
        publicId: 'image1',
      },
    },
    loadBeerById: jest.fn(),
  }),
}));

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({
    addBeer: jest.fn(),
    delBeer: jest.fn(),
  }),
}));

describe('Given Details Component', () => {
  describe('When we instantiate it', () => {
    render(
      <Router>
        <Provider store={appStore}>
          <BeerDetails></BeerDetails>
        </Provider>
      </Router>
    );

    test('Then should render correctly', () => {
      const roleElement = screen.getByText('NAME:');
      expect(roleElement).toBeInTheDocument();
      const addBeerButton = screen.getByRole('button');
      expect(addBeerButton).toBeInTheDocument();
    });
  });
});
