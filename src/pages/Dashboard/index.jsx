import { Link } from "react-router-dom";
import { useUser } from "../../hooks/auth/useUser";
import { ListOfEvents } from "../../components/ListOfEvents";
import "./index.css";

// TODO: Add pagination
const Dashboard = () => {
  const { getUser, events } = useUser();

  const user = getUser();

  return (
    <section className="section-page">
      <header>
        <h1
          className="section-page__title title ta-center"
          data-title={`Welcome, ${user.username}`}
        >
          Welcome,
          <span className="title--username"> {user.username}</span>!
        </h1>
      </header>

      <div className="section-page__content">
        <Link to="./create" className="action-link add-event-link">
          Add new event
        </Link>

        <ListOfEvents events={events} editableEvents={true} />
      </div>
    </section>
  );
};

export default Dashboard;
