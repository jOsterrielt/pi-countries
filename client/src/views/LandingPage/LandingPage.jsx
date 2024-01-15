import { Link } from "react-router-dom";

import styles from "./LandingPage.module.css";
import background from "../../assets/countries.png";

const LandingPage = () => {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.content}>
        <h1>Countries App</h1>
        <h2>Explore countries around the world</h2>
        <Link to="/home">
          <button className={styles.btn}>Get Started</button>
        </Link>
      </div>
      <div className={styles.imgContainer}>
        <img src={background} alt="World Image" />
      </div>
    </div>
  );
};

export default LandingPage;
