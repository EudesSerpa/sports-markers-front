import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

/**
 * Checks if the user is logged in to allow them to view the protected pages.
 *
 * @returns - children | <Outlet/> If it used as a wrapper or Layout component, respectively.
 *
 * https://www.robinwieruch.de/react-router-private-routes
 */
export const ProtectedRoute = ({ children, redirectPath = "/login" }) => {
  const { isLogged } = useAuth();
  const location = useLocation();

  if (!isLogged) {
    // Redirect them to the /login (default) page, but save the current location they were
    // trying to go to when they were redirected.
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};
