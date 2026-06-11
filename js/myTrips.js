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
    status: String(serverTrip.status || "").toLowerCase(),
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
    image: normalizeServerImagePath(serverTrip.image_path, serverTrip.slug, serverTrip.title, serverTrip.city),
    averageRating: Number(serverTrip.average_rating),
    reviewCount: Number(serverTrip.review_count) || 0,
    rating: formatSavedTripRating(serverTrip)
  };
}

// Converts database image paths into browser-ready static asset paths.
// Expects a database image path plus optional trip slug/title.
// Returns a root-absolute static URL that matches local trip image names.
function normalizeServerImagePath(imagePath, slug, title, city) {
  const cleanPath = String(imagePath || "").trim().replace(/^\/+/, "");
  const destinationImage = getDestinationImagePath(cleanPath, slug, title, city);
  const localTripImage = getLocalTripImagePath(cleanPath, slug, title, city);
  const imageSlug = slug || createImageSlug(title);
  const fallbackImage = "/assets/images/backgrounds/preferences-hero.jpg";

  if (destinationImage) {
    return destinationImage;
  }

  if (localTripImage) {
    return localTripImage;
  }

  if (cleanPath.startsWith("assets/")) {
    if (cleanPath.startsWith("assets/images/trips/") && imageSlug && !cleanPath.endsWith("/" + imageSlug + ".jpg")) {
      return "/assets/images/trips/" + imageSlug + ".jpg";
    }

    return "/" + cleanPath;
  }

  if (cleanPath.startsWith("images/trips/") && imageSlug) {
    return "/assets/images/trips/" + imageSlug + ".jpg";
  }

  if (cleanPath.startsWith("images/")) {
    return "/assets/" + cleanPath;
  }

  if (imageSlug) {
    return "/assets/images/trips/" + imageSlug + ".jpg";
  }

  return cleanPath !== "" ? "/assets/images/trips/" + cleanPath : fallbackImage;
}

// Maps database-only destination trips to real local image files.
// Expects image path and optional trip identity fields.
// Returns a root-absolute image path or an empty string.
function getDestinationImagePath(imagePath, slug, title, city) {
  const destinationImages = {
    vienna: "vienna.jpg",
    berlin: "berlin.jpg",
    budapest: "budapest.jpg",
    zurich: "zurich.jpg",
    interlaken: "interlaken.jpg",
    miami: "miami.jpg",
    istanbul: "istanbul.jpg"
  };
  const candidates = [
    createImageSlug(city),
    createImageSlug(title),
    createImageSlug(slug),
    createImageSlug(getFileNameWithoutExtension(imagePath))
  ].filter(Boolean);
  const destinationKey = Object.keys(destinationImages).find(function (destination) {
    return candidates.some(function (candidate) {
      return candidate === destination || candidate.includes(destination);
    });
  });

  return destinationKey ? "/assets/images/trips/" + destinationImages[destinationKey] : "";
}

// Finds a matching local trip image from data.js when database filenames differ.
// Expects the database image path and optional trip identity fields.
// Returns a root-absolute image path or an empty string.
function getLocalTripImagePath(imagePath, slug, title, city) {
  if (!Array.isArray(window.tripPackages)) {
    return "";
  }

  const candidates = [
    createImageSlug(slug),
    createImageSlug(title),
    createImageSlug(city),
    createImageSlug(getFileNameWithoutExtension(imagePath))
  ].filter(Boolean);

  const localTrip = window.tripPackages.find(function (trip) {
    const localValues = [
      createImageSlug(trip.id),
      createImageSlug(trip.title),
      createImageSlug(trip.city),
      createImageSlug(getFileNameWithoutExtension(trip.image))
    ];

    return candidates.some(function (candidate) {
      return localValues.includes(candidate);
    });
  });

  return localTrip && localTrip.image ? normalizeLocalAssetPath(localTrip.image) : "";
}

// Converts a local data.js image path into an Express static URL.
// Expects paths such as ../assets/images/trips/paris-romantic-escape.jpg.
// Returns /assets/images/trips/paris-romantic-escape.jpg.
function normalizeLocalAssetPath(imagePath) {
  const cleanPath = String(imagePath || "").trim().replace(/^(\.\.\/)+/, "").replace(/^\/+/, "");

  if (cleanPath.startsWith("assets/")) {
    return "/" + cleanPath;
  }

  if (cleanPath.startsWith("images/")) {
    return "/assets/" + cleanPath;
  }

  return cleanPath ? "/assets/images/trips/" + cleanPath : "";
}

// Reads the filename stem from an image path.
// Expects any path-like string.
// Returns the filename without its extension.
function getFileNameWithoutExtension(imagePath) {
  const fileName = String(imagePath || "").split("/").pop() || "";
  return fileName.replace(/\.[^.]+$/, "");
}

