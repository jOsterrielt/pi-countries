/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

function Card({ flagImage, name, continent, ID }) {
  return (
    <Link className={styles.link} to={`/home/${ID}`}>
      <div className={styles.cardcontainer}>
        <img src={flagImage} alt={name} />
        <div className={styles.cardText}>
          <h2>{name}</h2>
          <h3>{continent}</h3>
        </div>
      </div>
    </Link>
  );
}

export default Card;
