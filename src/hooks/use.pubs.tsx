import { useCallback, useMemo } from 'react';
import { Pubs } from '../models/pub.model';
import { ApiRepoPubs } from '../services/pubs/api.repo.pubs';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadPubsThunk } from '../slices/pubs.slices/pubs.thunk';

export function usePubs() {
  const { currentPubItem: loggedPub, pubs } = useSelector(
    (state: RootState) => state.pubsState
  );
  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new ApiRepoPubs(), []);

  const createPub = (newPub: Partial<Pubs>) => {
    repo.createPub(newPub);
  };

  const loadPubs = useCallback(async () => {
    dispatch(loadPubsThunk(repo));
  }, [dispatch, repo]);

  return {
    pubs,
    loggedPub,
    loadPubs,
    dispatch,
    createPub,
  };
}
