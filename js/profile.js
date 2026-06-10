document.addEventListener("DOMContentLoaded", initializeProfilePage);

// Starts the Profile page after the DOM is ready.
// Expects storage.js to expose window.appStorage.
// Renders either the guest state or the editable profile form.
function initializeProfilePage() {
  if (!window.appStorage || !window.appStorage.isUserLoggedIn()) {
    renderGuestProfileState();
    return;
  }

  renderProfileForm();
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
        '<a class="btn btn-primary" href="login.html">Log In</a>' +
        '<a class="btn btn-secondary" href="signup.html">Sign Up</a>' +
      '</div>' +
    '</div>';
}

// Renders the editable profile form for a logged-in demo user.
// Expects currentUser to contain firstName and email.
// Creates form controls and wires the submit event.
function renderProfileForm() {
  const content = document.getElementById("profile-content");
  const currentUser = window.appStorage.getCurrentUser();

  if (!content || !currentUser) {
    renderGuestProfileState();
    return;
  }

  content.innerHTML =
    '<form class="form profile-card" id="profile-form" action="#" method="post" novalidate>' +
      '<div class="profile-card-heading">' +
        '<p class="section-label">Account details</p>' +
        '<h2>Edit Profile</h2>' +
        '<p>Update your demo profile details.</p>' +
      '</div>' +
      '<div class="form-group">' +
        '<label for="profile-first-name">First name</label>' +
        '<input type="text" id="profile-first-name" name="firstName" value="' + escapeHtml(currentUser.firstName || "") + '" aria-describedby="profile-first-name-error">' +
        '<p class="field-error" id="profile-first-name-error" aria-live="polite"></p>' +
      '</div>' +
      '<div class="form-group">' +
        '<label for="profile-email">Email</label>' +
        '<input type="email" id="profile-email" name="email" value="' + escapeHtml(currentUser.email || "") + '" aria-describedby="profile-email-error">' +
        '<p class="field-error" id="profile-email-error" aria-live="polite"></p>' +
      '</div>' +
      '<div class="form-message" id="profile-form-message" aria-live="polite"></div>' +
      '<button class="btn btn-primary full-width" type="submit">Save Profile</button>' +
    '</form>';

  document.getElementById("profile-form").addEventListener("submit", handleProfileSubmit);
}

// Handles profile form submission.
// Expects a submit event from #profile-form.
// Validates the fields, updates currentUser in localStorage, and shows feedback.
function handleProfileSubmit(event) {
  event.preventDefault();

  const validationResult = validateProfileForm();

  if (!validationResult.isValid) {
    showProfileMessage("Please fix the highlighted fields.", "error");
    return;
  }

  window.appStorage.setCurrentUser({
    isLoggedIn: true,
    firstName: validationResult.firstName,
    email: validationResult.email
  });

  showProfileMessage("Profile updated successfully.", "success");
  refreshNavigationGreeting(validationResult.firstName);
}

// Validates the profile form fields.
// Expects #profile-first-name and #profile-email to exist.
// Returns cleaned values and an isValid flag.
function validateProfileForm() {
  clearProfileFieldError("profile-first-name");
  clearProfileFieldError("profile-email");

  const firstNameField = document.getElementById("profile-first-name");
  const emailField = document.getElementById("profile-email");
  const firstName = firstNameField ? firstNameField.value.trim() : "";
  const email = emailField ? emailField.value.trim() : "";
  let isValid = true;

  if (firstName === "") {
    showProfileFieldError("profile-first-name", "First name is required.");
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
    email: email
  };
}

// Checks whether an email value uses a simple valid email format.
// Expects a string from the email input.
// Returns true when the format is acceptable.
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
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

// Shows a profile form message.
// Expects message text and a type such as success or error.
// Updates the shared form-message element.
function showProfileMessage(message, type) {
  const messageElement = document.getElementById("profile-form-message");

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
