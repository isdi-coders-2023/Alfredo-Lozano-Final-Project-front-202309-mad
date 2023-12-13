import PubCard from './pubs.cards';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../../hooks/use.pubs', () => ({
  usePubs: jest.fn(),
}));

describe('pubs.card Component', () => {
  test('should render a li element with class "pub-card" even if pub prop is undefined', () => {
    // Arrange
    const pub = {
      id: '1',
      name: 'Pub 1',
      direction: 'Address 1',
      owner: 'Owner 1',
      beers: [],
    };
    // Act
    render(
      <Provider store={appStore}>
        <Router>
          <PubCard pub={pub} />
        </Router>
      </Provider>
    );

    // Assert
    expect(screen.getByRole('listitem')).toHaveClass('pub-card');
  });
});
