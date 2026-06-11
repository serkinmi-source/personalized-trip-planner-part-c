document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const preferencesForm = document.getElementById("preferences-form");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }

  if (signupForm) {
    signupForm.addEventListener("submit", handleSignupSubmit);
  }

  if (preferencesForm) {
    prefillPreferencesForm();
    preferencesForm.addEventListener("submit", handlePreferencesSubmit);
  }
});

// Checks whether an email value uses a simple valid email format.
// Expects a string from an email input.
// Returns true when the email format is acceptable.
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Shows an error message beside a specific form field.
// Expects the field id and the message text to display.
// Updates the field styling, aria-invalid state, and matching error container.
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + "-error");

  if (field) {
    field.classList.add("invalid-field");
    field.setAttribute("aria-invalid", "true");
  }

  if (errorElement) {
    errorElement.textContent = message;
  }
}

// Clears the error message beside a specific form field.
// Expects the field id whose error should be cleared.
// Removes invalid styling and empties the matching error container.
function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + "-error");

  if (field) {
    field.classList.remove("invalid-field");
    field.removeAttribute("aria-invalid");
  }

  if (errorElement) {
    errorElement.textContent = "";
  }
}

// Shows a general message at the top of a form action area.
// Expects a message container id, text, and type such as success or error.
// Updates the visible form-level feedback message.
function showFormMessage(messageId, message, type) {
  const messageElement = document.getElementById(messageId);

  if (!messageElement) {
    return;
  }

  messageElement.textContent = message;
  messageElement.className = "form-message form-message--" + type;
}

// Clears the general message for a form.
// Expects the message container id to clear.
// Removes visible text and success/error styling.
function clearFormMessage(messageId) {
  const messageElement = document.getElementById(messageId);

  if (!messageElement) {
    return;
  }

  messageElement.textContent = "";
  messageElement.className = "form-message";
}

// Reads and trims a form field value.
// Expects the id of an input or select element.
// Returns an empty string when the field does not exist.
function getFieldValue(fieldId) {
  const field = document.getElementById(fieldId);
  return field ? field.value.trim() : "";
}

// Reads saved Plan a Trip values for the current browser session.
// Expects tripPreferences to contain valid JSON when it exists.
// Returns the saved preferences object or null.
function getSavedTripPreferences() {
  const storedPreferences = sessionStorage.getItem("tripPreferences");

  if (!storedPreferences) {
    return null;
  }

  try {
    return JSON.parse(storedPreferences);
  } catch (error) {
    return null;
  }
}

// Restores saved Plan a Trip values when the user returns to the form.
// Expects the preferences form fields to exist on preferences.html.
// Keeps interests optional and lets normal validation run on submit.
function prefillPreferencesForm() {
  const savedPreferences = getSavedTripPreferences();

  if (!savedPreferences) {
    return;
  }

  setFieldValue("trip-type", savedPreferences.tripType);
  setFieldValue("budget", savedPreferences.budget);
  setFieldValue("duration-days", savedPreferences.durationDays);
  setFieldValue("travelers", savedPreferences.travelers);
  restoreInterestSelections(savedPreferences.interests);

  const kosherField = document.getElementById("kosher-friendly");

  if (kosherField) {
    kosherField.checked = Boolean(savedPreferences.kosherFriendly);
  }
}

// Writes a saved value into a form field if both exist.
// Expects an input/select id and a saved value.
function setFieldValue(fieldId, value) {
  const field = document.getElementById(fieldId);

  if (field && value !== undefined && value !== null) {
    field.value = value;
  }
}

// Rechecks saved interest checkboxes without making interests required.
// Expects the saved interests array from sessionStorage.
function restoreInterestSelections(savedInterests) {
  const selectedInterests = Array.isArray(savedInterests) ? savedInterests.map(normalizeStoredValue) : [];
  const interestInputs = document.querySelectorAll('input[name="interests"]');

  interestInputs.forEach(function (interestInput) {
    interestInput.checked = selectedInterests.includes(normalizeStoredValue(interestInput.value));
  });
}

// Normalizes saved checkbox values before comparing them.
// Keeps prefill stable if capitalization changes in the markup.
function normalizeStoredValue(value) {
  return String(value || "").trim().toLowerCase();
}

// Handles login form submission.
// Expects a submit event from the login form.
// Prevents default submission and shows validation feedback.
function handleLoginSubmit(event) {
  event.preventDefault();

  const formMessageId = "login-form-message";
  clearFormMessage(formMessageId);
  clearFieldError("login-email");
  clearFieldError("login-password");

  const email = getFieldValue("login-email");
  const password = getFieldValue("login-password");
  let isValid = true;

  if (email === "") {
    showFieldError("login-email", "Email is required.");
    isValid = false;
  } else if (!validateEmail(email)) {
    showFieldError("login-email", "Enter a valid email address.");
    isValid = false;
  }

  if (password === "") {
    showFieldError("login-password", "Password is required.");
    isValid = false;
  }

  if (isValid) {
    if (window.appStorage) {
      window.appStorage.setCurrentUser({
        isLoggedIn: true,
        firstName: "Traveler",
        email: email
      });
    }

    showFormMessage(formMessageId, "Login successful. Redirecting to My Trips...", "success");

    setTimeout(function () {
      window.location.href = "my-trips.html";
    }, 900);
  } else {
    showFormMessage(formMessageId, "Please fix the highlighted fields.", "error");
  }
}

