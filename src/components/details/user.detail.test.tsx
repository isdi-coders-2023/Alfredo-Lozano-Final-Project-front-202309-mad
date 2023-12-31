import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { appStore } from '../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import UserDetails from './user.details';

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn().mockReturnValue({
    loggedUser: {
      userName: 'JohnDoe',
      name: 'John',
      surname: 'Doe',
      email: 'johndoe@example.com',
      age: 25,
      probada: [],
    },
  }),
}));

describe('Given Details Component', () => {
  describe('When we instantiate it', () => {
    render(
      <Router>
        <Provider store={appStore}>
          <UserDetails></UserDetails>
        </Provider>
      </Router>
    );

    test('Then should render correctly', () => {
      const roleElement = screen.getByText('NAME:');
      expect(roleElement).toBeInTheDocument();
    });
  });
});
