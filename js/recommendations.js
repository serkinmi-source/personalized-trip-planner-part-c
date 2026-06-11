document.addEventListener("DOMContentLoaded", function () {
  initializeSaveModal();
  initializeRecommendationFilters();
  applyStoredPreferences();
});

let currentRecommendationTrips = [];
let currentRecommendationScores = {};

// Reads temporary trip preferences saved by the Preferences form.
// Expects sessionStorage to contain a tripPreferences JSON value, if available.
// Returns the parsed preferences object or null.
function getStoredPreferences() {
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

// Converts saved preferences into the internal filters used for recommendations.
// Expects the object saved by validation.js under tripPreferences.
// Keeps all recommendation filtering frontend-only.
function buildFiltersFromPreferences(preferences) {
  return {
    tripType: preferences.tripType || "",
    maxBudget: Number(preferences.budget) || null,
    maxDuration: Number(preferences.durationDays) || null,
    travelers: Number(preferences.travelers) || null,
    kosherOnly: Boolean(preferences.kosherFriendly),
    interests: Array.isArray(preferences.interests) ? preferences.interests : []
  };
}

// Applies saved Plan a Trip preferences and renders matching packages.
// Expects sessionStorage preferences from the last valid search.
// Shows an intro state when no preferences were submitted yet.
function applyStoredPreferences() {
  const storedPreferences = getStoredPreferences();

  if (!storedPreferences) {
    showStartFromPreferencesState("Fill in the form and generate your matches.");
    updateResultsMessage("Trip matches are ready after you submit the form.");
    return;
  }

  renderRecommendationsFromPreferences(storedPreferences, {
    isLastSearch: true,
    shouldScroll: false
  });
}

// Renders recommendation cards from a preferences object.
// Expects saved or freshly submitted Plan a Trip values.
// Fetches matches from the Express API and updates the results panel without changing pages.
async function renderRecommendationsFromPreferences(preferences, options) {
  const grid = document.getElementById("recommendations-grid");

  if (!grid) {
    return;
  }

  hideResultsIntro();
  showSearchSummary(preferences, Boolean(options && options.isLastSearch));
  resetRecommendationFilters();
  showRecommendationFilters();
  updateResultsMessage("Loading trip matches...");
  grid.innerHTML = "";

  try {
    const matchingTrips = await fetchTripMatches(preferences);
    currentRecommendationTrips = matchingTrips;
    currentRecommendationScores = {};

    matchingTrips.forEach(function (trip, index) {
      currentRecommendationScores[trip.id] = matchingTrips.length - index;
    });

    if (matchingTrips.length === 0) {
      showEmptyState("No trips match your current trip type, budget, and duration. Try increasing your budget or adjusting your duration.");
      updateResultsMessage("No trips match your current trip type, budget, and duration. Try increasing your budget or adjusting your duration.");
      return;
    }

    renderFilteredTripCards();

    if (options && options.shouldScroll) {
      scrollToResultsPanel();
    }
  } catch (error) {
    showEmptyState("Trip matches could not be loaded. Please try again.");
    updateResultsMessage("Trip matches could not be loaded. Please try again.");
  }
}

// Requests trip matches from the Express API.
// Expects the validated Plan a Trip preferences object.
// Returns trip objects converted into the format used by the existing card renderer.
async function fetchTripMatches(preferences) {
  const response = await fetch("/api/trips/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildSearchRequestBody(preferences))
  });

  if (!response.ok) {
    throw new Error("Trip search request failed.");
  }

  const result = await response.json();
  const trips = Array.isArray(result.trips) ? result.trips : [];

  return trips.map(convertServerTripToFrontendTrip);
}

// Builds the request body expected by POST /api/trips/search.
// Expects validated preferences from validation.js.
// Returns plain JSON-safe values for the server.
function buildSearchRequestBody(preferences) {
  return {
    tripType: preferences.tripType,
    budget: Number(preferences.budget),
    durationDays: Number(preferences.durationDays),
    kosherFriendly: Boolean(preferences.kosherFriendly),
    interests: Array.isArray(preferences.interests) ? preferences.interests : []
  };
}

