import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePubs } from './use.pubs';
import { Pubs } from '../models/pub.model';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
  useSelector: jest.fn().mockReturnValue(jest.fn()),
}));

describe('Given usePubs Hook', () => {
  const mockNewPub = {} as unknown as Partial<Pubs>;

  const TestComponent = () => {
    const { createPub } = usePubs();

    return (
      <>
        <button onClick={() => createPub(mockNewPub)}>Create Pub</button>
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
    button = screen.getByText('Create Pub');
  });
  describe('When the "Create Pub" button is clicked', () => {
    test('Then useDispatch should have been called', async () => {
      await userEvent.click(button);
      expect(useDispatch).toHaveBeenCalled();
    });
  });
});
