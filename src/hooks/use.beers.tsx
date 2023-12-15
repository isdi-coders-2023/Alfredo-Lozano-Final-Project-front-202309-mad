import { useDispatch, useSelector } from 'react-redux';
import { ApiRepoBeers } from '../services/beers/api.repo.beers';
import { AppDispatch, RootState } from '../store/store';
import { useCallback, useMemo } from 'react';
import { loadBeerThunk } from '../slices/beer.slices/beer.thunk';
import { Beer } from '../models/beer.model';
import { setCurrentBeerItem } from '../slices/beer.slices/beer.slice';

export function useBeer() {
  const { currentBeerItem, beers } = useSelector(
    (state: RootState) => state.beerState
  );
  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new ApiRepoBeers(), []);

  const createBeer = (newBeer: FormData) => {
    repo.createBeer(newBeer);
  };

  const loadBeer = useCallback(async () => {
    dispatch(loadBeerThunk(repo));
  }, [dispatch, repo]);

  const handleBeerDetails = async (beer: Beer) => {
    dispatch(setCurrentBeerItem(beer));
  };

  return {
    beers,
    currentBeerItem,
    loadBeer,
    dispatch,
    createBeer,
    handleBeerDetails,
  };
}