// Converts a SQL Server trip row into the frontend trip-card shape.
// Expects snake_case fields returned by the Express API.
// Returns camelCase fields used by the existing recommendation card renderer.
function convertServerTripToFrontendTrip(serverTrip) {
  return {
    id: Number(serverTrip.trip_id),
    slug: serverTrip.slug || "",
    title: serverTrip.title || "Trip package",
    city: serverTrip.city || "",
    country: serverTrip.country || "",
    tripType: serverTrip.trip_type || "",
    tags: normalizeServerList(serverTrip.tags).length > 0
      ? normalizeServerList(serverTrip.tags)
      : [serverTrip.trip_type, serverTrip.city, serverTrip.country].filter(Boolean),
    estimatedPrice: Number(serverTrip.estimated_price) || 0,
    durationDays: Number(serverTrip.duration_days) || 0,
    recommendedGroupSize: serverTrip.recommended_group_size || "",
    kosherFriendly: Boolean(serverTrip.kosher_friendly),
    averageRating: Number(serverTrip.average_rating),
    reviewCount: Number(serverTrip.review_count) || 0,
    image: normalizeServerImagePath(serverTrip.image_path, serverTrip.slug, serverTrip.title, serverTrip.city),
    shortDescription: serverTrip.short_description || ""
  };
}

// Normalizes optional SQL list fields such as tags.
// Expects an array, comma-separated string, or missing value.
// Returns an array that is safe for tag rendering.
function normalizeServerList(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    return value.split(",").map(function (item) {
      return item.trim();
    }).filter(Boolean);
  }

  return [];
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

// Formats visible trip prices in dollars.
// Expects a numeric price value.
// Returns a dollar-formatted string such as $1,500.
function formatPrice(price) {
  return "$" + price.toLocaleString();
}

// Filters and ranks trips from saved preferences.
// Expects filters built from sessionStorage preferences.
// Returns up to 10 trips ordered by customer rating plus interest matches.
function getRankedRecommendations(filters) {
  currentRecommendationScores = {};

  if (!Array.isArray(window.tripPackages)) {
    return [];
  }

  return window.tripPackages
    .map(function (trip) {
      return scoreTrip(trip, filters);
    })
    .filter(Boolean)
    .sort(sortScoredTrips)
    .slice(0, 10)
    .map(function (item) {
      currentRecommendationScores[item.trip.id] = item.finalScore;
      return item.trip;
    });
}

// Scores one eligible trip with rating plus partial interest matches.
// Expects one trip object and saved-preference filters.
// Returns a scored item or null when trip type, budget, or duration do not fit.
function scoreTrip(trip, filters) {
  if (!isEligibleTrip(trip, filters)) {
    return null;
  }

  const interestMatches = countMatchingInterests(trip, filters.interests);
  const ratingSummary = getTripRatingSummary(trip);
  const averageCustomerRating = ratingSummary.average || 0;
  const durationDifference = getDurationDifference(trip, filters.maxDuration);
  const finalScore = averageCustomerRating + (interestMatches * 0.5);

  return {
    trip: trip,
    finalScore: finalScore,
    interestMatches: interestMatches,
    durationDifference: durationDifference
  };
}

// Applies mandatory trip type, budget, and duration rules.
// Expects one trip and filters built from the saved Plan a Trip form.
function isEligibleTrip(trip, filters) {
  if (!filters.tripType || normalizeValue(trip.tripType) !== normalizeValue(filters.tripType)) {
    return false;
  }

  const tripPrice = Number(trip.estimatedPrice);

  if (!filters.maxBudget || !Number.isFinite(tripPrice) || tripPrice > filters.maxBudget * 1.2) {
    return false;
  }

  if (!filters.maxDuration || getDurationDifference(trip, filters.maxDuration) > 3) {
    return false;
  }

  if (filters.kosherOnly && !trip.kosherFriendly) {
    return false;
  }

  return true;
}

// Sorts by final score, then lower price, then duration closeness.
// Expects scored recommendation items.
function sortScoredTrips(first, second) {
  return second.finalScore - first.finalScore ||
    first.trip.estimatedPrice - second.trip.estimatedPrice ||
    first.durationDifference - second.durationDifference;
}

// Gets the real rating summary from static and localStorage reviews.
// Expects one trip object.
// Keeps recommendation ranking aligned with Trip Details.
function getTripRatingSummary(trip) {
  if (Number.isFinite(Number(trip.averageRating)) && Number(trip.reviewCount) > 0) {
    return {
      average: Number(trip.averageRating),
      count: Number(trip.reviewCount)
    };
  }

  if (window.appStorage && window.appStorage.getTripRatingSummary) {
    return window.appStorage.getTripRatingSummary(trip);
  }

  return {
    average: null,
    count: 0
  };
}