// Creates a simple image slug from a trip title when the database slug is missing.
// Expects a trip title string.
// Returns a kebab-case filename stem.
function createImageSlug(title) {
  return String(title || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

// Converts a saved trip status into a readable label.
// Expects a status value from the database.
// Returns display text for the status dropdown.
function formatStatusLabel(status) {
  const statusLabels = {
    planned: "Planned",
    favorite: "Favorite",
    visited: "Visited"
  };

  return statusLabels[status] || "Planned";
}

// Builds the status dropdown for one saved trip card.
// Expects a saved trip object with savedId and status.
// Returns select markup with the current status selected.
function renderStatusSelect(trip) {
  const statuses = ["planned", "favorite", "visited"];
  const currentStatus = statuses.includes(trip.status) ? trip.status : "planned";

  return '<label for="saved-trip-status-' + trip.savedId + '">Status</label>' +
    '<select id="saved-trip-status-' + trip.savedId + '" class="saved-trip-status-select" data-saved-id="' + trip.savedId + '">' +
      statuses.map(function (status) {
        return '<option value="' + status + '"' + (status === currentStatus ? ' selected' : '') + '>' + formatStatusLabel(status) + '</option>';
      }).join("") +
    '</select>';
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
      '<img class="trip-card-image" src="' + trip.image + '" alt="' + trip.title + ' in ' + trip.city + ', ' + trip.country + '" onerror="this.onerror=null;this.src=\'/assets/images/backgrounds/preferences-hero.jpg\';">' +
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
      '<div class="form-group">' +
        renderStatusSelect(trip) +
      '</div>' +
      '<div class="trip-card-actions">' +
        '<a class="btn btn-primary" href="' + detailsUrl + '">View Details</a>' +
        '<button class="btn btn-secondary remove-trip-button" type="button">Remove</button>' +
      '</div>' +
    '</div>';

  const statusSelect = card.querySelector(".saved-trip-status-select");

  if (statusSelect) {
    statusSelect.addEventListener("change", function () {
      updateSavedTripStatus(trip.savedId, statusSelect.value);
    });
  }

  const removeButton = card.querySelector(".remove-trip-button");
  removeButton.addEventListener("click", function () {
    removeSavedTrip(trip.savedId, trip.title);
  });

  return card;
}

// Updates one saved trip status in the database.
// Expects a saved trip id and one allowed status value.
// Re-fetches My Trips after a successful update.
async function updateSavedTripStatus(savedId, status) {
  const currentUser = getCurrentUserForMyTrips();
  const allowedStatuses = ["planned", "favorite", "visited"];

  if (!currentUser) {
    myTripsFeedbackMessage = "Please log in to update saved trips.";
    showGuestState();
    return;
  }

  if (!allowedStatuses.includes(status)) {
    myTripsFeedbackMessage = "Choose a valid trip status.";
    renderMyTripsPage();
    return;
  }

  try {
    const response = await fetch("/api/saved-trips/" + encodeURIComponent(savedId) + "/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: Number(currentUser.userId),
        status: status
      })
    });
    const data = await response.json().catch(function () {
      return {};
    });

    if (!response.ok || data.success === false) {
      myTripsFeedbackMessage = data.message || "Trip status could not be updated.";
      renderMyTripsPage();
      return;
    }

    myTripsFeedbackMessage = data.message || "Trip status updated.";
    renderMyTripsPage();
  } catch (error) {
    myTripsFeedbackMessage = "Trip status could not be updated. Please try again.";
    renderMyTripsPage();
  }
}

// Removes a saved trip from the database after confirmation.
// Expects a saved trip id and optional trip title.
// Re-fetches My Trips after a successful delete.
async function removeSavedTrip(savedId, tripTitle) {
  const currentUser = getCurrentUserForMyTrips();

  if (!currentUser) {
    myTripsFeedbackMessage = "Please log in to remove saved trips.";
    showGuestState();
    return;
  }

  if (!window.confirm("Remove this trip from My Trips?")) {
    return;
  }

  try {
    const response = await fetch("/api/saved-trips/" + encodeURIComponent(savedId), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: Number(currentUser.userId)
      })
    });
    const data = await response.json().catch(function () {
      return {};
    });

    if (!response.ok || data.success === false) {
      myTripsFeedbackMessage = data.message || "Trip could not be removed.";
      renderMyTripsPage();
      return;
    }

    myTripsFeedbackMessage = data.message || (tripTitle || "Trip") + " removed from My Trips.";
    renderMyTripsPage();
  } catch (error) {
    myTripsFeedbackMessage = "Trip could not be removed. Please try again.";
    renderMyTripsPage();
  }
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
