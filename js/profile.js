document.addEventListener("DOMContentLoaded", initializeProfilePage);

// Starts the Profile page after the DOM is ready.
// Expects storage.js to expose window.appStorage when available.
// Loads the logged-in user's profile from the database.
async function initializeProfilePage() {
  const currentUser = getCurrentProfileUser();

  if (!currentUser) {
    renderGuestProfileState();
    return;
  }

  try {
    const user = await fetchUserProfile(currentUser.userId);
    updateStoredCurrentUser(user);
    renderProfileForms(user);
  } catch (error) {
    renderProfileErrorState();
  }
}

// Gets the current user from appStorage or localStorage.
// Expects currentUser to include isLoggedIn and userId.
// Returns the current user object or null.
function getCurrentProfileUser() {
  const currentUser = window.appStorage && window.appStorage.getCurrentUser
    ? window.appStorage.getCurrentUser()
    : getCurrentUserFromLocalStorage();

  if (!currentUser || !currentUser.isLoggedIn || !Number.isInteger(Number(currentUser.userId))) {
    return null;
  }

  return currentUser;
}

// Reads currentUser directly if the storage helper is not available.
// Expects localStorage.currentUser to contain JSON.
// Returns the parsed user object or null.
function getCurrentUserFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch (error) {
    return null;
  }
}

// Loads one user profile from the Express API.
// Expects a numeric user id.
// Returns the user object from the database.
async function fetchUserProfile(userId) {
  const response = await fetch("/api/users/" + encodeURIComponent(userId));
  const data = await response.json().catch(function () {
    return {};
  });

  if (!response.ok || data.success === false || !data.user) {
    throw new Error(data.message || "Profile request failed.");
  }

  return data.user;
}

// Renders the guest message for visitors who are not logged in.
// Expects #profile-content to exist on profile.html.
// Shows login and signup actions without changing storage.
function renderGuestProfileState() {
  const content = document.getElementById("profile-content");

  if (!content) {
    return;
  }

  content.innerHTML =
    '<div class="empty-state large-empty-state profile-guest-state">' +
      '<p class="section-label">Profile</p>' +
      '<h2>Log in or sign up to edit your profile.</h2>' +
      '<div class="modal-actions">' +
        '<a class="btn btn-primary" href="/pages/login.html">Log In</a>' +
        '<a class="btn btn-secondary" href="/pages/signup.html">Sign Up</a>' +
      '</div>' +
    '</div>';
}

// Renders an error message if the profile cannot be loaded.
// Expects #profile-content to exist on profile.html.
// Lets the user retry without leaving the page.
function renderProfileErrorState() {
  const content = document.getElementById("profile-content");

  if (!content) {
    return;
  }

  content.innerHTML =
    '<div class="empty-state large-empty-state profile-guest-state">' +
      '<p class="section-label">Profile</p>' +
      '<h2>Profile could not be loaded.</h2>' +
      '<p>Please try again.</p>' +
      '<button class="btn btn-primary" id="retry-profile-button" type="button">Try Again</button>' +
    '</div>';

  const retryButton = document.getElementById("retry-profile-button");

  if (retryButton) {
    retryButton.addEventListener("click", initializeProfilePage);
  }
}

