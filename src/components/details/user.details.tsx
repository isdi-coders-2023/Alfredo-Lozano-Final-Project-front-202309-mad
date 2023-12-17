import { useEffect } from 'react';
import { useBeer } from '../../hooks/use.beer';
import { useUsers } from '../../hooks/use.users';
import { Beer } from '../../models/beer.model';
import BeerCard from '../cards/beers.cards';

export default function UserDetails() {
  const { loggedUser, loadUserId } = useUsers();
  const { loadBeer } = useBeer();

  useEffect(() => {
    loadUserId();
  }, [loadUserId]);

  useEffect(() => {
    loadBeer();
  }, [loadBeer]);

  console.log(loggedUser);
  console.log(loggedUser?.probada);

  return (
    <>
      <li
        className="User-card"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div className="card-container"></div>
        <div className="card-info-container">
          <div className="card-name-container">
            name: <p className="card-name">{loggedUser!.name}</p>
          </div>
          <div className="card-name-container">
            surname: <p className="card-name">{loggedUser!.surname}</p>
          </div>
          <div className="card-name-container">
            age: <p className="card-name">{loggedUser!.age}</p>
          </div>
          <div className="card-name-container">
            userName: <p className="card-name">{loggedUser!.userName}</p>
          </div>

          <ul className="Beer-list">
            {loggedUser?.probada.map((item: Beer) => (
              <BeerCard key={item.id} beer={item} />
            ))}
          </ul>
        </div>
      </li>
    </>
  );
}
