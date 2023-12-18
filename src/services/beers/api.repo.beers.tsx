import { Beer } from '../../models/beer.model';

export class ApiRepoBeers {
  userToken: string | null;

  constructor() {
    this.userToken = localStorage.getItem('user') || null;
  }

  async createBeer(newBeer: FormData): Promise<Beer> {
    const finalid = JSON.parse(this.userToken!);
    const url = `http://localhost:1969/beer/${finalid.id}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: newBeer,
        headers: {
          Authorization: 'Bearer ' + this.userToken,
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

  async loadBeerbyId(_beerId: Beer['id']): Promise<Beer> {
    const beerID = _beerId;
    const response = await fetch(`http://localhost:1969/beer/${beerID}`);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }
}
