import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { appStore } from '../../store/store';
import { Provider } from 'react-redux';
import { Header } from './header';

describe('Header Component', () => {
  test('should render the header component with two images and a UserButtons component', async () => {
    render(
      <Provider store={appStore}>
        <MemoryRouter>
          <Header></Header>
        </MemoryRouter>
      </Provider>
    );

    const smallBeerLogo = screen.getByAltText('beer logo front');
    const smallDeBeerLogo = screen.getByAltText('small de beer logo');
    expect(smallBeerLogo).toBeInTheDocument();
    expect(smallDeBeerLogo).toBeInTheDocument();
  });
});
