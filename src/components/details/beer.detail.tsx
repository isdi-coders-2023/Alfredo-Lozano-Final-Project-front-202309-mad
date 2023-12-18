import { useEffect } from 'react';
import { useBeers } from '../../hooks/use.beers';
import style from './Beer.details.module.scss';
import { makeImageURL } from '../../services/images';
import { useUsers } from '../../hooks/use.users';
import { useParams, useLocation } from 'react-router-dom';

export default function BeerDetails() {
  const { currentBeerItem, loadBeerById } = useBeers();
  const { addBeer, delBeer } = useUsers();

  useEffect(() => {
    loadBeerById();
  }, [loadBeerById]);

  const { beerId } = useParams();
  const location = useLocation();

  const desktopDetailBeerImg =
    currentBeerItem?.beerImg.publicId &&
    makeImageURL(currentBeerItem.beerImg.publicId, 550);

  const handleAddBeer = () => {
    addBeer(beerId!);
  };

  const handleDelBeer = () => {
    delBeer(beerId!);
  };

  return (
    <div className={style.main}>
      <h2 className="main-title"> Details </h2>

      <div className={style.details}>
        <img src={desktopDetailBeerImg} alt="image"></img>
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

          {location.pathname !== `/details/${currentBeerItem!.id}` && (
            <button onClick={handleAddBeer} className={style.button}>
              {' '}
              ❤️
            </button>
          )}
          {location.pathname === `/details/${currentBeerItem!.id}` && (
            <button onClick={handleDelBeer} className={style.button}>
              {' '}
              🗑
            </button>
          )}
        </ul>
      </div>
    </div>
  );
}
