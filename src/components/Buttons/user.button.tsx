import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useUsers } from '../../hooks/use.users';
import style from './User.button.module.scss';

export function UserButtons() {
  const { loggedUser } = useSelector((state: RootState) => state.usersState);
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
      {!loggedUser && location.pathname === '/' && registerLink}
      {!loggedUser && location.pathname === '/home' && registerLink}
      {!loggedUser && location.pathname === '/register' && homeLink}
      {loggedUser && (
        <Link to="/" className={style.container}>
          <button className={style.container} onClick={logoutUser}>
            Logout
          </button>
          <div className="user-info">
            <p className="username">Hola {loggedUser.name}</p>
          </div>
        </Link>
      )}
    </section>
  );
}
