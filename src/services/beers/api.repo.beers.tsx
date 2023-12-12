import { Beer } from '../../models/beer.model';
import {
  getUserIdFromLocalStorage,
  getUserTokenFromLocalStorage,
} from './get.iD';

const buildApiUrl = (endpoint: string) => {
  const userID = getUserIdFromLocalStorage();
  return `http://localhost:1969/${endpoint}/${userID}`;
};

const userToken = getUserTokenFromLocalStorage();

export class ApiRepoBeers {
  userToken: string;
  constructor(userToken: string) {
    this.userToken = userToken;
  }

  async createBeer(newBeer: FormData): Promise<Beer> {
    const url = await buildApiUrl('beer');
    console.log(url);
    console.log(newBeer);
    console.log(userToken);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: newBeer,
        headers: {
          Authorization: 'Bearer ' + userToken,
        },
      });

      if (!response.ok) {
        throw new Error(response.status + ' ' + response.statusText);
      }

      return response.json();
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      throw new Error('Error al crear la cerveza');
    }
  }
}
