import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch } from 'react-redux';
import { useBeers } from './use.beers';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
  useSelector: jest.fn().mockReturnValue(jest.fn()),
}));
const mockUserID = '123';
localStorage.setItem('user', JSON.stringify({ token: mockUserID }));
describe('Given usePubs Hook', () => {
  const mockNewBeer = {} as unknown as FormData;

  const TestComponent = () => {
    const { createBeer } = useBeers();

    return (
      <>
        <button onClick={() => createBeer(mockNewBeer)}>Create Beer</button>
      </>
    );
  };

  let button: HTMLElement;

  beforeEach(() => {
    const jsonMock = jest.fn().mockResolvedValue([]);
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jsonMock,
    });
    render(<TestComponent />);
    button = screen.getByText('Create Beer');
  });
  describe('When the "Create Beer" button is clicked', () => {
    test('Then useDispatch should have been called', async () => {
      await userEvent.click(button);
      expect(useDispatch).toHaveBeenCalled();
    });
  });
});
