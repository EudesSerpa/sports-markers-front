import fallbackImage from "../../assets/noImage.png";
import "./index.css";

export const Team = ({ name, imageURI }) => {
  return (
    <figure className="team">
      <img
        src={imageURI || fallbackImage}
        alt={`${name} image`}
        className="team__image"
        width="110"
        height="110"
      />

      <figcaption className="team__details">
        <h5 className="team__title">{name}</h5>
      </figcaption>
    </figure>
  );
};
