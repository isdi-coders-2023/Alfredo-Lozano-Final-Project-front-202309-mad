import { SyntheticEvent } from 'react';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../models/user.model';
import style from './Register.module.scss';
import Swal from 'sweetalert2';

export function Register() {
  const { register } = useUsers();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const data = {
      name: (formElement.elements.namedItem('name') as HTMLInputElement).value,
      surname: (formElement.elements.namedItem('surname') as HTMLInputElement)
        .value,
      age: (formElement.elements.namedItem('age') as HTMLInputElement)
        .valueAsNumber,
      userName: (formElement.elements.namedItem('user') as HTMLInputElement)
        .value,
      email: (formElement.elements.namedItem('email') as HTMLInputElement)
        .value,
      password: (formElement.elements.namedItem('password') as HTMLInputElement)
        .value,
    } as Partial<User>;
    if (
      data.userName === '' ||
      data.email === '' ||
      data.password === '' ||
      data.name === '' ||
      data.age! <= 18 ||
      data.surname === ''
    )
      Swal.fire({
        width: '20em',
        icon: 'error',
        title: 'REGISTER ERROR',
        text: 'Try again please',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'red',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2500,
      });
    else {
      register(data);
      formElement.reset();
    }
  };

  return (
    <>
      <header title="Be Beers"></header>
      <div className={style.form}>
        <form onSubmit={handleSubmit} aria-label="form">
          <div className={style.inputs}>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" />
            <label htmlFor="Surname">Surname: </label>
            <input type="text" id="Surname" name="Surname" />
            <label htmlFor="age">age: </label>
            <input type="text" id="age" name="age" />
            <label htmlFor="userName">User name: </label>
            <input type="text" id="User name" name="User name" />
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" role="textbox" />
            <label htmlFor="passward">Password: </label>
            <input
              type="text"
              id="password"
              data-testid="password"
              name="password"
            />
          </div>
          <div className={style.submit}>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
}
