import { useState, useEffect } from "react";
import { validations } from "../../helpers/validations";
import { useDispatch, useSelector } from "react-redux";
import { addActivity } from "../../redux/actions/index";
import { Link } from "react-router-dom";

import activityCreatedImg from "../../assets/activity-created.png";
import styles from "./Form.module.css";

const Form = () => {
  const initialErrors = {
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  };

  const [errors, setErrors] = useState(initialErrors);

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const [countryList, setCountryList] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "countries") {
      const selectedCountry = countryList.find(
        (country) => country.name === value
      );
      if (selectedCountry && !input.countries.includes(selectedCountry.id)) {
        setInput({
          ...input,
          countries: [...input.countries, selectedCountry.id],
        });
      }
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }

    const validationErrors = validations({ ...input, [name]: value });
    setErrors({
      ...errors,
      [name]: validationErrors[name],
    });
  };

  const dispatch = useDispatch();
  const { allCountries } = useSelector((state) => state);

  useEffect(() => {
    const countriesWithIds = allCountries.map((country) => ({
      id: country.ID,
      name: country.name,
    }));

    countriesWithIds.sort((a, b) => a.name.localeCompare(b.name));

    setCountryList(countriesWithIds);
  }, [allCountries]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      Object.values(errors).every((error) => !error) &&
      Object.values(input).every(Boolean)
    ) {
      try {
        dispatch(addActivity(input));
        setInput({
          name: "",
          difficulty: "",
          duration: "",
          season: "",
          countries: [],
        });
        setSuccessMessage("Activity created successfully");
        setErrorMessage("");
      } catch (error) {
        setSuccessMessage("");
        setErrorMessage("Error creating activity");
        console.error(error.errorMessage);
      }
    }
  };

  const resetForm = () => {
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    setErrors(initialErrors);
    setSuccessMessage("");
    setErrorMessage("");
  };

  function disableHandler() {
    return (
      Object.values(errors).some(Boolean) ||
      !Object.values(input).every(Boolean) ||
      !!successMessage
    );
  }

  const removeCountry = (index) => {
    const updatedCountries = [...input.countries];
    updatedCountries.splice(index, 1);
    setInput({ ...input, countries: updatedCountries });
  };

  return (
    <div className={styles.formContainer}>
      <div>
        <Link to="/home" className={styles.closeBtn}>
          <button>&times;</button>
        </Link>
      </div>

      <div className={styles.formSection}>
        <form onSubmit={submitHandler}>
          <div className={styles.formTitleContainer}>
            <h1 className={styles.formTitle}>Create an activity</h1>
          </div>
          <div>
            <label className={styles.formLabel} htmlFor="name">
              Activity Name
            </label>
            <input
              autoComplete="off"
              className={styles.formInput}
              name="name"
              placeholder="Please enter the name of the activity e.g: Trekking"
              value={input.name}
              onChange={handleChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.difficultyContainer}>
            <label className={styles.formLabel} htmlFor="difficulty">
              Difficulty
            </label>
            <div className={`${styles.gradientRange} ${styles.formInput}`}>
              <input
                autoComplete="off"
                name="difficulty"
                type="range"
                min="1"
                max="5"
                step="1"
                value={input.difficulty}
                onChange={handleChange}
              />
            </div>
            <p className={styles.difficultyValue}>{input.difficulty}</p>
            {errors.difficulty && (
              <p className={styles.error}>{errors.difficulty}</p>
            )}
          </div>

          <div>
            <label className={styles.formLabel} htmlFor="duration">
              Duration (hs)
            </label>
            <input
              autoComplete="off"
              className={styles.formInput}
              name="duration"
              type="text"
              pattern="[0-9]{2}:[0-9]{2}"
              placeholder="Please enter a valid duration in the format HH:mm e.g: 03:30"
              max="24"
              value={input.duration}
              onChange={handleChange}
            />
            {errors.duration && (
              <p className={styles.error}>{errors.duration}</p>
            )}
          </div>

          <div>
            <label className={styles.formLabel} htmlFor="season">
              Season
            </label>
            <select
              className={styles.select}
              autoComplete="off"
              name="season"
              value={input.season}
              onChange={handleChange}
            >
              <option value="choose">Choose...</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="autumn">Autumn</option>
              <option value="spring">Spring</option>
            </select>
            {errors.season && <p className={styles.error}>{errors.season}</p>}
          </div>

          <div>
            <label className={styles.formLabel} htmlFor="countries">
              Select country
            </label>
            <select
              className={styles.countriesList}
              name="countries"
              multiple
              value={input.countries.map(
                (id) => countryList.find((country) => country.id === id).name
              )}
              onChange={handleChange}
            >
              {countryList.map((country) => (
                <option value={country.name} key={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.countries && (
              <p className={styles.error}>{errors.countries}</p>
            )}
          </div>

          <button
            disabled={disableHandler()}
            className={styles.createBtn}
            type="submit"
          >
            Create
          </button>
          <button type="button" onClick={resetForm} className={styles.cleanBtn}>
            Reset Form
          </button>
        </form>
      </div>
      <div className={styles.selectedCountries}>
        <h2>Selected Countries</h2>
        <ul>
          {input.countries.map((id, index) => (
            <li key={index}>
              {countryList.find((country) => country.id === id).name}
              <button
                onClick={() => removeCountry(index)}
                className={styles.liBtn}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        {successMessage && (
          <img src={activityCreatedImg} alt="activity created successfully" />
        )}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Form;
