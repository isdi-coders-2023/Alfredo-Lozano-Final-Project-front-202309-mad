import { useDispatch } from 'react-redux';
import { Beer } from '../models/beer.model';
import { ApiRepoBeers } from '../services/beers/api.repo.beers';
import { AppDispatch } from '../store/store';

export function useBeer() {
  const dispatch = useDispatch<AppDispatch>();
  const repo = new ApiRepoBeers();

  const createBeer = (newBeer: Partial<Beer>) => {
    repo.createBeer(newBeer);
  };

  return {
    dispatch,
    createBeer,
  };
}