// Renders the editable profile and password forms for a logged-in user.
// Expects a user object returned by the database API.
// Creates form controls and wires submit events.
function renderProfileForms(user) {
  const content = document.getElementById("profile-content");

  if (!content || !user) {
    renderGuestProfileState();
    return;
  }

  content.innerHTML =
    '<form class="form profile-card" id="profile-form" action="/api/users/' + encodeURIComponent(user.userId) + '/profile" method="POST" novalidate>' +
      '<div class="profile-card-heading">' +
        '<p class="section-label">Account details</p>' +
        '<h2>Edit Profile</h2>' +
        '<p>Update your demo profile details.</p>' +
      '</div>' +
      '<div class="form-group">' +
        '<label for="profile-first-name">First name</label>' +
        '<input type="text" id="profile-first-name" name="firstName" value="' + escapeHtml(user.firstName || "") + '" aria-describedby="profile-first-name-error">' +
        '<p class="field-error" id="profile-first-name-error" aria-live="polite"></p>' +
      '</div>' +
      '<div class="form-group">' +
        '<label for="profile-last-name">Last name</label>' +
        '<input type="text" id="profile-last-name" name="lastName" value="' + escapeHtml(user.lastName || "") + '" aria-describedby="profile-last-name-error">' +
        '<p class="field-error" id="profile-last-name-error" aria-live="polite"></p>' +
      '</div>' +
      '<div class="form-group">' +
        '<label for="profile-email">Email</label>' +
        '<input type="email" id="profile-email" name="email" value="' + escapeHtml(user.email || "") + '" aria-describedby="profile-email-error">' +
        '<p class="field-error" id="profile-email-error" aria-live="polite"></p>' +
      '</div>' +
      '<div class="form-message" id="profile-form-message" aria-live="polite"></div>' +
      '<button class="btn btn-primary full-width" type="submit">Save Profile</button>' +
    '</form>' +
    '<form class="form profile-card" id="password-form" action="/api/users/' + encodeURIComponent(user.userId) + '/password" method="POST" novalidate>' +
      '<div class="profile-card-heading">' +
        '<p class="section-label">Password</p>' +
        '<h2>Change Password</h2>' +
        '<p>Update your account password.</p>' +
      '</div>' +
      '<div class="form-group">' +
        '<label for="current-password">Current password</label>' +
        '<input type="password" id="current-password" name="currentPassword" autocomplete="current-password" aria-describedby="current-password-error">' +
        '<p class="field-error" id="current-password-error" aria-live="polite"></p>' +
      '</div>' +
      '<div class="form-group">' +
        '<label for="new-password">New password</label>' +
        '<input type="password" id="new-password" name="newPassword" autocomplete="new-password" aria-describedby="new-password-error">' +
        '<p class="field-error" id="new-password-error" aria-live="polite"></p>' +
      '</div>' +
      '<div class="form-message" id="password-form-message" aria-live="polite"></div>' +
      '<button class="btn btn-secondary full-width" type="submit">Change Password</button>' +
    '</form>';

  document.getElementById("profile-form").addEventListener("submit", handleProfileSubmit);
  document.getElementById("password-form").addEventListener("submit", handlePasswordSubmit);
}

// Handles profile form submission.
// Expects a submit event from #profile-form.
// Validates fields, updates the database, and syncs currentUser.
async function handleProfileSubmit(event) {
  event.preventDefault();

  const currentUser = getCurrentProfileUser();

  if (!currentUser) {
    renderGuestProfileState();
    return;
  }

  const validationResult = validateProfileForm();

  if (!validationResult.isValid) {
    showFormMessage("profile-form-message", "Please fix the highlighted fields.", "error");
    return;
  }

  try {
    const response = await fetch("/api/users/" + encodeURIComponent(currentUser.userId) + "/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: validationResult.firstName,
        lastName: validationResult.lastName,
        email: validationResult.email
      })
    });
    const data = await response.json().catch(function () {
      return {};
    });

    if (!response.ok || data.success === false) {
      showFormMessage("profile-form-message", data.message || "Profile could not be updated.", "error");
      return;
    }

    updateStoredCurrentUser(data.user);
    showFormMessage("profile-form-message", data.message || "Profile updated successfully.", "success");
    refreshNavigationGreeting(data.user.firstName);
  } catch (error) {
    showFormMessage("profile-form-message", "Profile could not be updated. Please try again.", "error");
  }
}

// Handles password form submission.
// Expects a submit event from #password-form.
// Sends the password change request to the database API.
async function handlePasswordSubmit(event) {
  event.preventDefault();

  const currentUser = getCurrentProfileUser();

  if (!currentUser) {
    renderGuestProfileState();
    return;
  }

  const validationResult = validatePasswordForm();

  if (!validationResult.isValid) {
    showFormMessage("password-form-message", "Please fix the highlighted fields.", "error");
    return;
  }

  try {
    const response = await fetch("/api/users/" + encodeURIComponent(currentUser.userId) + "/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        currentPassword: validationResult.currentPassword,
        newPassword: validationResult.newPassword
      })
    });
    const data = await response.json().catch(function () {
      return {};
    });

    if (!response.ok || data.success === false) {
      showFormMessage("password-form-message", data.message || "Password could not be updated.", "error");
      return;
    }

    event.target.reset();
    showFormMessage("password-form-message", data.message || "Password updated successfully.", "success");
  } catch (error) {
    showFormMessage("password-form-message", "Password could not be updated. Please try again.", "error");
  }
}

