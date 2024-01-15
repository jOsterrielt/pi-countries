import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getCountriesByName,
  getActivities,
  setCurrentPage,
} from "../../redux/actions";

import Navbar from "../../components/NavBar/NavBar.jsx";
import Cards from "../../components/Cards/Cards.jsx";
import Pagination from "../../components/Pagination/Pagination";

const Home = () => {
  const { allCountries, currentPage } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    dispatch(getCountriesByName(newSearchTerm));
    dispatch(setCurrentPage(1));
  };

  /* const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getCountriesByName(searchTerm));
    dispatch(setCurrentPage(1));
  }; */

  const itemsPerPage = 10;
  const totalPages = Math.ceil(allCountries.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedCountries = allCountries
    .filter((country) =>
      country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    .slice(startIndex, endIndex);

  return (
    <div>
      <Navbar handleChange={handleChange} /* handleSubmit={handleSubmit} */ />
      <Cards
        displayedCountries={displayedCountries}
        setCurrentPage={setCurrentPage}
      />
      <Pagination
        setCurrentPage={(newPage) => dispatch(setCurrentPage(newPage))}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};
export default Home;
