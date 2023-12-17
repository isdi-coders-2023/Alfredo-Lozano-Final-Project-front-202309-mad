import { useEffect } from 'react';
import { useBeer } from '../../hooks/use.beer';
import { useUsers } from '../../hooks/use.users';
import { addBeer } from '../../slices/user.slices/user.slice';
// Import { makeImageURL } from '../../services/images';

export default function BeerDetails() {
  const { currentBeerItem, loadBeer } = useBeer();

  useEffect(() => {
    loadBeer();
  }, [loadBeer]);

  console.log('path param', currentBeerItem);
  // Const desktopDetailBeerImg =
  //   currentBeerItem?.beerImg.publicId &&
  //   makeImageURL(currentBeerItem.beerImg.publicId, 550);

  const { loggedUser } = useUsers();
  const handleAddBeer = () => {
    addBeer(loggedUser!.id);
  };

  return (
    <li
      className="beer-card"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="card-container">
        {/* <img src={mobileBeerImg} alt={`movil beer image de ${beer.name}`} /> */}
        <img
          src={currentBeerItem?.beerImg.url}
          alt={`movil beer image de ${currentBeerItem!.name}`}
        />
        <div className="card-info-container">
          <div className="card-name-container">
            {' '}
            name: <p className="card-name">{currentBeerItem!.name} </p>
          </div>
          <div className="card-direction-container">
            {' '}
            brewer:
            <p className="card-direction">{currentBeerItem!.brewer}</p>
          </div>
          <div className="card-owner-container">
            {' '}
            style:
            <p className="card-owner">{currentBeerItem!.style}</p>
          </div>
          <div className="card-beers-container">
            {' '}
            alcohol:
            <p className="card-beers">{currentBeerItem!.alcohol}</p>
          </div>
        </div>
        <button onClick={handleAddBeer}>❤️</button>
      </div>
    </li>
  );
}
