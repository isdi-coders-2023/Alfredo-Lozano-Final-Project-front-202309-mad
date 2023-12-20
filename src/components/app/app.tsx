import { useEffect } from 'react';
import { useUsers } from '../../hooks/use.users';
import Footer from '../footer/footer';
import { Header } from '../header/header';
import { Router } from '../router/router';

export function App() {
  const { loginWithToken } = useUsers();

  useEffect(() => {
    loginWithToken();
  }, []);
  return (
    <>
      <Header></Header>
      <Router></Router>
      <Footer></Footer>
    </>
  );
}
