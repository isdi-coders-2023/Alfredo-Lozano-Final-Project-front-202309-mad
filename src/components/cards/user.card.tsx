import { useUsers } from '../../hooks/use.users';
import { Beer } from '../../models/beer.model';
import BeerCard from './beers.cards';

export default function UserCard() {
  const { loggedUser } = useUsers();
  if (!loggedUser) {
    return null;
  }

  return (
    <>
      <div className="card-direction-container">
        <p>Nombre: {loggedUser.name}</p>
        <p>Apellido: {loggedUser.surname}</p>
        <p>Edad: {loggedUser.age}</p>
        <p>Usuario: {loggedUser.userName}</p>
      </div>
      <div>
        <strong>Probadas:</strong>
        <ul>
          {loggedUser.probada.map((beer: Beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))}
        </ul>
      </div>
    </>
  );
}
