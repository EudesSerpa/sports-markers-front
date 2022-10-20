import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useAuth } from "../../hooks/auth/useAuth";
import { ListOfEvents } from "../../components/ListOfEvents";
import "./index.css";
import { getUserEvents } from "../../services/events/getUserEvents";

const Dashboard = () => {
  const { jwt } = useAuth();
  const [user, setUser] = useState(null);
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const decodedJWT = jwtDecode(jwt);
    setUser({ username: decodedJWT.username });
  }, []);

  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
      getUserEvents({ jwt }).then(setUserEvents);
    }

    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <section className="section-page">
      <header>
        <h1
          className="section-page__title title ta-center"
          data-title={`Welcome, ${user?.username}`}
        >
          Welcome,
          <span className="title--username"> {user?.username}</span>!
        </h1>
      </header>

      <div className="section-page__content">
        <Link to="./create-event" className="btn btn--add-event">
          Add new event
        </Link>

        <ListOfEvents events={userEvents} />
      </div>
    </section>
  );
};

export default Dashboard;
