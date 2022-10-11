import { useState } from "react";
import { Link } from "react-router-dom";
import { NavBarItem } from "./Item";
import "./index.css";

export const NavBar = () => {
  const [isMenuActive, setIsMenuActive] = useState({
    isOpen: false,
    firstRender: true,
  });

  const handleClick = () => {
    setIsMenuActive((prevState) => ({
      isOpen: !prevState.isOpen,
      firstRender: false,
    }));
  };

  const handleCloseMobileMenu = (e) => {
    if (e.target.tagName !== "A") return;

    setIsMenuActive({ isOpen: false, firstRender: false });
  };

  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/">
          <img
            src="src/assets/sports_markers_logo.png"
            alt="Sports Markers logo"
            className="header__logo"
          />
        </Link>
      </div>

      <nav className="header__nav nav wrapper">
        <ul
          className={`nav__list ${
            isMenuActive.isOpen ? "nav__list--active" : ""
          }`}
          onClick={handleCloseMobileMenu}
        >
          {routes.map((route) => (
            <NavBarItem key={route.text} route={route} />
          ))}
        </ul>

        <div
          className={`icon-container ${
            isMenuActive.isOpen
              ? "open"
              : isMenuActive.firstRender
              ? ""
              : "close"
          }`}
          onClick={handleClick}
        >
          <span className="icon-line" aria-label="hidden"></span>
        </div>
      </nav>
    </header>
  );
};

const routes = [
  {
    path: "/login",
    text: "Login",
    icon: "https://i.postimg.cc/W4Rj8hsf/icon-login.png",
    className: "nav__list-item--login",
    requireAuth: false,
  },
  {
    path: "/login",
    text: "Logout",
    className: "nav__list-item--logout",
    requireAuth: true,
  },
  {
    path: "/dashboard",
    text: "Dashboard",
    requireAuth: true,
  },
];
