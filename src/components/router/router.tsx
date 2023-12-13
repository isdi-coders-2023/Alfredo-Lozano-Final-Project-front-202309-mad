import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import BeerList from '../list/beer.list';

const Login = lazy(() => import('../login/login'));
const Register = lazy(() => import('../register/register'));
const ErrorPage = lazy(() => import('../error/error'));
const CreatePub = lazy(() => import('../pubs/pubs.form'));
const CreateBeer = lazy(() => import('../beers/beers.form'));
const PubList = lazy(() => import('../list/pub.list'));
export function Router() {
  return (
    <main>
      <Suspense>
        <Routes>
          <Route path="" element={<Login></Login>}></Route>
          <Route path="/home" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/addPub" element={<CreatePub></CreatePub>}></Route>
          <Route path="/addBeer" element={<CreateBeer></CreateBeer>}></Route>
          <Route path="/pubs" element={<PubList></PubList>}></Route>
          <Route path="/beers" element={<BeerList></BeerList>}></Route>
          <Route path="/*" element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
      </Suspense>
    </main>
  );
}
