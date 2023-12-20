import { UserButtons } from '../Buttons/user.button';
import style from './Header.module.scss';

export function Header() {
  return (
    <header className={style.header}>
      <div className={style.Images}>
        <img
          rel="preload"
          src={`https://res.cloudinary.com/dv0kwrjox/image/upload/v1702986472/resources/wr67f4jkhumqrazpycox.svg`}
          alt="small de beer logo"
          className={style.smallBeer}
        />

        <img
          rel="preload"
          src={`https://res.cloudinary.com/dv0kwrjox/image/upload/h_100/v1702985430/resources/mbjqnou17yz6hztz4otx.png`}
          alt="beer logo front"
          className={style.DeBeers}
        />
      </div>
      <div className={style.buttons}>
        <UserButtons />
      </div>
    </header>
  );
}
