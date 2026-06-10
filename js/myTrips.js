document.addEventListener("DOMContentLoaded", function () {
  renderMyTripsPage();
});

let myTripsFeedbackMessage = "";

// Formats visible trip prices in dollars.
// Expects a numeric price value.
// Returns a dollar-formatted string such as $1,500.
function formatPrice(price) {
  return "$" + price.toLocaleString();
}

// Renders the My Trips page according to login state.
// Expects window.appStorage and window.tripPackages to be available.
// Shows guest, empty, or saved trip card states.
function renderMyTripsPage() {
  if (!window.appStorage || !Array.isArray(window.tripPackages)) {
    showGuestState();
    return;
  }

  if (!window.appStorage.isUserLoggedIn()) {
    showGuestState();
    return;
  }

  const savedTripRecords = window.appStorage.getSavedTripRecords();
  const savedTrips = savedTripRecords
    .map(function (savedTrip) {
      return window.tripPackages.find(function (trip) {
        return trip.id === savedTrip.id;
      });
    })
    .filter(Boolean);

  if (savedTrips.length === 0) {
    showEmptySavedTripsState();
    return;
  }

  renderSavedTripCards(savedTrips);
}

// Shows the guest state when no user is logged in.
// Expects no input.
// Gives links to log in, sign up, or start planning.
function showGuestState() {
  const content = document.getElementById("my-trips-content");

  if (!content) {
    return;
  }

  content.innerHTML =
    '<div class="empty-state large-empty-state">' +
      '<p class="section-label">Guest view</p>' +
      '<h2>Log in or sign up to view your saved trips.</h2>' +
      '<div class="modal-actions">' +
        '<a class="btn btn-primary" href="login.html">Log In</a>' +
        '<a class="btn btn-secondary" href="signup.html">Sign Up</a>' +
        '<a class="btn btn-secondary" href="preferences.html">Start Planning</a>' +
      '</div>' +
    '</div>';
}

// Shows the empty state for logged-in users with no saved trips.
// Expects no input.
// Encourages the user to start planning.
function showEmptySavedTripsState() {
  const content = document.getElementById("my-trips-content");

  if (!content) {
    return;
  }

  content.innerHTML =
    '<div class="empty-state large-empty-state">' +
      '<p class="section-label">Saved trips</p>' +
      '<h2>You have not saved any trips yet.</h2>' +
      renderMyTripsFeedback() +
      '<a class="btn btn-primary" href="preferences.html">Start Planning</a>' +
    '</div>';
}

// Renders saved trip cards for the logged-in user.
// Expects an array of trip objects.
// Displays each saved trip with actions to view details or remove it.
function renderSavedTripCards(savedTrips) {
  const content = document.getElementById("my-trips-content");

  if (!content) {
    return;
  }

  content.innerHTML =
    '<div class="my-trips-header">' +
      '<div>' +
        '<h2>Saved Trips</h2>' +
        '<p>' + savedTrips.length + ' saved trip' + (savedTrips.length === 1 ? '' : 's') + '.</p>' +
      '</div>' +
      '<a class="btn btn-secondary edit-profile-link" href="profile.html">Edit Profile</a>' +
    '</div>' +
    renderMyTripsFeedback() +
    '<div class="my-trips-grid" id="saved-trips-grid"></div>';

  const grid = document.getElementById("saved-trips-grid");

  savedTrips.forEach(function (trip) {
    grid.appendChild(createSavedTripCard(trip));
  });
}

// Creates one saved trip card.
// Expects a trip object from window.tripPackages.
// Returns an article element with View Details and Remove actions.
function createSavedTripCard(trip) {
  const card = document.createElement("article");
  card.className = "trip-card recommendation-card saved-trip-card";

  card.innerHTML =
    '<a class="trip-card-image-link" href="trip-details.html?id=' + encodeURIComponent(trip.id) + '">' +
      '<img class="trip-card-image" src="' + trip.image + '" alt="' + trip.title + ' in ' + trip.city + ', ' + trip.country + '">' +
    '</a>' +
    '<div class="trip-card-body">' +
      '<p class="placeholder-label">' + trip.tripType + '</p>' +
      '<h2>' + trip.title + '</h2>' +
      '<p class="trip-location">' + trip.city + ', ' + trip.country + '</p>' +
      '<p class="trip-card-description">' + trip.shortDescription + '</p>' +
      '<dl class="trip-meta">' +
        '<div><dt>Price</dt><dd>' + formatPrice(trip.estimatedPrice) + '</dd></div>' +
        '<div><dt>Duration</dt><dd>' + trip.durationDays + ' days</dd></div>' +
        '<div><dt>Rating</dt><dd>' + trip.rating + '</dd></div>' +
      '</dl>' +
      '<div class="trip-card-actions">' +
        '<a class="btn btn-primary" href="trip-details.html?id=' + encodeURIComponent(trip.id) + '">View Details</a>' +
        '<button class="btn btn-secondary remove-trip-button" type="button">Remove</button>' +
      '</div>' +
    '</div>';

  const removeButton = card.querySelector(".remove-trip-button");
  removeButton.addEventListener("click", function () {
    removeSavedTrip(trip.id, trip.title);
  });

  return card;
}

// Removes a saved trip and re-renders the My Trips page.
// Expects a trip id string and optional trip title.
// Updates localStorage through appStorage.
function removeSavedTrip(tripId, tripTitle) {
  if (!window.confirm("Remove this trip from My Trips?")) {
    return;
  }

  window.appStorage.removeSavedTripById(tripId);
  myTripsFeedbackMessage = (tripTitle || "Trip") + " removed from My Trips.";
  renderMyTripsPage();
}

// Builds the My Trips success feedback markup.
// Expects no input.
// Returns an empty string when there is no message to show.
function renderMyTripsFeedback() {
  if (!myTripsFeedbackMessage) {
    return "";
  }

  return '<p class="save-feedback save-feedback--visible" aria-live="polite">' + myTripsFeedbackMessage + '</p>';
}
