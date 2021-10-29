import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import { UnauthenticatedRoute } from './UnauthenticatedRoute';
import { lazy, Suspense, useEffect } from 'react';
import { Spinner, Flex } from '@chakra-ui/react';
import Login from '../pages/auth/Login';
import ScrollToTop from '../components/ScrollToTop';
import MyProfile from '../pages/dashboard/MyProfile';
import Agencies from '../pages/dashboard/Agencies';
import AgencyDetail from '../pages/dashboard/AgencyDetail';
import Simulation from '../pages/dashboard/simulation/Simulation';
import SimulationDetail from '../pages/dashboard/simulation/SimulationDetail';
// const MyProfile = lazy(() => import('../pages/dashboard/MyProfile'));
// const Agencies = lazy(() => import('../pages/dashboard/Agencies'));
// const AgenciesDetail = lazy(() => import('../pages/dashboard/AgenciesDetail'));
// const Simulation = lazy(() => import('../pages/dashboard/Simulation'));

export const Router = () => {
  return (
    <BrowserRouter>
      {/* <Suspense
        fallback={
          <Flex alignItems="center" justifyContent="center" minH="100vh">
            <Spinner />
          </Flex>
        }
      > */}
      <ScrollToTop />
      <Switch>
        <UnauthenticatedRoute path="/login" children={<Login />} />

        <AuthenticatedRoute path="/" exact children={<MyProfile />} />

        <AuthenticatedRoute
          path="/info-instansi"
          exact
          children={<Agencies />}
        />
        <AuthenticatedRoute
          path="/info-instansi/:id"
          children={<AgencyDetail />}
        />

        <AuthenticatedRoute path="/simulasi" exact children={<Simulation />} />
        <AuthenticatedRoute
          path="/simulasi/:id"
          children={<SimulationDetail />}
        />

        <Route>404 Not Found</Route>
      </Switch>
      {/* </Suspense> */}
    </BrowserRouter>
  );
};
