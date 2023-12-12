import { useDispatch } from 'react-redux';
import { ApiRepoBeers } from '../services/beers/api.repo.beers';
import { AppDispatch } from '../store/store';

export function useBeer() {
  const dispatch = useDispatch<AppDispatch>();
  const repo = new ApiRepoBeers('');

  const createBeer = (newBeer: FormData) => {
    repo.createBeer(newBeer);
  };

  return {
    dispatch,
    createBeer,
  };
}
