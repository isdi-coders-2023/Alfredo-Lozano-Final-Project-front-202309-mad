import { SyntheticEvent, useState } from 'react';
import { useUsers } from '../../hooks/use.users';
import { UserLogin } from '../../models/user.model';
import style from './Login.module.scss';
import Swal from 'sweetalert2';

export default function Login() {
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
      console.log(loggedUser);
      login(loggedUser);
      setHasLogin(true);
      element.reset();
    }
  };

  return (
    <>
      <section className="form-section"></section>
      <h2>Login</h2>
      {!hasLogin && (
        <form onSubmit={handleSubmit} aria-label="form">
          <div className={style.inputs}>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" role="textbox" />
          </div>
          <div className={style.inputs}>
            <label htmlFor="password">Password: </label>
            <input type="text" id="password" name="password" />
          </div>
          <div className={style.submit}>
            <button type="submit">Sign In</button>
          </div>
        </form>
      )}
      {hasLogin && (
        <div>
          <p>Login correcto</p>
          {/* <Link to={'/register'}>
            <button type="button">Continuar</button>
          </Link> */}
        </div>
      )}
    </>
  );
}
