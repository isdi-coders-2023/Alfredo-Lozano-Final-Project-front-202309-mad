import { createSlice } from '@reduxjs/toolkit';
import { Pubs } from '../../models/pub.model';
import { createThunk } from './pubs.thunk';

type LoginState = 'idle' | 'logging' | 'error';

type PubState = {
  loggedPub: Pubs | null;
  loggingState: LoginState;
};

const initialState: PubState = {
  loggedPub: null,
  loggingState: 'idle',
};

const pubsSlice = createSlice({
  name: 'pubs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createThunk.fulfilled, (state: PubState, { payload }) => {
      state.loggedPub = payload;
      state.loggingState = 'idle';
    });
    builder.addCase(createThunk.pending, (state: PubState) => {
      state.loggingState = 'logging';
    });

    builder.addCase(createThunk.rejected, (state: PubState) => {
      state.loggingState = 'error';
    });
  },
});

export default pubsSlice.reducer;
