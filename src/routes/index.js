import Login from '../pages/auth/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import { UnauthenticatedRoute } from './UnauthenticatedRoute';
import MyProfile from '../pages/dashboard/MyProfile';

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UnauthenticatedRoute path="/login" children={<Login />} />

        <AuthenticatedRoute path="/" exact children={<MyProfile />} />
        <AuthenticatedRoute path="/info-instansi" children={<MyProfile />} />
        <AuthenticatedRoute path="/simulasi" children={<MyProfile />} />

        <Route>404 Not Found</Route>
      </Switch>
    </BrowserRouter>
  );
};
