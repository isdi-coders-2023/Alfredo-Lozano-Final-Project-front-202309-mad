import { SyntheticEvent, useState } from 'react';
import { usePubs } from '../../hooks/use.pubs';
import { Pubs } from '../../models/pub.model';
import Swal from 'sweetalert2';
import style from './Pubs.form.module.scss';

export default function CreatePub() {
  const [create, setHasCreate] = useState(false);
  const { createPub } = usePubs();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const data = {
      name: (formElement.elements.namedItem('name') as HTMLInputElement).value,
      direction: (
        formElement.elements.namedItem('direction') as HTMLInputElement
      ).value,
      owner: (formElement.elements.namedItem('owner') as HTMLInputElement)
        .value,
    } as Partial<Pubs>;

    if (data.name === '' || data.direction === '' || data.owner === '') {
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
    } else {
      createPub(data);
      setHasCreate(true);
      formElement.reset();
    }
  };

  return (
    <>
      <header title="Create Pubs"></header>
      {!create && (
        <form onSubmit={handleSubmit} aria-label="form">
          <div className={style.inputs}>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" />
          </div>
          <div className={style.inputs}>
            <label htmlFor="direction">direction: </label>
            <input type="text" id="direction" name="direction" />
          </div>
          <div className={style.inputs}>
            <label htmlFor="owner">owner: </label>
            <input type="text" id="owner" name="age" />
          </div>
          <div className={style.submit}>
            <button type="submit">Create</button>
          </div>
        </form>
      )}
    </>
  );
}
