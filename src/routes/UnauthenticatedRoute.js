import { Route, Redirect, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../stores/user';

export const UnauthenticatedRoute = ({ children, ...rest }) => {
  const user = useRecoilValue(userState);

  const location = useLocation();
  const URI = new URLSearchParams(location.search);
  const path = URI.get('redirectpath');
  const param = URI.get('redirectquery');
  // const redirect = `${location.pathname}${param ? `?${param}` : ''}`;

  return (
    <Route
      {...rest}
      render={props => {
        if (user) {
          // not logged in so redirect to login page with the return url
          return (
            // <Redirect to={`/${redirect}`} />
            // <Redirect
            //   to={{ pathname: `/${redirect}`, state: { from: props.location } }}
            // />
            <Redirect
              to={{
                pathname: path,
                search: param,
                state: { from: props.location },
              }}
            />
          );
        }

        // authorized so return component
        return children;
      }}
    />
  );
};
