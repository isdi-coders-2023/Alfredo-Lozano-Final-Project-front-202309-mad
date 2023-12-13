import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pubs } from '../../models/pub.model';
import { ApiRepoPubs } from '../../services/pubs/api.repo.pubs';

export const createThunk = createAsyncThunk<
  Pubs,
  {
    newPub: Partial<Pubs>;
    repo: ApiRepoPubs;
  }
>('register', async ({ newPub, repo }) => {
  const result = await repo.createPub(newPub);
  return result;
});

export const loadPubsThunk = createAsyncThunk<Pubs[], ApiRepoPubs>(
  'load',
  async (repo) => {
    const pubs = await repo.loadPubs();
    return pubs;
  }
);
