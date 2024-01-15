/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Card from "../Card/Card.jsx";
import Filters from "../Filters/Filters.jsx";

import error404 from "../../assets/404.png";
import styles from "./cards.module.css";

const Cards = ({ displayedCountries, setCurrentPage }) => {
  const countryFound = useSelector((state) => state.countryFound);
  return (
    <div className={styles.pageContainer}>
      <div className={styles.sidebar}>
        <Link to="/form" className={styles.navLink}>
          <button>Create activity</button>
        </Link>
        <Filters setCurrentPage={setCurrentPage} />
      </div>

      <div className={styles.cardlist}>
        {displayedCountries &&
          displayedCountries.map((country) => (
            <Card
              ID={country.ID}
              key={country.ID}
              name={country.name}
              flagImage={country.flagImage}
              continent={country.continent}
            />
          ))}

        {!countryFound ? (
          <div className={styles.errorContainer}>
            <img
              className={styles.errorImage}
              src={error404}
              alt="Error 404 country not found"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cards;