// Formats a trip's real rating summary for recommendation cards.
// Expects one trip object.
function formatTripRatingSummary(trip) {
  const summary = getTripRatingSummary(trip);

  if (window.appStorage && window.appStorage.formatRatingSummary) {
    return window.appStorage.formatRatingSummary(summary);
  }

  return "Not rated yet";
}

// Counts selected interests that overlap with a trip's interest list.
// Partial matches improve ranking, but missing interests do not hide the trip.
function countMatchingInterests(trip, selectedInterests) {
  const tripInterests = Array.isArray(trip.interests) ? trip.interests.map(normalizeValue) : [];

  if (!Array.isArray(selectedInterests) || selectedInterests.length === 0) {
    return 0;
  }

  return selectedInterests.filter(function (interest) {
    return tripInterests.includes(normalizeValue(interest));
  }).length;
}

// Measures how close a trip duration is to the user's requested duration.
// Used for eligibility and as a final sorting tie-breaker.
function getDurationDifference(trip, requestedDuration) {
  return Math.abs((Number(trip.durationDays) || 0) - requestedDuration);
}

// Normalizes form and trip values before comparing them.
// Keeps matching stable even if capitalization changes in the data.
function normalizeValue(value) {
  return String(value || "").trim().toLowerCase();
}

// Renders trip cards into the recommendations grid.
// Expects an array of trip package objects.
// Clears the grid and appends one card for each trip.
function renderTripCards(trips) {
  const grid = document.getElementById("recommendations-grid");

  if (!grid) {
    return;
  }

  grid.innerHTML = "";

  trips.forEach(function (trip, index) {
    grid.appendChild(createTripCard(trip, index));
  });
}

// Applies visible result filters and renders the current recommendation cards.
// Expects currentRecommendationTrips to hold the base trip matches.
// Updates the grid and status message after sort or clear-filter changes.
function renderFilteredTripCards() {
  const filteredTrips = getSortedRecommendationTrips(currentRecommendationTrips);

  if (filteredTrips.length === 0) {
    showEmptyState("No trips match your current filters. Try clearing the filters.");
    updateResultsMessage("No trip matches are visible with the current filters.");
    return;
  }

  renderTripCards(filteredTrips);
  updateResultsMessage("Showing " + filteredTrips.length + " trip match" + (filteredTrips.length === 1 ? "" : "es") + " based on your preferences.");
}

// Sorts current recommendation cards by the selected results filter.
// Expects an array of trip objects.
// Returns a new sorted array without changing the original list.
function getSortedRecommendationTrips(trips) {
  const sortSelect = document.getElementById("results-sort");
  const sortValue = sortSelect ? sortSelect.value : "best";
  const sortedTrips = trips.slice();

  if (sortValue === "price-low") {
    return sortedTrips.sort(function (first, second) {
      return first.estimatedPrice - second.estimatedPrice;
    });
  }

  if (sortValue === "rating-high") {
    return sortedTrips.sort(function (first, second) {
      return getRatingValue(second) - getRatingValue(first);
    });
  }

  if (sortValue === "duration-low") {
    return sortedTrips.sort(function (first, second) {
      return first.durationDays - second.durationDays;
    });
  }

  return sortedTrips.sort(function (first, second) {
    return (currentRecommendationScores[second.id] || 0) - (currentRecommendationScores[first.id] || 0);
  });
}

// Gets a numeric rating for sorting recommendation cards.
// Expects one trip object.
// Returns the calculated review average or zero when unrated.
function getRatingValue(trip) {
  const summary = getTripRatingSummary(trip);
  return Number(summary.average) || 0;
}

// Hides the empty intro copy once results are generated.
// Expects the optional results intro element on preferences.html.
// Keeps the page focused on the active search.
function hideResultsIntro() {
  const intro = document.getElementById("results-intro");

  if (intro) {
    intro.hidden = true;
  }
}

// Shows a readable summary for the active or restored search.
// Expects preferences from the Plan a Trip form.
// Writes one sentence above the trip cards.
function showSearchSummary(preferences, isLastSearch) {
  const summary = document.getElementById("active-search-summary");

  if (!summary) {
    return;
  }

  const prefix = isLastSearch ? "Last search: " : "Matches for: ";
  const kosherText = preferences.kosherFriendly ? ", kosher-friendly" : "";

  summary.textContent = prefix +
    preferences.tripType + ", " + formatPrice(Number(preferences.budget)) + " budget, " +
    preferences.durationDays + " days, " +
    preferences.travelers + " traveler" + (Number(preferences.travelers) === 1 ? "" : "s") + kosherText + ".";
  summary.hidden = false;
}

