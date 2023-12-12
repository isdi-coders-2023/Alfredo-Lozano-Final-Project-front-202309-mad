import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch } from 'react-redux';
import { useBeer } from './use.beers';

jest.mock('../services/beers/take.id', () => ({
  getUserIdFromLocalStorage: jest.fn().mockResolvedValue(''),
  getUserTokenFromLocalStorage: jest.fn().mockResolvedValue(''),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('Given usePubs Hook', () => {
  const mockNewBeer = {} as unknown as FormData;

  const TestComponent = () => {
    const { createBeer } = useBeer();

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