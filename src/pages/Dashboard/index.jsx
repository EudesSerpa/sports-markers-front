import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useAuth } from "../../hooks/auth/useAuth";
import { ListOfEvents } from "../../components/ListOfEvents";
import "./index.css";

const Dashboard = () => {
  const { jwt } = useAuth();
  const [user, setUser] = useState(null);
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const decodedJWT = jwtDecode(jwt);
    setUser({ username: decodedJWT.username });
  }, []);

  return (
    <section className="section-page">
      <h1
        className="section-title title ta-center"
        data-title={`Welcome, ${user?.username}`}
      >
        Welcome,
        <span className="title--username"> {user?.username}</span>!
      </h1>

      <ListOfEvents events={userEvents} />
    </section>
  );
};

export default Dashboard;
