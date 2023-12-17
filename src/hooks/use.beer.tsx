import { useDispatch, useSelector } from 'react-redux';
import { ApiRepoBeers } from '../services/beers/api.repo.beers';
import { AppDispatch, RootState } from '../store/store';
import { useCallback, useMemo } from 'react';
import { loadBeerThunk } from '../slices/beer.slices/beer.thunk';
import { Beer } from '../models/beer.model';
import { setCurrentBeerItem } from '../slices/beer.slices/beer.slice';
import { useParams } from 'react-router-dom';

export function useBeer() {
  const { currentBeerItem } = useSelector(
    (state: RootState) => state.beerState
  );

  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new ApiRepoBeers(), []);

  const { beerId } = useParams();

  const loadBeer = useCallback(async () => {
    if (beerId) {
      dispatch(loadBeerThunk({ beerId, repo }));
    }
  }, [dispatch, repo]);

  const handleBeerDetails = async (beer: Beer) => {
    dispatch(setCurrentBeerItem(beer));
  };

  return {
    currentBeerItem,
    loadBeer,
    dispatch,
    handleBeerDetails,
  };
}

/* Import { useDispatch, useSelector } from 'react-redux';
import { ApiRepoBeers } from '../services/beers/api.repo.beers';
import { AppDispatch, RootState } from '../store/store';
import { useCallback, useMemo } from 'react';
import { loadBeerThunk } from '../slices/beer.slices/beer.thunk';
import { Beer } from '../models/beer.model';
import { setCurrentBeerItem } from '../slices/beer.slices/beer.slice';
import { useParams } from 'react-router-dom';
import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';

export async function useBeer() {
  const { currentBeerItem } = useSelector(
    (state: RootState) => state.beerState
  );
  const repo = useMemo(() => new ApiRepoBeers(), []);

  const beerID = useParams();

  //  Const currentBeerItem: Beer = await repo.loadBeerbyID(currentBeerID!);
  const loadBeer = useCallback(async () => {
    dispatch(loadBeerThunk(repo));
  }, [dispatch, repo]);

  const handleBeerDetails = async (beer: Beer) => {
    dispatch(setCurrentBeerItem(beer));
  };

  return {
    currentBeerItem,
    loadBeer,
    dispatch,
    handleBeerDetails,
  };
}

function dispatch(
  arg0: AsyncThunkAction<
    Beer[],
    ApiRepoBeers,
    {
      state?: unknown;
      dispatch?: Dispatch<AnyAction> | undefined;
      extra?: unknown;
      rejectValue?: unknown;
      serializedErrorType?: unknown;
      pendingMeta?: unknown;
      fulfilledMeta?: unknown;
      rejectedMeta?: unknown;
    }
  >
) {
  throw new Error('Function not implemented.');
}
*/
