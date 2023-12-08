import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { UserButtons } from './user.button';
import { appStore } from '../../store/store';

describe('UserButtons Component', () => {
  test('should render Register button when user is not logged in and on home page', () => {
    render(
      <Provider store={appStore}>
        <Router>
          <UserButtons />
        </Router>
      </Provider>
    );

    const registerButton = screen.getByText('Register');
    expect(registerButton).toBeInTheDocument();
  });

  test('should render Back button when user is not logged in and on register page', () => {
    render(
      <Provider store={appStore}>
        <Router>
          <UserButtons />
        </Router>
      </Provider>
    );

    const backButton = screen.getByRole('button');
    expect(backButton).toBeInTheDocument();
  });
});
