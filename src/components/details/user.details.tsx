import { useUsers } from '../../hooks/use.users';
import { Beer } from '../../models/beer.model';
import BeerCard from '../cards/beers.cards';
import style from './Beer.details.module.scss';

export default function UserDetails() {
  const { loggedUser } = useUsers();

  return (
    <>
      <div className={style.main}>
        <h2 className="main-title"> Hola {loggedUser?.userName}</h2>
        <div className={style.details}>
          <ul>
            <li>
              NAME: <span>{loggedUser!.name}</span>
            </li>
            <li>
              SURNAME: <span>{loggedUser!.surname}</span>
            </li>
            <li>
              EMAIL: <span>{loggedUser!.email}</span>
            </li>
            <li>
              EDAD: <span>{loggedUser!.age}</span>
            </li>
          </ul>
        </div>
      </div>
      <ul className="Beer-list">
        {loggedUser!.probada.map((item: Beer) => (
          <BeerCard key={item.id} beer={item} />
        ))}
      </ul>
    </>
  );
}
