/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "./Filters.module.css";
import {
  filterByContinent,
  filterByLanguage,
  reset,
  sort,
  filterByActivity,
} from "../../redux/actions";

const Filters = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const languages = useSelector((state) =>
    state.languages.flatMap((language) => Object.values(language))
  );

  function filterByContinentHandler(event) {
    dispatch(filterByContinent(event.target.value));
  }

  const uniqueLanguages = new Set(languages);
  const languagesList = Array.from(uniqueLanguages);

  function filterByLanguageHandler(event) {
    dispatch(filterByLanguage(event.target.value));
  }

  const uniqueActivities = new Set(activities.map((activity) => activity.name));

  const activityList = Array.from(uniqueActivities);

  function filterByActivityHandler(event) {
    dispatch(filterByActivity(event.target.value));
  }

  function sortHandler(event) {
    const selectedOption = event.target.value;
    if (selectedOption === "nameAsc") {
      dispatch(sort("Asc", "name"));
    } else if (selectedOption === "nameDesc") {
      dispatch(sort("Desc", "name"));
    } else if (selectedOption === "populationAsc") {
      dispatch(sort("Asc", "population"));
    } else if (selectedOption === "populationDesc") {
      dispatch(sort("Desc", "population"));
    }
  }

  function resetHandler() {
    dispatch(reset());
    setCurrentPage(1);
  }

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.sortFilter}>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" onChange={sortHandler} className={styles.selectBox}>
          <option value="">Choose...</option>
          <option value="nameAsc">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
          <option value="populationAsc">Population (Low to High)</option>
          <option value="populationDesc">Population (High to Low)</option>
        </select>
      </div>

      <div className={styles.continentFilter}>
        <label htmlFor="continent">Filter by Continent:</label>
        <select
          id="continent"
          onChange={filterByContinentHandler}
          className={styles.selectBox}
          defaultValue=""
        >
          <option value="">Choose...</option>
          {[
            "Africa",
            "Europe",
            "Oceania",
            "Asia",
            "South America",
            "North America",
            "Antarctica",
          ].map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.languagesFilter}>
        <label htmlFor="language">Filter by language:</label>
        <select
          id="language"
          onChange={filterByLanguageHandler}
          className={styles.selectBox}
          defaultValue=""
        >
          <option value="">Choose...</option>
          {languagesList.map((language, index) => (
            <option key={`language_${index}`} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.activityFilter}>
        <label htmlFor="activity">Filter by Activity:</label>
        <select
          id="activity"
          onChange={filterByActivityHandler}
          className={styles.selectBox}
          defaultValue=""
        >
          <option value="">Choose...</option>
          {activityList.map((activity) => (
            <option key={activity} value={activity}>
              {activity}
            </option>
          ))}
        </select>
      </div>
      <button className={styles.resetButton} onClick={resetHandler}>
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