// Handles signup form submission.
// Expects a submit event from the signup form.
// Prevents default submission and shows validation feedback.
function handleSignupSubmit(event) {
  event.preventDefault();

  const formMessageId = "signup-form-message";
  clearFormMessage(formMessageId);

  const fieldIds = ["first-name", "last-name", "signup-email", "signup-password", "confirm-password"];
  fieldIds.forEach(clearFieldError);

  const firstName = getFieldValue("first-name");
  const lastName = getFieldValue("last-name");
  const email = getFieldValue("signup-email");
  const password = getFieldValue("signup-password");
  const confirmPassword = getFieldValue("confirm-password");
  let isValid = true;

  if (firstName === "") {
    showFieldError("first-name", "First name is required.");
    isValid = false;
  }

  if (lastName === "") {
    showFieldError("last-name", "Last name is required.");
    isValid = false;
  }

  if (email === "") {
    showFieldError("signup-email", "Email is required.");
    isValid = false;
  } else if (!validateEmail(email)) {
    showFieldError("signup-email", "Enter a valid email address.");
    isValid = false;
  }

  if (password === "") {
    showFieldError("signup-password", "Password is required.");
    isValid = false;
  } else if (password.length < 8) {
    showFieldError("signup-password", "Password must be at least 8 characters.");
    isValid = false;
  }

  if (confirmPassword === "") {
    showFieldError("confirm-password", "Confirm password is required.");
    isValid = false;
  } else if (confirmPassword !== password) {
    showFieldError("confirm-password", "Confirm password must match password.");
    isValid = false;
  }

  if (isValid) {
    if (window.appStorage) {
      window.appStorage.setCurrentUser({
        isLoggedIn: true,
        firstName: firstName,
        email: email
      });
    }

    showFormMessage(formMessageId, "Account created. Redirecting to Plan a Trip...", "success");

    setTimeout(function () {
      window.location.href = "preferences.html";
    }, 900);
  } else {
    showFormMessage(formMessageId, "Please fix the highlighted fields.", "error");
  }
}

// Handles trip preferences form submission.
// Expects a submit event from the preferences form.
// Prevents default submission, validates fields, and renders trip matches on the same page.
async function handlePreferencesSubmit(event) {
  event.preventDefault();

  const formMessageId = "preferences-form-message";
  clearFormMessage(formMessageId);

  const fieldIds = ["trip-type", "budget", "duration-days", "travelers"];
  fieldIds.forEach(clearFieldError);

  const tripType = getFieldValue("trip-type");
  const budget = getFieldValue("budget");
  const durationDays = getFieldValue("duration-days");
  const travelers = getFieldValue("travelers");
  const selectedInterests = document.querySelectorAll('input[name="interests"]:checked');
  let isValid = true;

  if (tripType === "") {
    showFieldError("trip-type", "Trip type is required.");
    isValid = false;
  }

  if (budget === "") {
    showFieldError("budget", "Budget is required.");
    isValid = false;
  } else if (Number(budget) < 500) {
    showFieldError("budget", "Budget must be at least $500.");
    isValid = false;
  }

  if (durationDays === "") {
    showFieldError("duration-days", "Duration is required.");
    isValid = false;
  } else if (!isPositiveInteger(durationDays)) {
    showFieldError("duration-days", "Duration must be a positive integer.");
    isValid = false;
  }

  if (travelers === "") {
    showFieldError("travelers", "Number of travelers is required.");
    isValid = false;
  } else if (!isPositiveInteger(travelers)) {
    showFieldError("travelers", "Number of travelers must be a positive integer.");
    isValid = false;
  }

  if (!isValid) {
    showFormMessage(formMessageId, "Please fix the highlighted fields.", "error");

    if (window.resetTripMatchesToEmptyState) {
      window.resetTripMatchesToEmptyState("Fill in the form and generate your matches.");
    }

    return;
  }

  const submitButton = event.target.querySelector('button[type="submit"]');
  const preferences = {
    tripType: tripType,
    budget: Number(budget),
    durationDays: Number(durationDays),
    travelers: Number(travelers),
    interests: Array.from(selectedInterests).map(function (interest) {
      return interest.value;
    }),
    kosherFriendly: Boolean(document.getElementById("kosher-friendly") && document.getElementById("kosher-friendly").checked)
  };

  sessionStorage.setItem("tripPreferences", JSON.stringify(preferences));
  showFormMessage(formMessageId, "Preferences saved. Trip matches are shown below.", "success");

  if (submitButton) {
    submitButton.textContent = "Generate Trip Matches";
    submitButton.disabled = true;
  }

  try {
    if (window.renderRecommendationsFromPreferences) {
      await window.renderRecommendationsFromPreferences(preferences, {
        isLastSearch: false,
        shouldScroll: true
      });
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
    }
  }
}

// Checks whether a value is a positive whole number.
// Expects a string or number from a numeric input.
// Returns true only for integers greater than zero.
function isPositiveInteger(value) {
  const numberValue = Number(value);
  return Number.isInteger(numberValue) && numberValue > 0;
}
