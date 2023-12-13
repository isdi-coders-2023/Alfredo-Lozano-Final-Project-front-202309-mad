import { Beer } from '../../models/beer.model';
import {
  getUserIdFromLocalStorage,
  getUserTokenFromLocalStorage,
} from '../../types/take.id.tsx';

const userToken = getUserTokenFromLocalStorage();

export class ApiRepoBeers {
  userToken: string;
  constructor(userToken: string) {
    this.userToken = userToken;
  }

  async createBeer(newBeer: FormData): Promise<Beer> {
    const userID = getUserIdFromLocalStorage();
    const url = `http://localhost:1969/beer/${userID}`;
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

  async loadBeers(): Promise<Beer[]> {
    const response = await fetch('http://localhost:1969/beer');
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }
}
