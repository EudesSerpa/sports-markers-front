import "./index.css";

export const Loader = ({ size, speed, color }) => {
  return (
    <svg
      style={{ "--uib-size": size, "--uib-speed": speed, "--uib-color": color }}
      className="ring"
      viewBox="25 25 50 50"
      strokeWidth="5"
    >
      <circle cx="50" cy="50" r="20" />
    </svg>
  );
};
