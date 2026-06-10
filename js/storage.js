// Frontend-only storage helpers for login state and saved trip ids.
// This is not real authentication and must not store passwords.
const CURRENT_USER_KEY = "currentUser";
const SAVED_TRIPS_KEY = "savedTrips";
const TRIP_REVIEWS_KEY = "tripReviews";

// Safely reads JSON data from localStorage.
// Expects a localStorage key and a fallback value.
// Returns parsed data or the fallback when data is missing or invalid.
function readStorageValue(key, fallbackValue) {
  const storedValue = localStorage.getItem(key);

  if (!storedValue) {
    return fallbackValue;
  }

  try {
    return JSON.parse(storedValue);
  } catch (error) {
    return fallbackValue;
  }
}

// Gets the current user from localStorage.
// Expects no input.
// Returns the user object or null.
function getCurrentUser() {
  return readStorageValue(CURRENT_USER_KEY, null);
}

// Stores the current user in localStorage.
// Expects a simple user object with isLoggedIn, firstName, and email.
// Produces a persisted frontend-only login state.
function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

// Clears the current user from localStorage.
// Expects no input.
// Logs the user out of the current browser session.
function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Checks whether a user is currently logged in.
// Expects no input.
// Returns true only when currentUser has isLoggedIn set to true.
function isUserLoggedIn() {
  const currentUser = getCurrentUser();
  return Boolean(currentUser && currentUser.isLoggedIn);
}

// Normalizes old saved-trip ids and new timestamped records.
// Expects no input.
// Returns records with id and savedAt so My Trips can sort newest first.
function getSavedTripRecords() {
  const storedTrips = readStorageValue(SAVED_TRIPS_KEY, []);

  if (!Array.isArray(storedTrips)) {
    return [];
  }

  return storedTrips
    .map(function (savedTrip, index) {
      if (typeof savedTrip === "string") {
        return {
          id: savedTrip,
          savedAt: index + 1
        };
      }

      if (savedTrip && typeof savedTrip.id === "string") {
        return {
          id: savedTrip.id,
          savedAt: Number(savedTrip.savedAt) || index + 1
        };
      }

      return null;
    })
    .filter(Boolean)
    .sort(function (first, second) {
      return second.savedAt - first.savedAt;
    });
}

// Stores timestamped saved-trip records in localStorage.
// Expects an array of objects with id and savedAt.
// Keeps the storage key stable for backwards compatibility.
function writeSavedTripRecords(savedTripRecords) {
  localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(savedTripRecords));
}

// Gets saved trip ids from localStorage.
// Expects no input.
// Returns an array of trip id strings ordered newest first.
function getSavedTripIds() {
  return getSavedTripRecords().map(function (savedTrip) {
    return savedTrip.id;
  });
}

// Saves a trip id with a timestamp if it is not already saved.
// Expects a trip id string.
// Updates localStorage and returns the full saved record array.
function saveTripById(tripId) {
  const savedTripRecords = getSavedTripRecords();
  const alreadySaved = savedTripRecords.some(function (savedTrip) {
    return savedTrip.id === tripId;
  });

  if (!alreadySaved) {
    savedTripRecords.unshift({
      id: tripId,
      savedAt: Date.now()
    });
    writeSavedTripRecords(savedTripRecords);
  }

  return savedTripRecords;
}

// Removes a trip id from saved trips.
// Expects a trip id string.
// Updates localStorage and returns the remaining saved record array.
function removeSavedTripById(tripId) {
  const savedTripRecords = getSavedTripRecords().filter(function (savedTrip) {
    return savedTrip.id !== tripId;
  });

  writeSavedTripRecords(savedTripRecords);
  return savedTripRecords;
}

// Checks whether a trip id is already saved.
// Expects a trip id string.
// Returns true when the trip id is stored in savedTrips.
function isTripSaved(tripId) {
  return getSavedTripIds().includes(tripId);
}

// Clears all saved trips from localStorage.
// Expects no input.
// Removes the savedTrips key.
function clearSavedTrips() {
  localStorage.removeItem(SAVED_TRIPS_KEY);
}

// Gets user-submitted trip reviews from localStorage.
// Expects no input.
// Returns clean review records saved by logged-in users.
function getTripReviewRecords() {
  const storedReviews = readStorageValue(TRIP_REVIEWS_KEY, []);

  if (!Array.isArray(storedReviews)) {
    return [];
  }

  return storedReviews.filter(function (review) {
    return review &&
      typeof review.tripId === "string" &&
      typeof review.userEmail === "string" &&
      typeof review.text === "string" &&
      !Number.isNaN(Number(review.rating));
  });
}

// Stores user-submitted trip reviews in localStorage.
// Expects an array of review records.
function writeTripReviewRecords(reviewRecords) {
  localStorage.setItem(TRIP_REVIEWS_KEY, JSON.stringify(reviewRecords));
}

// Gets localStorage reviews for one trip.
// Expects a trip id string.
// Returns reviews that belong to the selected trip.
function getReviewsByTripId(tripId) {
  return getTripReviewRecords().filter(function (review) {
    return review.tripId === tripId;
  });
}

