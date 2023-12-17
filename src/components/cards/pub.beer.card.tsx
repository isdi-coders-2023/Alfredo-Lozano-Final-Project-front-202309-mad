// Import { SyntheticEvent } from 'react';
// import { Beer } from '../../models/beer.model';
// import { Pubs } from '../../models/pub.model';
// import BeerCard from './beers.cards';

// type Props = {
//   pub: Pubs;
// };

// export default function DetailPubCard({ pub }: Props, event: SyntheticEvent) {
//   event.preventDefault();
//   return (
//     <>
//       <strong>Beer Taps:</strong>
//       {pub.beers?.length ? (
//         <ul>
//           {pub.beers.map((beer: Beer) => (
//             <li key={beer.id}>
//               <BeerCard beer={beer} />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No hay cervezas disponibles en este pub.</p>
//       )}
//     </>
//   );
// }
