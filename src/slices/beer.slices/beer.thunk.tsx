import { createAsyncThunk } from '@reduxjs/toolkit';
import { Beer } from '../../models/beer.model';
import { ApiRepoBeers } from '../../services/beers/api.repo.beers';

export const createBeerThunk = createAsyncThunk<
  Beer,
  {
    newBeer: FormData;
    repo: ApiRepoBeers;
  }
>('register', async ({ newBeer, repo }) => {
  const result = await repo.createBeer(newBeer);
  return result;
});
