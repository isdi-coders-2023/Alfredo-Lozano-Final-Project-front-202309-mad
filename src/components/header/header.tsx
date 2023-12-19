import { UserButtons } from '../Buttons/user.button';
import './Header.module.scss';

export function Header() {
  return (
    <header>
      <div className="header">
        <img
          src={`https://res.cloudinary.com/dv0kwrjox/image/upload/v1702986472/resources/wr67f4jkhumqrazpycox.svg`}
          alt="small de beer logo"
          className="smallogo"
        />

        <img
          src={`https://res.cloudinary.com/dv0kwrjox/image/upload/h_100/v1702985430/resources/mbjqnou17yz6hztz4otx.png`}
          alt="beer logo front"
          className="smallbeer"
        />
      </div>
      <UserButtons />
    </header>
  );
}
