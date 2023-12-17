import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import BeerList from '../list/beer.list';

const Login = lazy(() => import('../login/login'));
const Register = lazy(() => import('../register/register'));
const ErrorPage = lazy(() => import('../error/error'));
const CreatePub = lazy(() => import('../pubs/pubs.form'));
const CreateBeer = lazy(() => import('../beers/beers.form'));
const PubList = lazy(() => import('../list/pub.list'));
const BeerDetails = lazy(() => import('../details/beer.detail'));
const UserDetails = lazy(() => import('../details/user.details'));

export function Router() {
  return (
    <main>
      <Suspense>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/home" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addPub" element={<CreatePub />} />
          <Route path="/addBeer" element={<CreateBeer />} />
          <Route path="/pubs" element={<PubList />} />
          <Route path="/beers" element={<BeerList />} />
          <Route path="/user" element={<UserDetails />}></Route>
          <Route path="/details/:beerId" element={<BeerDetails />}></Route>
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </main>
  );
}
