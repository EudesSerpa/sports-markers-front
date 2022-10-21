import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useAuth } from "../../hooks/auth/useAuth";
import { ListOfEvents } from "../../components/ListOfEvents";
import { getUserEvents } from "../../services/events/getUserEvents";
import "./index.css";

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
        <Link to="./create" className="action-link add-event-link">
          Add new event
        </Link>

        <ListOfEvents events={userEvents} editable={true} />
      </div>
    </section>
  );
};

export default Dashboard;
