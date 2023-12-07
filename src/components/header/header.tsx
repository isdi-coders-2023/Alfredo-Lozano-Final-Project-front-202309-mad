import { UserButtons } from '../Buttons/user.button';
import './Header.module.scss';

export function Header() {
  return (
    <header>
      <div className="header">
        <img
          src="./smallbeerlogo.svg"
          alt="beer logo front"
          className="smallbeer"
        />
        <img
          src="./smalLogo.png"
          alt="small de beer logo "
          className="smallogo"
        />
      </div>
      <UserButtons></UserButtons>
    </header>
  );
}
