import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

/**
 * Checks if the user is logged in to allow them to view the protected pages
 *
 * @returns - children | <Outlet/> If it used as a wrapper or Layout component, respectively.
 */
export const ProtectedRoute = ({ children, redirectPath = "/" }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
