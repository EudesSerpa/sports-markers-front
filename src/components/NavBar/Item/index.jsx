import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/auth/useAuth";

export const NavBarItem = ({
  route: { path, text, className, icon, requireAuth, showAlways },
}) => {
  const { isLogged, logout } = useAuth();

  if (!showAlways) {
    if (!requireAuth && isLogged) return;
    if (requireAuth && !isLogged) return;
  }

  return (
    <li className={`header__item ${className || ""}`}>
      <NavLink
        to={path}
        end
        className="header__link"
        onClick={text?.toLowerCase() === "logout" ? logout : null}
      >
        {text}
        {icon && icon}
      </NavLink>
    </li>
  );
};
