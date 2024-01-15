export function validations(input) {
  let errors = {};

  if (!input.name.trim()) {
    errors.name = "Name is required";
  } else if (/^\d/.test(input.name)) {
    errors.name = "The name can't start with numbers";
  } else if (input.name.length > 22 || input.name.length < 3) {
    errors.name = "The name must be between 3 and 22 characters";
  }

  if (input.duration > 24 || input.duration <= 0) {
    errors.duration = "Duration must be a number between 0,5 and 24";
  }

  if (isNaN(input.difficulty)) {
    errors.difficulty = "Must choose difficulty between 1 and 5";
  }

  if (!["summer", "winter", "autumn", "spring"].includes(input.season)) {
    errors.season = "Please choose a season.";
  }

  if (!input.countries || input.countries.length === 0) {
    errors.countries = "Select at least one country for the activity.";
  }
  return errors;
}
