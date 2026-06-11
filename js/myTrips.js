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
// Expects appStorage current-user data with a real userId.
// Shows guest, empty, or saved trip card states.
async function renderMyTripsPage() {
  const currentUser = getCurrentUserForMyTrips();

  if (!currentUser) {
    showGuestState();
    return;
  }

  try {
    const savedTrips = await fetchSavedTripsForUser(currentUser.userId);

    if (savedTrips.length === 0) {
      showEmptySavedTripsState();
      return;
    }

    renderSavedTripCards(savedTrips);
  } catch (error) {
    showMyTripsErrorState();
  }
}

// Gets the logged-in user for database saved-trip requests.
// Expects appStorage current-user data with a userId.
// Returns the current user object or null for guests.
function getCurrentUserForMyTrips() {
  if (!window.appStorage || !window.appStorage.isUserLoggedIn || !window.appStorage.isUserLoggedIn()) {
    return null;
  }

  const currentUser = window.appStorage.getCurrentUser ? window.appStorage.getCurrentUser() : null;

  if (!currentUser || !Number.isInteger(Number(currentUser.userId))) {
    return null;
  }

  return currentUser;
}

// Fetches saved trips for the logged-in user from the Express API.
// Expects a numeric user id.
// Returns frontend trip card objects.
async function fetchSavedTripsForUser(userId) {
  const response = await fetch("/api/users/" + encodeURIComponent(userId) + "/saved-trips");
  const data = await response.json().catch(function () {
    return {};
  });

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Saved trips request failed.");
  }

  const savedTrips = Array.isArray(data.savedTrips) ? data.savedTrips : [];

  return savedTrips.map(convertServerSavedTripToFrontendTrip);
}

// Converts one saved-trip SQL row into the existing trip card shape.
// Expects snake_case fields from GET /api/users/:userId/saved-trips.
// Returns a camelCase trip object for rendering.
function convertServerSavedTripToFrontendTrip(serverTrip) {
  return {
    savedId: serverTrip.saved_id,
    status: serverTrip.status || "",
    savedAt: serverTrip.saved_at || "",
    id: Number(serverTrip.trip_id),
    slug: serverTrip.slug || "",
    title: serverTrip.title || "Trip package",
    city: serverTrip.city || "",
    country: serverTrip.country || "",
    tripType: serverTrip.trip_type || "",
    estimatedPrice: Number(serverTrip.estimated_price) || 0,
    durationDays: Number(serverTrip.duration_days) || 0,
    recommendedGroupSize: serverTrip.recommended_group_size || "",
    kosherFriendly: Boolean(serverTrip.kosher_friendly),
    shortDescription: serverTrip.short_description || "",
    image: normalizeServerImagePath(serverTrip.image_path),
    averageRating: Number(serverTrip.average_rating),
    reviewCount: Number(serverTrip.review_count) || 0,
    rating: formatSavedTripRating(serverTrip)
  };
}

// Converts database image paths into browser-ready static asset paths.
// Expects paths such as images/trips/paris.jpg.
// Returns paths such as /assets/images/trips/paris.jpg.
function normalizeServerImagePath(imagePath) {
  const cleanPath = String(imagePath || "").trim().replace(/^\/+/, "");

  if (cleanPath.startsWith("assets/")) {
    return "/" + cleanPath;
  }

  if (cleanPath.startsWith("images/")) {
    return "/assets/" + cleanPath;
  }

  if (cleanPath !== "") {
    return "/assets/images/trips/" + cleanPath;
  }

  return "/assets/images/backgrounds/preferences-hero.jpg";
}

// Formats the database rating fields for a saved trip card.
// Expects a saved-trip row with average_rating and review_count.
// Returns the same text style used by other trip cards.
function formatSavedTripRating(serverTrip) {
  const reviewCount = Number(serverTrip.review_count) || 0;
  const averageRating = Number(serverTrip.average_rating);

  if (!Number.isFinite(averageRating) || reviewCount === 0) {
    return "Not rated yet";
  }

  if (window.appStorage && window.appStorage.formatRatingSummary) {
    return window.appStorage.formatRatingSummary({
      average: averageRating,
      count: reviewCount
    });
  }

  return averageRating.toFixed(1) + " / 5 (" + reviewCount + " " + (reviewCount === 1 ? "review" : "reviews") + ")";
}

// Shows an error state when saved trips cannot be loaded.
// Expects no input.
// Gives the user a simple retry action.
function showMyTripsErrorState() {
  const content = document.getElementById("my-trips-content");

  if (!content) {
    return;
  }

  content.innerHTML =
    '<div class="empty-state large-empty-state">' +
      '<p class="section-label">Saved trips</p>' +
      '<h2>Saved trips could not be loaded.</h2>' +
      '<p>Please try again.</p>' +
      '<button class="btn btn-primary" id="retry-my-trips-button" type="button">Try Again</button>' +
    '</div>';

  const retryButton = document.getElementById("retry-my-trips-button");

  if (retryButton) {
    retryButton.addEventListener("click", renderMyTripsPage);
  }
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
        '<a class="btn btn-primary" href="/pages/login.html">Log In</a>' +
        '<a class="btn btn-secondary" href="/pages/signup.html">Sign Up</a>' +
        '<a class="btn btn-secondary" href="/pages/preferences.html">Start Planning</a>' +
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
      '<a class="btn btn-primary" href="/pages/preferences.html">Start Planning</a>' +
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
      '<a class="btn btn-secondary edit-profile-link" href="/pages/profile.html">Edit Profile</a>' +
    '</div>' +
    renderMyTripsFeedback() +
    '<div class="my-trips-grid" id="saved-trips-grid"></div>';

  const grid = document.getElementById("saved-trips-grid");

  savedTrips.forEach(function (trip) {
    grid.appendChild(createSavedTripCard(trip));
  });
}

// Creates one saved trip card.
// Expects a trip object from the saved trips API.
// Returns an article element with View Details and Remove actions.
function createSavedTripCard(trip) {
  const card = document.createElement("article");
  card.className = "trip-card recommendation-card saved-trip-card";
  const detailsUrl = "/pages/trip-details.html?id=" + encodeURIComponent(trip.id);

  card.innerHTML =
    '<a class="trip-card-image-link" href="' + detailsUrl + '">' +
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
        '<a class="btn btn-primary" href="' + detailsUrl + '">View Details</a>' +
        '<button class="btn btn-secondary remove-trip-button" type="button">Remove</button>' +
      '</div>' +
    '</div>';

  const removeButton = card.querySelector(".remove-trip-button");
  removeButton.addEventListener("click", function () {
    removeSavedTrip(trip.id, trip.title);
  });

  return card;
}

// Shows a temporary message for remove until database delete is implemented.
// Expects a trip id string and optional trip title.
// Keeps the existing button without changing saved-trip database data.
function removeSavedTrip(tripId, tripTitle) {
  myTripsFeedbackMessage = "Removing saved trips is not connected yet.";
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
