import { Beer } from '../../models/beer.model';
import { makeImageURL } from '../../services/images';

type Props = {
  beer: Beer;
};

export default function BeerCard({ beer }: Props) {
  // Const mobileBeerImg =
  //   beer?.beerImg.publicId && makeImageURL(beer.beerImg.publicId, 160);
  const desktopBeerImg =
    beer?.beerImg.publicId && makeImageURL(beer.beerImg.publicId, 250);

  return (
    <li
      className="beer-card"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="card-container">
        {/* <img src={mobileBeerImg} alt={`movil beer image de ${beer.name}`} /> */}
        <img src={desktopBeerImg} alt={`movil beer image de ${beer.name}`} />
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
          <div className="card-beers-container">
            {' '}
            probada:
            <p className="card-beers">{beer.probada}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
