import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pubs } from '../../models/pub.model';
import { createThunk, loadPubsThunk } from './pubs.thunk';

type LoginState = 'idle' | 'logging' | 'error';

export type PubState = {
  currentPubItem: Pubs | null;
  pubState: LoginState;
  pubs: Pubs[];
};

const initialState: PubState = {
  currentPubItem: null,
  pubState: 'idle',
  pubs: [],
};

const pubsSlice = createSlice({
  name: 'pubs',
  initialState,
  reducers: {
    setCurrentPubItem(
      state: PubState,
      { payload }: PayloadAction<Pubs | null>
    ) {
      state.currentPubItem = payload;
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(createThunk.fulfilled, (state: PubState, { payload }) => ({
      ...state,
      currentPubItem: payload,
      pubState: 'idle',
    }));

    builder.addCase(
      loadPubsThunk.fulfilled,
      (state: PubState, { payload }: PayloadAction<Pubs[]>) => {
        state.pubs = payload;
        state.pubState = 'idle';
      }
    );

    builder.addCase(loadPubsThunk.pending, (state: PubState) => {
      state.pubState = 'logging';
    });

    builder.addCase(loadPubsThunk.rejected, (state: PubState) => {
      state.pubState = 'error';
    });

    builder.addCase(createThunk.pending, (state: PubState) => {
      state.pubState = 'logging';
    });

    builder.addCase(createThunk.rejected, (state: PubState) => {
      state.pubState = 'error';
    });
  },
});

export default pubsSlice.reducer;
