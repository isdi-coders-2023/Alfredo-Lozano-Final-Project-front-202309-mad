import { SyntheticEvent, useState } from 'react';
import { useUsers } from '../../hooks/use.users';
import { UserLogin } from '../../models/user.model';
import style from './Login.module.scss';
import Swal from 'sweetalert2';

export function Login() {
  const [hasLogin, setHasLogin] = useState(false);
  const { login } = useUsers();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const element = event.target as HTMLFormElement;
    const loggedUser = {
      email: (element.elements.namedItem('email') as HTMLInputElement).value,
      password: (element.elements.namedItem('password') as HTMLInputElement)
        .value,
    } as UserLogin;
    if (loggedUser.email === '' || loggedUser.password === '') {
      Swal.fire({
        width: '20em',
        icon: 'error',
        title: 'LOGIN ERROR',
        text: 'Try again please',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'red',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2500,
      });
    } else {
      login(loggedUser);
      setHasLogin(true);
      element.reset();
    }
  };

  return (
    <>
      <header title="Be Beers"></header>
      <h2>Login</h2>
      {!hasLogin && (
        <div className={style.form}>
          <form onSubmit={handleSubmit} aria-label="form">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" role="textbox" />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              data-testid="password"
              name="password"
            />
            <div className={style.submit}>
              <button type="submit">Sign In</button>
            </div>
          </form>
        </div>
      )}
      {hasLogin && (
        <div>
          <p>Login correcto</p>
          {/* <Link to={'/home/'}>
            <button type="button">Continuar</button>
          </Link> */}
        </div>
      )}
    </>
  );
}
