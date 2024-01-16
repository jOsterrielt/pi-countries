/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const [inputPage, setInputPage] = useState(currentPage);

  const next = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
      setInputPage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setInputPage(currentPage - 1);
    }
  };

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleGoToPage = () => {
    const newPage = parseInt(inputPage, 10);

    if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={styles.pagContainer}>
      <button onClick={prev}>Prev</button>
      <span>
        <strong>
          Page{" "}
          <input
            className={styles.input}
            type="number"
            min="1"
            max="25"
            value={inputPage}
            onChange={handleInputChange}
          />{" "}
          of {totalPages}
        </strong>
      </span>
      <button onClick={handleGoToPage}>Go to</button>
      <button onClick={next}>Next</button>
    </div>
  );
};

export default Pagination;
