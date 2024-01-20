import {
  GET_COUNTRIES,
  GET_BY_NAME,
  GET_BY_ID,
  CREATE_ACTIVITY,
  FILTER_BY_CONTINENT,
  CLEAR_FILTERS,
  SORT,
  GET_ACTIVITIES,
  SET_CURRENT_PAGE,
  CLEAN_DETAIL,
  DELETE_ACTIVITY,
  GET_LANGUAGES,
  FILTER_BY_LANGUAGE,
  FILTER_BY_ACTIVITY,
} from "../actions";

let initialState = {
  allCountries: [],
  orginalCountries: [],
  allCountriesDetail: {},
  activities: [],
  countryFound: null,
  currentPage: 1,
  languages: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES: {
      return {
        ...state,
        allCountries: action.payload,
        originalCountries: action.payload,
      };
    }

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case GET_BY_NAME: {
      const newCountryFound = action.payload.length > 0;
      return {
        ...state,
        allCountries: action.payload,
        countryFound: newCountryFound,
      };
    }
    case GET_BY_ID:
      return {
        ...state,
        allCountriesDetail: action.payload[0],
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        allCountriesDetail: {},
      };

    case CREATE_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };

    case DELETE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload
        ),
      };
    case GET_LANGUAGES:
      return {
        ...state,
        languages: action.payload,
      };

    case FILTER_BY_CONTINENT: {
      if (action.payload === "") {
        return {
          ...state,
          allCountries: state.originalCountries,
        };
      }

      const filteredCountries = state.originalCountries.filter(
        (country) => country.continent === action.payload
      );

      return {
        ...state,
        allCountries: filteredCountries,
      };
    }

    case FILTER_BY_LANGUAGE: {
      if (action.payload === "") {
        return {
          ...state,
          allCountries: state.originalCountries,
        };
      } else {
        return {
          ...state,
          allCountries: state.allCountries.filter((country) => {
            const languages = country.languages;
            if (
              languages &&
              typeof languages === "object" &&
              !Array.isArray(languages)
            ) {
              const languagesArray = Object.values(languages);
              return languagesArray.includes(action.payload);
            } else if (Array.isArray(languages)) {
              return languages.includes(action.payload);
            }
            return false;
          }),
        };
      }
    }

    case FILTER_BY_ACTIVITY: {
      const filteredActivities = state.allCountries.filter((country) =>
        country.Activities.find((activity) => activity.name === action.payload)
      );
      return {
        ...state,
        allCountries: filteredActivities,
      };
    }

    case SORT: {
      if (action.payload === "") {
        return {
          ...state,
          allCountries: state.originalCountries,
        };
      }

      const sortedCountries = [...state.allCountries];
      const { order, field } = action.payload;
      if (field === "name") {
        if (order === "Asc") {
          sortedCountries.sort((a, b) => (a.name > b.name ? 1 : -1));
        } else {
          sortedCountries.sort((a, b) => (b.name > a.name ? 1 : -1));
        }
      } else if (field === "population") {
        if (order === "Asc") {
          sortedCountries.sort((a, b) => a.population - b.population);
        } else {
          sortedCountries.sort((a, b) => b.population - a.population);
        }
      }
      return {
        ...state,
        allCountries: sortedCountries,
      };
    }

    case CLEAR_FILTERS:
      return {
        ...state,
        allCountries: state.originalCountries,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
