import { useEffect } from 'react';
import { useBeer } from '../../hooks/use.beers';
import { Beer } from '../../models/beer.model';
import BeerCard from '../cards/beers.cards';

export default function BeerList() {
  const { loadBeer, beers } = useBeer();

  useEffect(() => {
    loadBeer();
  }, [loadBeer]);

  return (
    <div className="list-container">
      <h2>Beers</h2>

      <ul className="beers-list">
        {beers.map((item: Beer) => (
          <BeerCard key={item.id} beer={item} />
        ))}
      </ul>
    </div>
  );
}
