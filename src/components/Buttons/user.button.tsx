import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useUsers } from '../../hooks/use.users';
import style from './User.button.module.scss';

export function UserButtons() {
  const { loggedUser: currentUserItem } = useSelector(
    (state: RootState) => state.usersState
  );
  const { logoutUser } = useUsers();
  const location = useLocation();
  const registerLink = (
    <Link to="/register">
      <button className={style.container}>Register</button>
    </Link>
  );
  const homeLink = (
    <Link to="/home">
      <button className={style.container}>Back</button>
    </Link>
  );

  return (
    <section className={style.container}>
      {!currentUserItem && location.pathname === '/' && registerLink}
      {!currentUserItem && location.pathname === '/home' && registerLink}
      {!currentUserItem && location.pathname === '/register' && homeLink}
      {currentUserItem && (
        <>
          {location.pathname !== '/addBeer' && (
            <Link to="/addBeer" className={style.container}>
              <button className={style.container}>Add Beer</button>
            </Link>
          )}
          <Link to="/" className={style.container} onClick={logoutUser}>
            <button className={style.container}>Logout</button>
          </Link>
        </>
      )}
    </section>
  );
}
