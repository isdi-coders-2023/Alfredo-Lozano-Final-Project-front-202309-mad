import { MemoryRouter as Router } from 'react-router-dom';
import CreatePub from './pubs.form';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import userEvent from '@testing-library/user-event';
import { usePubs } from '../../hooks/use.pubs';
import Swal from 'sweetalert2';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
jest.mock('../../hooks/use.pubs', () => ({
  usePubs: jest.fn().mockReturnValue({
    createPub: jest.fn(),
  }),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Given the createPub component', () => {
  describe('When register form is rendered', () => {
    beforeEach(() => {
      render(
        <Provider store={appStore}>
          <Router>
            <CreatePub />
          </Router>
        </Provider>
      );
    });
    test('Then the handleRegisterUser should be called on form submit', async () => {
      const form = screen.getByRole('form');
      const button = screen.getByRole('button');
      const inputs = screen.getAllByRole('textbox');
      await userEvent.type(inputs[0], 'pepe');
      await userEvent.type(inputs[1], 'calle pepez');
      await userEvent.type(inputs[2], 'pepe');
      userEvent.click(button);
      await fireEvent.submit(form);
      expect(usePubs().createPub).toHaveBeenCalled();
    });
    test('Then the handleRegisterUser should be called on form submit', async () => {
      const form = screen.getByRole('form');
      const button = screen.getByRole('button');
      userEvent.click(button);
      await fireEvent.submit(form);
      expect(Swal.fire).toHaveBeenCalled();
    });
  });
});
