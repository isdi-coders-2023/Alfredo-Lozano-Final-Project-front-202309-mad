import { Pubs } from '../models/pub.model';
import { ApiRepoPubs } from '../services/pubs/api.repo.pubs';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';

export function usePubs() {
  const dispatch = useDispatch<AppDispatch>();
  const repo = new ApiRepoPubs();

  const createPub = (newPub: Partial<Pubs>) => {
    repo.createPub(newPub);
  };

  return {
    dispatch,
    createPub,
  };
}
