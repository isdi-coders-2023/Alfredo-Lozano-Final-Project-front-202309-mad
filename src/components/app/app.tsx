import { Login } from '../login/login';
import { Register } from '../register/register';

export function App() {
  // Const menuOptions: MenuOption[] = [
  //   { label: 'Home', path: '/' },
  //   { label: 'Elements', path: '/elements' },
  //   { label: 'Scientists', path: '/scientists' },
  //   { label: 'Experiments', path: '/experiments/login-register' },
  //   { label: 'Create element', path: '/create' },
  // ];
  return (
    <>
      <Login></Login>
      <Register></Register>
    </>
  );
}
