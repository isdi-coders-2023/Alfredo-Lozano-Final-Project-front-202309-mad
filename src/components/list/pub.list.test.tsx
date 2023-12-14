import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import { render, screen } from '@testing-library/react';
import PubList from './pub.list';
import { usePubs } from '../../hooks/use.pubs';

jest.mock('../../hooks/use.pubs', () => ({
  usePubs: jest.fn().mockReturnValue({
    loadPubs: jest.fn(),
    pubs: [],
  }),
}));

test('should render a list of pubs with their respective information', () => {
  render(
    <Provider store={appStore}>
      <Router>
        <PubList />
      </Router>
    </Provider>
  );

  const pubList = screen.getByRole('list');
  expect(pubList).toBeInTheDocument();
  expect(usePubs().loadPubs).toHaveBeenCalled();
});
