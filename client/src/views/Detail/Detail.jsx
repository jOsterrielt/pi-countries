import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getCountriesByID,
  cleanDetail,
  setCurrentPage,
  deleteActivity,
} from "../../redux/actions";

import styles from "./detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const allCountriesDetail = useSelector((state) => state.allCountriesDetail);
  const { id } = useParams();
  const currentPage = useSelector((state) => state.currentPage);
  const navigate = useNavigate();
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    dispatch(getCountriesByID(id));
    return () => dispatch(cleanDetail());
  }, [dispatch, id, reRender]);

  const renderLanguages = (languages) => {
    if (!languages) return "No languages";

    return Object.keys(languages).map((key, index, array) => (
      <span key={index}>
        {`${languages[key]}`}
        {index < array.length - 1 && ", "}
      </span>
    ));
  };

  const handleDeleteActivity = (activityId) => {
    dispatch(deleteActivity(activityId));
    setReRender((prev) => !prev);
  };

  const handleCloseButton = () => {
    dispatch(setCurrentPage(currentPage));
    navigate("/home");
  };
  return (
    <div className={styles.detailContainer}>
      <div className={styles.imageContainer}>
        {allCountriesDetail?.flagImage && (
          <img
            className={styles.flag}
            src={allCountriesDetail.flagImage}
            alt={allCountriesDetail.name}
          />
        )}
        {allCountriesDetail?.coatOfArms ? (
          <img
            className={styles.coatOfArms}
            src={allCountriesDetail.coatOfArms}
            alt={allCountriesDetail.name}
          />
        ) : null}
      </div>

      <div className={styles.contentContainer}>
        <>
          <button onClick={handleCloseButton} className={styles.closeBtn}>
            &times;
          </button>
        </>

        <div className={styles.content}>
          <h1>{allCountriesDetail?.name}</h1>
          <h2>Abbreviation: {allCountriesDetail?.ID}</h2>
          <h2>Continet: {allCountriesDetail?.continent}</h2>
          <h2>Subregion: {allCountriesDetail?.subregion}</h2>
          <h2>Capital: {allCountriesDetail?.capital}</h2>
          <h2>
            Borders:{" "}
            {Array.isArray(allCountriesDetail.borders)
              ? allCountriesDetail.borders.join(", ")
              : "No borders"}
          </h2>
          <h2>Area: {allCountriesDetail?.area} KM2 </h2>
          <h2>Population: {allCountriesDetail?.population}</h2>
          <h2>Languages: {renderLanguages(allCountriesDetail?.languages)}</h2>
          {allCountriesDetail.googleMaps && (
            <>
              <p>Click on the following link to view the map:</p>
              <a
                href={allCountriesDetail.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Google Maps
              </a>
            </>
          )}
        </div>
        <h2>Activities</h2>
        <ul className={styles.list}>
          {allCountriesDetail?.Activities?.map((activity) => (
            <li key={activity.id}>
              <strong>{activity.name}</strong> <br />
              Difficulty: {activity.difficulty}
              <br /> Duration: {activity.duration}hs
              <br />
              Season: {activity.season}
              <button onClick={() => handleDeleteActivity(activity.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <Link to="/form">
          <button>Create activity</button>
        </Link>
      </div>
    </div>
  );
};

export default Detail;
