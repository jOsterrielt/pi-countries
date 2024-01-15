import {
  GET_COUNTRIES,
  GET_BY_NAME,
  GET_BY_ID,
  CREATE_ACTIVITY,
  FILTER_BY_CONTINENT,
  RESET,
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
  allCountriesCopy: [],
  allCountriesDetail: {},
  activities: [],
  countryFound: null,
  currentPage: 1,
  languages: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES: {
      const flattenedLanguages = Array.from(
        new Set(
          action.payload.flatMap((country) =>
            country.languages ? Object.values(country.languages) : []
          )
        )
      );
      return {
        ...state,
        allCountries: action.payload,
        allCountriesCopy: action.payload,
        languages: flattenedLanguages,
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

    case FILTER_BY_LANGUAGE: {
      return {
        ...state,
        allCountries: state.allCountriesCopy.filter((country) => {
          const languages = country.languages;
          if (
            languages &&
            typeof languages === "object" &&
            !Array.isArray(languages)
          ) {
            // Si languages es un objeto, convertirlo a un array de valores
            const languagesArray = Object.values(languages);
            return languagesArray.includes(action.payload);
          } else if (Array.isArray(languages)) {
            // Si languages ya es un array, usarlo directamente
            return languages.includes(action.payload);
          }
          return false;
        }),
      };
    }

    case FILTER_BY_CONTINENT: {
      const filteredCountries = state.allCountriesCopy.filter(
        (country) => country.continent === action.payload
      );

      return {
        ...state,
        allCountries: filteredCountries,
      };
    }

    case FILTER_BY_ACTIVITY: {
      const filteredActivities = state.allCountriesCopy.filter((country) =>
        country.Activities.find((activity) => activity.name === action.payload)
      );
      return {
        ...state,
        allCountries: filteredActivities,
      };
    }

    case SORT: {
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

    case RESET:
      return {
        ...state,
        allCountries: state.allCountriesCopy,
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
