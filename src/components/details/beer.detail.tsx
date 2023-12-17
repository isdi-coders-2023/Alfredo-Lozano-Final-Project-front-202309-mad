import { useEffect } from 'react';
import { useBeer } from '../../hooks/use.beer';
import { useUsers } from '../../hooks/use.users';
import { addBeer } from '../../slices/user.slices/user.slice';
import style from './Beer.details.module.scss';
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
    <div className={style.main}>
      <h2 className="main-title"> Details </h2>

      <div className={style.details}>
        <img src={currentBeerItem!.beerImg.url} alt="image"></img>
        <ul>
          <li>
            NAME: <span>{currentBeerItem!.name}</span>
          </li>
          <li>
            BREWER: <span>{currentBeerItem!.brewer}</span>
          </li>
          <li>
            STYLE: <span>{currentBeerItem!.style}</span>
          </li>
          <li>
            ALCOHOL: <span>{currentBeerItem!.alcohol}</span>
          </li>
          <button onClick={handleAddBeer} className={style.button}>
            {' '}
            ❤️
          </button>
        </ul>
      </div>
    </div>
  );
}
