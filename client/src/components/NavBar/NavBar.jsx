/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import linkedInIcon from "../../assets/icons8-linkedin-50.png";
import githubIcon from "../../assets/icons8-github-60.png";
import styles from "./NavBar.module.css";

const Navbar = ({ handleChange }) => {
  return (
    <div className={styles.navContainer}>
      <Link to="/" className={styles.Link}>
        <h2>Countries App</h2>
      </Link>
      <form className={styles.searchForm}>
        <input
          placeholder="Search for a country"
          type="search"
          onChange={handleChange}
          className={styles.searchInput}
        />
      </form>
      <div className={styles.linksContainer}>
        <a
          href="https://github.com/jOsterrielt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubIcon} alt="gitHub" className={styles.iconsImg} />
        </a>
        <a
          href="https://www.linkedin.com/in/jorge-osterrielt/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedInIcon} alt="linkedIn" className={styles.iconsImg} />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
