import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = " GET_BY_ID";
export const GET_LANGUAGES = "GET_LANGUAGES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const FILTER_BY_LANGUAGE = "FILTER_BY_LANGUAGE";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const SORT = "SORT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const CLEAR_FILTERS = "CLEAR_FILTERS";

export function getCountries() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/countries");
      const languages = Array.from(
        new Set(
          response.data
            .flatMap((country) => country.languages)
            .filter((language) => language !== null)
        )
      );
      dispatch({
        type: GET_COUNTRIES,
        payload: response.data,
      });
      dispatch({
        type: GET_LANGUAGES,
        payload: languages,
      });
    } catch (error) {
      console.error("Error getting countries:", error);
    }
  };
}

export function getActivities() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/activities");
      dispatch({
        type: GET_ACTIVITIES,
        payload: response.data,
      });
    } catch (error) {
      console.error("Couldn't get activities:", error);
    }
  };
}

export function getCountriesByName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/countries/name?name=${name}`);
      dispatch({
        type: GET_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching country:", error);
    }
  };
}

export function getCountriesByID(ID) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/countries/${ID}`);

      dispatch({
        type: GET_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error getting country:", error);
    }
  };
}

export function cleanDetail() {
  return { type: "CLEAN_DETAIL" };
}

export function addActivity(input) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/activities`, input);
      dispatch({
        type: CREATE_ACTIVITY,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };
}

export const deleteActivity = (activityId) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/activities/${activityId}`);

      dispatch({
        type: DELETE_ACTIVITY,
        payload: activityId,
      });
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };
};

export function filterByContinent(continent) {
  return {
    type: FILTER_BY_CONTINENT,
    payload: continent,
  };
}

export function filterByLanguage(language) {
  return {
    type: FILTER_BY_LANGUAGE,
    payload: language,
  };
}

export function filterByActivity(activity) {
  return {
    type: FILTER_BY_ACTIVITY,
    payload: activity,
  };
}

export function reset() {
  return {
    type: CLEAR_FILTERS,
  };
}

export function sort(order, field) {
  return {
    type: SORT,
    payload: { order, field },
  };
}

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});
