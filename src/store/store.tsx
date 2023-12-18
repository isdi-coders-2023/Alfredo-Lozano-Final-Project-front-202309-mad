import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user.slices/user.slice';

import beersReducer from '../slices/beer.slices/beer.slice';

export const appStore = configureStore({
  reducer: {
    beerState: beersReducer,

    usersState: userReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
