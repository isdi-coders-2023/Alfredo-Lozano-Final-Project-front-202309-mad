export function getUserIdFromLocalStorage() {
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
}

export function getUserTokenFromLocalStorage() {
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

  if (!user || !user.token) {
    throw new Error(
      'No se encontró la propiedad "id" en la información del usuario'
    );
  }

  return user.token;
}