// Checks whether a user already reviewed a trip.
// Expects a trip id and user email.
// Returns true when that email already has one review for the trip.
function hasUserReviewedTrip(tripId, userEmail) {
  const normalizedEmail = String(userEmail || "").trim().toLowerCase();

  return getTripReviewRecords().some(function (review) {
    return review.tripId === tripId &&
      String(review.userEmail || "").trim().toLowerCase() === normalizedEmail;
  });
}

// Saves one user review if it is not a duplicate for that trip.
// Expects a review object with tripId, userEmail, rating, text, and createdAt.
// Returns an object that reports whether the review was saved.
function saveTripReview(review) {
  if (!review || hasUserReviewedTrip(review.tripId, review.userEmail)) {
    return {
      saved: false,
      reason: "duplicate"
    };
  }

  const reviewRecords = getTripReviewRecords();
  const cleanReview = {
    tripId: review.tripId,
    userEmail: String(review.userEmail || "").trim().toLowerCase(),
    rating: Number(review.rating),
    text: String(review.text || "").trim(),
    createdAt: review.createdAt || new Date().toISOString()
  };

  reviewRecords.push(cleanReview);
  writeTripReviewRecords(reviewRecords);

  return {
    saved: true,
    review: cleanReview
  };
}

// Gets static reviews from a trip object in the same shape as local reviews.
// Expects a trip package object from data.js.
// Returns normalized review records for shared display and rating math.
function getStaticReviewsForTrip(trip) {
  if (!trip || !Array.isArray(trip.reviews)) {
    return [];
  }

  return trip.reviews.map(function (review) {
    return {
      source: "static",
      user: review.user || "Traveler",
      rating: Number(review.rating),
      text: review.comment || review.text || "",
      createdAt: review.createdAt || ""
    };
  });
}

// Gets user-submitted reviews from localStorage in display-ready shape.
// Expects a trip id string.
// Returns normalized local review records.
function getLocalReviewsForTrip(tripId) {
  return getReviewsByTripId(tripId).map(function (review) {
    return {
      source: "local",
      tripId: review.tripId,
      userEmail: review.userEmail,
      rating: Number(review.rating),
      text: review.text,
      createdAt: review.createdAt || ""
    };
  });
}

// Combines static reviews and localStorage reviews for one trip.
// Expects a trip package object.
// Returns all reviews used by Trip Details and trip matches.
function getAllReviewsForTrip(trip) {
  if (!trip) {
    return [];
  }

  return getStaticReviewsForTrip(trip).concat(getLocalReviewsForTrip(trip.id));
}

// Calculates the real average and count from numeric review ratings.
// Expects normalized review records.
// Returns average and count for shared rating displays.
function calculateRatingSummary(reviews) {
  const numericRatings = Array.isArray(reviews) ? reviews
    .map(function (review) {
      return Number(review.rating);
    })
    .filter(function (rating) {
      return Number.isFinite(rating);
    }) : [];

  if (numericRatings.length === 0) {
    return {
      average: null,
      count: 0
    };
  }

  const total = numericRatings.reduce(function (sum, rating) {
    return sum + rating;
  }, 0);

  return {
    average: total / numericRatings.length,
    count: numericRatings.length
  };
}

// Gets a trip's calculated rating summary from static and local reviews.
// Expects a trip package object.
function getTripRatingSummary(trip) {
  return calculateRatingSummary(getAllReviewsForTrip(trip));
}

// Formats a calculated rating summary for card and detail displays.
// Expects the output of calculateRatingSummary or getTripRatingSummary.
function formatRatingSummary(summary) {
  if (!summary || summary.count === 0) {
    return "Not rated yet";
  }

  return summary.average.toFixed(1) + " / 5 (" + summary.count + " " + (summary.count === 1 ? "review" : "reviews") + ")";
}

window.appStorage = {
  getCurrentUser: getCurrentUser,
  setCurrentUser: setCurrentUser,
  clearCurrentUser: clearCurrentUser,
  isUserLoggedIn: isUserLoggedIn,
  getSavedTripRecords: getSavedTripRecords,
  getSavedTripIds: getSavedTripIds,
  saveTripById: saveTripById,
  removeSavedTripById: removeSavedTripById,
  isTripSaved: isTripSaved,
  clearSavedTrips: clearSavedTrips,
  getTripReviewRecords: getTripReviewRecords,
  getReviewsByTripId: getReviewsByTripId,
  hasUserReviewedTrip: hasUserReviewedTrip,
  saveTripReview: saveTripReview,
  getStaticReviewsForTrip: getStaticReviewsForTrip,
  getLocalReviewsForTrip: getLocalReviewsForTrip,
  getAllReviewsForTrip: getAllReviewsForTrip,
  calculateRatingSummary: calculateRatingSummary,
  getTripRatingSummary: getTripRatingSummary,
  formatRatingSummary: formatRatingSummary
};
