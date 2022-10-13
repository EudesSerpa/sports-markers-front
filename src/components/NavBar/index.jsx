import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdLogin, MdLogout } from "react-icons/md";
import { NavBarItem } from "./Item";
import "./index.css";

export const NavBar = () => {
  const btnHamburger = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keyup", closeMenuWithEscapeKey);
    }

    return () => {
      document.removeEventListener("keyup", closeMenuWithEscapeKey);
    };
  }, [isOpen]);

  const closeMenuWithEscapeKey = ({ code }) => {
    if (!isOpen) return;
    if (code !== "Escape") return;

    setIsOpen(false);
    setIsFirstRender(false);
    btnHamburger.current.focus();
  };

  const toggleMenu = () => {
    setIsFirstRender(false);
    setIsOpen((prevState) => !prevState);
  };

  const handleCloseMobileMenu = (e) => {
    if (e.target.tagName !== "A") return;

    setIsFirstRender(false);
    setIsOpen(false);
  };

  return (
    <>
      <Link to="#main" className="skip-link">
        Skip to main content
      </Link>

      <header className="header">
        <div className="header__content wrapper">
          <Link to="/" className="header__logo-container">
            <img
              src="./src/assets/sports_markers_logo.png"
              alt="Sports Markers logo"
              className="header__logo"
              width="140"
              height="60"
            />
          </Link>

          <div className="header__menu">
            <button
              ref={btnHamburger}
              className={`header__hamburger ${
                isFirstRender ? "" : isOpen ? "open" : "close"
              }`}
              onClick={toggleMenu}
              aria-label={`${isOpen ? "Close" : "Open"} navigation menu`}
              aria-controls="main-nav"
              aria-expanded={isOpen}
            >
              <span
                className="header__hamburger-line"
                aria-hidden={true}
              ></span>
            </button>

            <nav id="main-nav" className="header__nav nav">
              <ul
                className={`header__nav-list ${
                  isOpen
                    ? "header__nav-list--shown"
                    : "header__nav-list--hidden"
                }`}
                onClick={handleCloseMobileMenu}
              >
                {routes.map((route) => (
                  <NavBarItem key={route.text} route={route} />
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

const routes = [
  {
    path: "/",
    text: "Home",
    showAlways: true,
  },
  {
    path: "/login",
    text: "Login",
    icon: <MdLogin />,
    className: "header__item--login",
    requireAuth: false,
  },
  {
    path: "/register",
    text: "Register",
    className: "header__item--register",
    requireAuth: false,
  },
  {
    path: "/dashboard",
    text: "Dashboard",
    requireAuth: true,
  },
  {
    path: "/login",
    text: "Logout",
    icon: <MdLogout />,
    className: "header__item--logout",
    requireAuth: true,
  },
];
