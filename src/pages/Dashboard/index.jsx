import { useAuth } from "../../hooks/auth/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>

      <p>Welcome, {user.username}</p>
    </>
  );
};

export default Dashboard;
