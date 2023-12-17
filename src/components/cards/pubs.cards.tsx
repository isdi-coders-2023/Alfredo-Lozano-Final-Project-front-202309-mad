import { Link } from 'react-router-dom';
import { Pubs } from '../../models/pub.model';

type Props = {
  pub: Pubs;
};

export default function PubCard({ pub }: Props) {
  return (
    <li
      className="pub-card"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Link
        to={'/details/' + pub.id}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div className="card-container">
          <div className="card-info-container">
            <div className="card-name-container">
              {' '}
              Pub: <p className="card-name">{pub.name} </p>
            </div>
            <div className="card-direction-container">
              {' '}
              Direccion:
              <p className="card-direction">{pub.direction}</p>
            </div>
            <div className="card-owner-container">
              {' '}
              Camarero:
              <p className="card-owner">{pub.owner}</p>
            </div>
            <div className="card-beers-container">
              {' '}
              Nº de Grifos:
              <p className="card-beers">{pub.beers?.length}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
