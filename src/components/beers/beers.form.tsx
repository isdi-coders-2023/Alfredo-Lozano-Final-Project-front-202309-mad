import { SyntheticEvent } from 'react';
import { useBeer } from '../../hooks/use.beers';
import { Beer } from '../../models/beer.model';
import Swal from 'sweetalert2';
import style from './Beers.form.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function CreatePub() {
  const { loggedUser } = useSelector((state: RootState) => state.usersState);
  const { createBeer } = useBeer();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;

    const data = {
      name: (formElement.elements.namedItem('name') as HTMLInputElement).value,
      brewer: (formElement.elements.namedItem('brewer') as HTMLInputElement)
        .value,
      style: (formElement.elements.namedItem('style') as HTMLInputElement)
        .value,
      alcohol: (formElement.elements.namedItem('alcohol') as HTMLInputElement)
        .value,
      beerImg: (formElement.elements.namedItem('beerImg') as HTMLInputElement)
        .files?.[0],
    } as unknown as Partial<Beer>;

    if (
      data.name === '' ||
      data.brewer === '' ||
      data.style === '' ||
      data.alcohol === '' ||
      data.beerImg === undefined
    ) {
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
      createBeer(data);
      formElement.reset();
    }
  };

  return (
    <>
      {loggedUser && (
        <form onSubmit={handleSubmit} aria-label="Create Beers Form">
          <h1>Create Beers</h1>
          <div className={style.inputs}>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" />
          </div>
          <div className={style.inputs}>
            <label htmlFor="brewer">Brewer: </label>
            <input type="text" id="brewer" name="brewer" />
          </div>
          <div className={style.inputs}>
            <label htmlFor="style">Style: </label>
            <input type="text" id="style" name="style" />
          </div>
          <div className={style.inputs}>
            <label htmlFor="alcohol">Alcohol: </label>
            <input type="text" id="alcohol" name="alcohol" />
          </div>
          <div className={style.inputs}>
            <label htmlFor="beerImg">Beer Image: </label>
            <input type="file" id="beerImg" name="beerImg" accept="image/*" />
          </div>
          <div className={style.submit}>
            <button type="submit">Create</button>
          </div>
        </form>
      )}
    </>
  );
}
