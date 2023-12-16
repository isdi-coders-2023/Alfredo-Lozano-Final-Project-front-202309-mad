import { ImgData } from '../types/img.data';
import { Pubs } from './pub.model';
import { User } from './user.model';

export type Beer = {
  id: string;
  name: string;
  brewer: string;
  style: string;
  alcohol: string;
  beerImg: ImgData;
  autor: User;
  pubs: Pubs;
};
