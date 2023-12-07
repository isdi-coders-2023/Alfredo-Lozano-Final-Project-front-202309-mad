import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Login = lazy(() => import('../login/login'));
const Register = lazy(() => import('../register/register'));
const ErrorPage = lazy(() => import('../error/error'));
export function Router() {
  return (
    <main>
      <Suspense>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/home" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/*" element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
      </Suspense>
    </main>
  );
}
