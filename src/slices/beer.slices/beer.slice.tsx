import { createSlice } from '@reduxjs/toolkit';
import { Beer } from '../../models/beer.model';
import { createBeerThunk } from './beer.thunk';

type LoginState = 'idle' | 'logging' | 'error';

type BeerState = {
  loggedBeer: Beer | null;
  loggingState: LoginState;
};

const initialState: BeerState = {
  loggedBeer: null,
  loggingState: 'idle',
};

const beersSlice = createSlice({
  name: 'beers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      createBeerThunk.fulfilled,
      (state: BeerState, { payload }) => {
        state.loggedBeer = payload;
        state.loggingState = 'idle';
      }
    );
    builder.addCase(createBeerThunk.pending, (state: BeerState) => {
      state.loggingState = 'logging';
    });

    builder.addCase(createBeerThunk.rejected, (state: BeerState) => {
      state.loggingState = 'error';
    });
  },
});

export default beersSlice.reducer;