// Shows the result controls after a valid search.
// Expects the recommendation filters wrapper on preferences.html.
// Reveals sort and clear controls.
function showRecommendationFilters() {
  const filters = document.getElementById("recommendation-filters");

  if (filters) {
    filters.hidden = false;
  }
}

// Resets visible result filters to their default state.
// Expects optional filter controls on preferences.html.
// Keeps every fresh generated search sorted by best match.
function resetRecommendationFilters() {
  const sortSelect = document.getElementById("results-sort");

  if (sortSelect) {
    sortSelect.value = "best";
  }
}

// Wires the recommendation filter controls.
// Expects optional sort and clear controls.
// Re-renders cards when the user changes filters.
function initializeRecommendationFilters() {
  const sortSelect = document.getElementById("results-sort");
  const clearButton = document.getElementById("clear-recommendation-filters");

  if (sortSelect) {
    sortSelect.addEventListener("change", renderFilteredTripCards);
  }

  if (clearButton) {
    clearButton.addEventListener("click", function () {
      resetRecommendationFilters();
      renderFilteredTripCards();
    });
  }
}

// Scrolls the page to the results panel after generating matches.
// Expects the results panel to exist on preferences.html.
// Uses smooth scrolling when the browser supports it.
function scrollToResultsPanel() {
  const panel = document.getElementById("trip-results-panel");

  if (panel) {
    panel.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

// Creates one accessible recommendation card.
// Expects a trip package object and its position in the rendered list.
// Returns an article element ready to be inserted into the page.
function createTripCard(trip, index) {
  const card = document.createElement("article");
  card.className = "trip-card recommendation-card";
  card.style.animationDelay = Math.min(index * 0.035, 0.28) + "s";

  const detailsUrl = "/pages/trip-details.html?id=" + encodeURIComponent(trip.id);
  const ratingText = formatTripRatingSummary(trip);

  card.innerHTML =
    '<a class="trip-card-image-link" href="' + detailsUrl + '">' +
      '<img class="trip-card-image" src="' + trip.image + '" alt="' + trip.title + ' in ' + trip.city + ', ' + trip.country + '" onerror="this.onerror=null;this.src=\'/assets/images/backgrounds/preferences-hero.jpg\';">' +
    '</a>' +
    '<div class="trip-card-body">' +
      '<div class="trip-card-heading">' +
        '<p class="placeholder-label">' + trip.tripType + '</p>' +
        '<h2>' + trip.title + '</h2>' +
        '<p class="trip-location">' + trip.city + ', ' + trip.country + '</p>' +
      '</div>' +
      '<p class="trip-card-description">' + trip.shortDescription + '</p>' +
      '<div class="tag-list">' + createTagsMarkup(trip, 4) + '</div>' +
      '<dl class="trip-meta">' +
        '<div><dt>Price</dt><dd>' + formatPrice(trip.estimatedPrice) + '</dd></div>' +
        '<div><dt>Duration</dt><dd>' + trip.durationDays + ' days</dd></div>' +
        '<div><dt>Rating</dt><dd>' + ratingText + '</dd></div>' +
      '</dl>' +
      '<div class="trip-card-actions">' +
        '<a class="btn btn-primary" href="' + detailsUrl + '">View Details</a>' +
        '<button class="btn btn-secondary save-trip-button" type="button" data-trip-id="' + trip.id + '">&#9825; Save Trip</button>' +
      '</div>' +
    '</div>';

  const saveButton = card.querySelector(".save-trip-button");

  saveButton.addEventListener("click", function () {
    handleSaveTrip(trip.id, saveButton);
  });

  return card;
}

// Updates the visible results status text.
// Expects a short status message string.
// Writes the message to the results status area.
function updateResultsMessage(message) {
  const status = document.getElementById("results-status");

  if (status) {
    status.textContent = message;
  }
}

// Shows a readable empty state in the recommendations grid.
// Expects the message to display to the user.
// Clears any previous cards before adding the empty state.
function showEmptyState(message) {
  const grid = document.getElementById("recommendations-grid");

  if (!grid) {
    return;
  }

  grid.innerHTML =
    '<div class="empty-state recommendations-empty-state">' +
      '<h2>No matching trips</h2>' +
      '<p>' + message + '</p>' +
      '<a class="btn btn-secondary" href="#preferences-form">Update Preferences</a>' +
    '</div>';
}

// Shows the intro state when recommendations do not have saved preferences.
// Expects a short message to display in the recommendations grid.
// Guides users back to Plan a Trip instead of showing unfiltered packages.
function showStartFromPreferencesState(message) {
  const grid = document.getElementById("recommendations-grid");
  const intro = document.getElementById("results-intro");
  const summary = document.getElementById("active-search-summary");
  const filters = document.getElementById("recommendation-filters");

  if (intro) {
    const introText = intro.querySelector("p");

    if (introText && message) {
      introText.textContent = message;
    }

    intro.hidden = false;
  }

  if (summary) {
    summary.hidden = true;
  }

  if (filters) {
    filters.hidden = true;
  }

  if (grid) {
    grid.innerHTML = "";
  }
}

// Resets the Plan a Trip results panel when the submitted form is invalid.
// Expects an optional empty-state message.
// Clears visible cards and returns the panel to the intro state.
function resetTripMatchesToEmptyState(message) {
  currentRecommendationTrips = [];
  currentRecommendationScores = {};
  showStartFromPreferencesState(message || "Fill in the form and generate your matches.");
  updateResultsMessage("Trip matches are ready after you submit the form.");
}

// Opens the save modal for guests.
// Expects no input.
// Shows login and signup actions without saving data.
function openSaveModal() {
  const modal = document.getElementById("save-modal");

  if (modal) {
    modal.hidden = false;
  }
}

// Saves a trip for logged-in users or opens the guest modal.
// Expects a trip id and the clicked save button.
// Sends the save request to the Express API.
async function handleSaveTrip(tripId, saveButton) {
  const currentUser = getCurrentUserForSavedTrip();

  if (!currentUser) {
    openSaveModal();
    return;
  }

  if (saveButton) {
    saveButton.disabled = true;
  }

  try {
    const response = await fetch("/api/saved-trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: Number(currentUser.userId),
        tripId: Number(tripId)
      })
    });
    const data = await response.json();

    if (!response.ok || data.success === false) {
      if (saveButton) {
        saveButton.disabled = false;
      }

      updateResultsMessage(data.message || "Trip could not be saved. Please try again.");
      return;
    }

    setSavedButtonState(saveButton, "\u2665 Saved");
    updateResultsMessage(data.message || "Trip saved to My Trips.");
  } catch (error) {
    if (saveButton) {
      saveButton.disabled = false;
    }

    updateResultsMessage("Trip could not be saved. Please try again.");
  }
}

