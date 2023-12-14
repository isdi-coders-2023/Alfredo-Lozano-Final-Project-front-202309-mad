import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import BeerCard from './beers.cards';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Beer } from '../../models/beer.model';

test('should render a beer card with the correct information when all beer information is provided', () => {
  const beer = {
    name: 'Beer 1',
    brewer: 'Brewer 1',
    style: 'Style 1',
    alcohol: '5%',
    probada: 'Yes',
    beerImg: {
      publicId: 'image1',
    },
  } as unknown as Beer;

  render(
    <Provider store={appStore}>
      <Router>
        <BeerCard beer={beer} />
      </Router>
    </Provider>
  );

  expect(screen.getByText('name:')).toBeInTheDocument();
  expect(screen.getByText('Beer 1')).toBeInTheDocument();
  expect(screen.getByText('brewer:')).toBeInTheDocument();
  expect(screen.getByText('Brewer 1')).toBeInTheDocument();
  expect(screen.getByText('style:')).toBeInTheDocument();
  expect(screen.getByText('Style 1')).toBeInTheDocument();
  expect(screen.getByText('alcohol:')).toBeInTheDocument();
  expect(screen.getByText('5%')).toBeInTheDocument();
  expect(screen.getByText('probada:')).toBeInTheDocument();
  expect(screen.getByText('Yes')).toBeInTheDocument();
});
