import { useEffect } from 'react';
import { useBeers } from '../../hooks/use.beers';
import { Beer } from '../../models/beer.model';
import BeerCard from '../cards/beers.cards';
import style from './Beer.list.module.scss';

export default function BeerList() {
  const { loadBeer, beers } = useBeers();

  useEffect(() => {
    loadBeer();
  }, [loadBeer]);

  return (
    <div className={style.list}>
      <h2>Beers</h2>

      <ul className={style.list}>
        {beers.map((item: Beer) => (
          <BeerCard key={item.id} beer={item} />
        ))}
      </ul>
    </div>
  );
}
