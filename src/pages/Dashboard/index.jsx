import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useAuth } from "../../hooks/auth/useAuth";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const { jwt } = useAuth();

  useEffect(() => {
    const decodedJWT = jwtDecode(jwt);
    setUser({ username: decodedJWT.username });
  }, []);

  return (
    <section className="section__page">
      <h1 className="section__title">Dashboard</h1>

      <p>Welcome, {user?.username}</p>
    </section>
  );
};

export default Dashboard;
