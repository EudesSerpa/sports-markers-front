import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";

export const NavBarItem = ({
  route: { path, text, className, icon, requireAuth },
}) => {
  const { isLogged, logout } = useAuth();

  if (!requireAuth && isLogged) return;
  if (requireAuth && !isLogged) return;

  return (
    <li className={`nav__list-item ${className || ""}`}>
      <NavLink
        to={path}
        onClick={text?.toLowerCase() === "logout" ? logout : null}
      >
        {text}
        {icon && (
          <img
            src={icon}
            alt=""
            aria-hidden={true}
            className="nav__list-icon"
          />
        )}
      </NavLink>
    </li>
  );
};
