import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import { UnauthenticatedRoute } from './UnauthenticatedRoute';
import { lazy, Suspense } from 'react';
import { Spinner, Flex } from '@chakra-ui/react';

import Login from '../pages/auth/Login';
const MyProfile = lazy(() => import('../pages/dashboard/MyProfile'));
const Agencies = lazy(() => import('../pages/dashboard/Agencies'));

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Flex alignItems="center" justifyContent="center" minH="100vh">
            <Spinner />
          </Flex>
        }
      >
        <Switch>
          <UnauthenticatedRoute path="/login" children={<Login />} />

          <AuthenticatedRoute path="/" exact children={<MyProfile />} />
          <AuthenticatedRoute path="/info-instansi" children={<Agencies />} />
          <AuthenticatedRoute path="/simulasi" children={<MyProfile />} />

          <Route>404 Not Found</Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
