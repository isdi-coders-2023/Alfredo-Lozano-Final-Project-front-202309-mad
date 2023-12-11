import { Beer } from '../../models/beer.model';

const getUserIdFromLocalStorage = () => {
  const userString = localStorage.getItem('user');
  if (!userString) {
    throw new Error('No se encontró información de usuario en el localStorage');
  }

  let user;
  try {
    user = JSON.parse(userString);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    throw new Error(
      'Error al analizar la información del usuario desde el localStorage'
    );
  }

  if (!user || !user.id) {
    throw new Error(
      'No se encontró la propiedad "id" en la información del usuario'
    );
  }

  return user.id;
};

const buildApiUrl = (endpoint: string) => {
  const userID = getUserIdFromLocalStorage();
  return `http://localhost:1969/${endpoint}/${userID}`;
};

export class ApiRepoBeers {
  async createBeer(newBeer: Partial<Beer>): Promise<Beer> {
    const url = await buildApiUrl('beer');
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newBeer),
        headers: {
          'Content-Type': 'application/json',
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