// Gets the logged-in user for database saved-trip requests.
// Expects appStorage current-user data with a real userId.
// Returns the current user object or null for guests.
function getCurrentUserForSavedTrip() {
  if (!window.appStorage || !window.appStorage.isUserLoggedIn || !window.appStorage.isUserLoggedIn()) {
    return null;
  }

  const currentUser = window.appStorage.getCurrentUser ? window.appStorage.getCurrentUser() : null;

  if (!currentUser || !Number.isInteger(Number(currentUser.userId))) {
    return null;
  }

  return currentUser;
}

// Updates a save button after a trip has been saved.
// Expects the button element and display text.
// Prevents duplicate save clicks for the same visible card.
function setSavedButtonState(button, text) {
  if (!button) {
    return;
  }

  button.textContent = text;
  button.classList.add("saved-button");
  button.disabled = true;
}

// Closes the save modal.
// Expects no input.
// Hides the modal without saving data.
function closeSaveModal() {
  const modal = document.getElementById("save-modal");

  if (modal) {
    modal.hidden = true;
  }
}

// Wires the close behavior for the save modal.
// Expects modal elements to exist on the page that renders trip cards.
// Adds click listeners for the close button and backdrop.
function initializeSaveModal() {
  const modal = document.getElementById("save-modal");
  const closeButton = document.getElementById("close-save-modal");

  if (closeButton) {
    closeButton.addEventListener("click", closeSaveModal);
  }

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeSaveModal();
      }
    });
  }
}

// Builds visible tag markup for a recommendation card.
// Expects a trip object.
// Returns HTML for tags, including Kosher-friendly when relevant.
function createTagsMarkup(trip, limit) {
  const tripTags = Array.isArray(trip.tags) ? trip.tags : [];
  const tags = trip.kosherFriendly ? tripTags.concat("Kosher-friendly") : tripTags;
  const visibleTags = limit ? tags.slice(0, limit) : tags;

  return visibleTags.map(function (tag) {
    return '<span class="tag">' + tag + '</span>';
  }).join("");
}

window.renderRecommendationsFromPreferences = renderRecommendationsFromPreferences;
window.resetTripMatchesToEmptyState = resetTripMatchesToEmptyState;