// Validates the profile form fields.
// Expects first name, last name, and email fields to exist.
// Returns cleaned values and an isValid flag.
function validateProfileForm() {
  clearProfileFieldError("profile-first-name");
  clearProfileFieldError("profile-last-name");
  clearProfileFieldError("profile-email");

  const firstName = getFieldValue("profile-first-name");
  const lastName = getFieldValue("profile-last-name");
  const email = getFieldValue("profile-email");
  let isValid = true;

  if (firstName === "") {
    showProfileFieldError("profile-first-name", "First name is required.");
    isValid = false;
  }

  if (lastName === "") {
    showProfileFieldError("profile-last-name", "Last name is required.");
    isValid = false;
  }

  if (email === "") {
    showProfileFieldError("profile-email", "Email is required.");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showProfileFieldError("profile-email", "Enter a valid email address.");
    isValid = false;
  }

  return {
    isValid: isValid,
    firstName: firstName,
    lastName: lastName,
    email: email
  };
}

// Validates the password form fields.
// Expects current and new password fields to exist.
// Returns cleaned values and an isValid flag.
function validatePasswordForm() {
  clearProfileFieldError("current-password");
  clearProfileFieldError("new-password");

  const currentPassword = getFieldValue("current-password");
  const newPassword = getFieldValue("new-password");
  let isValid = true;

  if (currentPassword === "") {
    showProfileFieldError("current-password", "Current password is required.");
    isValid = false;
  }

  if (newPassword === "") {
    showProfileFieldError("new-password", "New password is required.");
    isValid = false;
  } else if (newPassword.length < 6) {
    showProfileFieldError("new-password", "New password must be at least 6 characters.");
    isValid = false;
  }

  return {
    isValid: isValid,
    currentPassword: currentPassword,
    newPassword: newPassword
  };
}

// Reads and trims an input value by id.
// Expects an input id.
// Returns an empty string when the field is missing.
function getFieldValue(fieldId) {
  const field = document.getElementById(fieldId);
  return field ? field.value.trim() : "";
}

// Checks whether an email value uses a simple valid email format.
// Expects a string from the email input.
// Returns true when the format is acceptable.
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Stores the updated current user in the existing localStorage shape.
// Expects a user object returned by the API.
// Keeps isLoggedIn, userId, firstName, lastName, and email.
function updateStoredCurrentUser(user) {
  if (!user) {
    return;
  }

  const updatedUser = {
    isLoggedIn: true,
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };

  if (window.appStorage && window.appStorage.setCurrentUser) {
    window.appStorage.setCurrentUser(updatedUser);
  } else {
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  }
}

// Shows a field-level profile validation error.
// Expects a field id and message.
// Adds invalid styling and writes the matching error text.
function showProfileFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + "-error");

  if (field) {
    field.classList.add("invalid-field");
    field.setAttribute("aria-invalid", "true");
  }

  if (error) {
    error.textContent = message;
  }
}

// Clears a field-level profile validation error.
// Expects a field id.
// Removes invalid styling and visible error text.
function clearProfileFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + "-error");

  if (field) {
    field.classList.remove("invalid-field");
    field.removeAttribute("aria-invalid");
  }

  if (error) {
    error.textContent = "";
  }
}

// Shows a form message.
// Expects a message element id, text, and type.
// Updates the shared form-message element.
function showFormMessage(messageId, message, type) {
  const messageElement = document.getElementById(messageId);

  if (!messageElement) {
    return;
  }

  messageElement.textContent = message;
  messageElement.className = "form-message form-message--" + type;
}

// Updates the header greeting after a profile save.
// Expects the new first name.
// Uses main.js when available, otherwise updates the greeting text directly.
function refreshNavigationGreeting(firstName) {
  if (window.updateNavigationForLoginState) {
    window.updateNavigationForLoginState();
    return;
  }

  const greeting = document.querySelector(".nav-greeting");

  if (greeting) {
    greeting.textContent = "Hi, " + firstName;
  }
}

// Escapes profile values before inserting them into generated markup.
// Expects any value that will be used inside HTML.
// Returns an HTML-safe string.
function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
