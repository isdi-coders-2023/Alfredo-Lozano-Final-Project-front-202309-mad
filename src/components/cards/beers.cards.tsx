import { Link } from 'react-router-dom';
import { useBeers } from '../../hooks/use.beers';
import { Beer } from '../../models/beer.model';
import { makeImageURL } from '../../services/images';
import { useEffect } from 'react';

type Props = {
  beer: Beer;
};

export default function BeerCard({ beer }: Props) {
  const { handleBeerDetails, loadBeer } = useBeers();

  useEffect(() => {
    loadBeer();
  }, [loadBeer]);

  // Const mobileBeerImg =
  //   beer?.beerImg.publicId && makeImageURL(beer.beerImg.publicId, 160);
  const despocktBeerImg =
    beer?.beerImg.publicId && makeImageURL(beer?.beerImg.publicId, 160);

  return (
    <li
      className="beer-card"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="card-container">
        {/* <img src={mobileBeerImg} alt={`movil beer image de ${beer.name}`} /> */}
        <Link
          to={'/details/' + beer.id}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <img
            src={despocktBeerImg}
            alt={`movil beer image de ${beer.name}`}
            onClick={() => handleBeerDetails(beer)}
          />
        </Link>
        <div className="card-info-container">
          <div className="card-name-container">
            {' '}
            name: <p className="card-name">{beer.name} </p>
          </div>
          <div className="card-direction-container">
            {' '}
            brewer:
            <p className="card-direction">{beer.brewer}</p>
          </div>
          <div className="card-owner-container">
            {' '}
            style:
            <p className="card-owner">{beer.style}</p>
          </div>
          <div className="card-beers-container">
            {' '}
            alcohol:
            <p className="card-beers">{beer.alcohol}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
