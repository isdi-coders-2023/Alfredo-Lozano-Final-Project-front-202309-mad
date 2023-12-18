import { UserButtons } from '../Buttons/user.button';
import './Header.module.scss';
import smalLogo from '/smalLogo.png';
import smallbeerlogo from '/smallbeerlogo.svg';

export function Header() {
  return (
    <header>
      <div className="header">
        <img
          src={smallbeerlogo}
          alt="small de beer logo"
          className="smallogo"
        />

        <img src={smalLogo} alt="beer logo front" className="smallbeer" />
      </div>
      <UserButtons />
    </header>
  );
}
