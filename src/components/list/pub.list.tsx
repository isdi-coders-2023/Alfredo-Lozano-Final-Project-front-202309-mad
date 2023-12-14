import { useEffect } from 'react';
import { usePubs } from '../../hooks/use.pubs';
import PubCard from '../cards/pubs.cards';
import { Pubs } from '../../models/pub.model';

export default function PubList() {
  const { loadPubs, pubs } = usePubs();

  useEffect(() => {
    loadPubs();
  }, [loadPubs]);

  return (
    <div className="list-container">
      <h2>Pubs</h2>

      <ul className="pub-list">
        {pubs.map((item: Pubs) => (
          <PubCard key={item.id} pub={item} />
        ))}
      </ul>
    </div>
  );
}
