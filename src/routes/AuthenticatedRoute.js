import { Route, Redirect, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../stores/user';

export const AuthenticatedRoute = ({ children, ...rest }) => {
  const user = useRecoilValue(userState);

  const location = useLocation();
  const param = new URLSearchParams(location.search);

  return (
    <Route
      {...rest}
      render={props => {
        if (!user) {
          // not logged in so redirect to login page with the return url
          return (
            // <Redirect to={`/login?redirect=${encodeURIComponent(redirect)}`} />
            <Redirect
              to={{
                pathname: '/login',
                search: `?redirectpath=${encodeURIComponent(
                  location.pathname
                )}${
                  param.toString()
                    ? `&redirectquery=${encodeURIComponent(param)}`
                    : ''
                }`,
                state: { from: props.location },
              }}
            />
            // <Redirect
            //   to={{ pathname: '/login', state: { from: props.location } }}
            // />
          );
        }

        // authorized so return component
        return children;
      }}
    />
  );
};
