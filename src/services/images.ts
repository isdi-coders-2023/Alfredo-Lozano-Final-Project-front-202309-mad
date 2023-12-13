export const makeImageURL = (publicID: string, height: number) => {
  const urlBase = 'http://res.cloudinary.com/dv0kwrjox/image/upload';
  const url = `${urlBase}/h_${height}/${publicID}`;
  return url;
};
