import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Beer } from '../../models/beer.model';
import { createBeerThunk, loadBeerThunk } from './beer.thunk';

type LoginState = 'idle' | 'logging' | 'error';

type BeerState = {
  currentBeerItem: Beer | null;
  beerState: LoginState;
  beers: Beer[];
};

const initialState: BeerState = {
  currentBeerItem: null,
  beerState: 'idle',
  beers: [],
};

const beersSlice = createSlice({
  name: 'beers',
  initialState,
  reducers: {
    setCurrentBeerItem(
      state: BeerState,
      { payload }: PayloadAction<Beer | null>
    ) {
      state.currentBeerItem = payload;
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      createBeerThunk.fulfilled,
      (state: BeerState, { payload }) => {
        state.currentBeerItem = payload;
        state.beerState = 'idle';
      }
    );
    builder.addCase(
      loadBeerThunk.fulfilled,
      (state: BeerState, { payload }) => {
        state.beers = payload;
        state.beerState = 'idle';
      }
    );
    builder.addCase(loadBeerThunk.pending, (state: BeerState) => {
      state.beerState = 'logging';
    });

    builder.addCase(loadBeerThunk.rejected, (state: BeerState) => {
      state.beerState = 'error';
    });

    builder.addCase(createBeerThunk.pending, (state: BeerState) => {
      state.beerState = 'logging';
    });

    builder.addCase(createBeerThunk.rejected, (state: BeerState) => {
      state.beerState = 'error';
    });
  },
});

export default beersSlice.reducer;
