import "./index.css";

export const Team = ({ name, imageURI }) => {
  return (
    <figure className="team">
      <img
        src={imageURI || "src/assets/noImage.png"}
        alt={name}
        className="team__image"
        width="130"
        height="130"
      />

      <figcaption className="team__details">
        <h5 className="team__title">{name}</h5>
      </figcaption>
    </figure>
  );
};
