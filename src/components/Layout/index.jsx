import { IconContext } from "react-icons";
import { NavBar } from "../NavBar";

export const Layout = ({ children }) => {
  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <NavBar />

      <main id="main" className="wrapper">
        {children}
      </main>
    </IconContext.Provider>
  );
};
