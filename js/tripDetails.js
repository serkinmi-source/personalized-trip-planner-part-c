document.addEventListener("DOMContentLoaded", function () {
  if (!Array.isArray(window.tripPackages)) {
    showTripNotFound();
    return;
  }

  const tripId = getTripIdFromUrl();
  const trip = findTripById(tripId);

  if (!trip) {
    showTripNotFound();
    return;
  }

  renderTripDetails(trip);
  initializeSaveModal();
});

// Reads the trip id from the page URL query string.
// Expects a URL like trip-details.html?id=trip-paris-romantic.
// Returns the id string or null when no id is provided.
function getTripIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Finds a trip package by id in the global trip data.
// Expects a trip id string.
// Returns the matching trip object or undefined.
function findTripById(tripId) {
  if (!tripId) {
    return undefined;
  }

  return window.tripPackages.find(function (trip) {
    return trip.id === tripId;
  });
}

// Formats visible trip prices in dollars.
// Expects a numeric price value.
// Returns a dollar-formatted string such as $1,500.
function formatPrice(price) {
  return "$" + price.toLocaleString();
}

// Escapes user-entered review text before adding it to generated markup.
// Expects any value that will be displayed as text.
// Returns an HTML-safe string.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Renders all visible trip details for the selected package.
// Expects a trip object from window.tripPackages.
// Updates the hero, metadata, itinerary, tags, interests, and reviews.
function renderTripDetails(trip) {
  const reviews = getCombinedTripReviews(trip);
  const ratingSummary = calculateRatingSummary(reviews);

  document.title = trip.title + " | Personalized Trip Planner";
  renderHero(trip, ratingSummary);

  const content = document.getElementById("trip-details-content");

  if (!content) {
    return;
  }

  content.innerHTML =
    '<div class="trip-details-layout">' +
      '<div class="trip-main">' +
        '<section class="detail-section trip-overview-section">' +
          '<img class="trip-detail-image" src="' + trip.image + '" alt="' + trip.title + ' in ' + trip.city + ', ' + trip.country + '">' +
          '<div class="trip-detail-actions">' +
            '<button class="btn btn-primary" id="save-trip-button" type="button">♡ Save Trip</button>' +
            '<a class="btn btn-secondary" href="preferences.html">Back to Plan a Trip</a>' +
          '</div>' +
          '<p class="save-feedback" id="trip-save-feedback" aria-live="polite"></p>' +
        '</section>' +
        '<section class="detail-section">' +
          '<h2>Gallery</h2>' +
          '<div class="visual-gallery">' + renderGallery(trip) + '</div>' +
        '</section>' +
        '<section class="detail-section">' +
          '<h2>Itinerary</h2>' +
          '<div class="trip-itinerary-list">' + renderItinerary(trip.itinerary) + '</div>' +
        '</section>' +
        '<section class="detail-section">' +
          '<h2>Trip Highlights</h2>' +
          '<h3>Tags</h3>' +
          '<div class="tag-list">' + renderBadgeList(getTripTags(trip)) + '</div>' +
          '<h3>Interests</h3>' +
          '<div class="tag-list">' + renderBadgeList(trip.interests) + '</div>' +
        '</section>' +
        '<section class="detail-section">' +
          '<h2>Traveler Reviews</h2>' +
          '<div class="review-list" id="review-list">' + renderReviews(reviews) + '</div>' +
        '</section>' +
        '<section class="detail-section">' +
          '<h2>Leave a Review</h2>' +
          '<p>Share a short note about this trip.</p>' +
          '<div class="review-auth-actions" id="review-auth-actions" hidden>' +
            '<p>Please log in or sign up to leave a review.</p>' +
            '<div class="modal-actions">' +
              '<a class="btn btn-primary" href="login.html">Log In</a>' +
              '<a class="btn btn-secondary" href="signup.html">Sign Up</a>' +
            '</div>' +
          '</div>' +
          '<form class="review-form" id="review-form" action="#" method="post" novalidate>' +
            '<div class="form-group">' +
              '<label for="review-rating">Rating</label>' +
              '<select id="review-rating" name="reviewRating" aria-describedby="review-rating-error">' +
                '<option value="">Select a rating</option>' +
                '<option value="5">5</option>' +
                '<option value="4">4</option>' +
                '<option value="3">3</option>' +
                '<option value="2">2</option>' +
                '<option value="1">1</option>' +
              '</select>' +
              '<p class="field-error" id="review-rating-error" aria-live="polite"></p>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="review-text">Review text</label>' +
              '<textarea id="review-text" name="reviewText" rows="5" placeholder="Share a short note about this trip" aria-describedby="review-text-error"></textarea>' +
              '<p class="field-error" id="review-text-error" aria-live="polite"></p>' +
            '</div>' +
            '<p class="save-feedback" id="review-form-feedback" aria-live="polite"></p>' +
            '<button class="btn btn-secondary" type="submit">Submit Review</button>' +
          '</form>' +
        '</section>' +
      '</div>' +
      '<aside class="info-sidebar trip-info-sidebar">' +
        '<h2>Essential Info</h2>' +
        '<dl class="trip-detail-meta">' +
          '<div><dt>Trip type</dt><dd>' + trip.tripType + '</dd></div>' +
          '<div><dt>Estimated price</dt><dd>' + formatPrice(trip.estimatedPrice) + '</dd></div>' +
          '<div><dt>Duration</dt><dd>' + trip.durationDays + ' days</dd></div>' +
          '<div><dt>Group size</dt><dd>' + trip.recommendedGroupSize + '</dd></div>' +
          '<div><dt>Rating</dt><dd id="trip-rating-summary">' + renderRatingSummary(ratingSummary) + '</dd></div>' +
        '</dl>' +
        (trip.kosherFriendly ? '<span class="tag kosher-detail-tag">Kosher-friendly</span>' : '') +
      '</aside>' +
    '</div>';

  const saveButton = document.getElementById("save-trip-button");

  if (saveButton) {
    saveButton.innerHTML = "&#9825; Save Trip";

    if (window.appStorage && window.appStorage.isTripSaved(trip.id)) {
      setTripDetailsSavedState(saveButton, "♥ Saved to My Trips");
    }

    saveButton.addEventListener("click", function () {
      handleTripDetailsSave(trip.id, saveButton);
    });
  }

  initializeReviewForm(trip);
}

// Renders the top hero text for the selected trip.
// Expects a trip object and calculated rating summary.
// Updates the existing hero content container.
function renderHero(trip, ratingSummary) {
  const hero = document.getElementById("trip-hero-content");
  const heroSection = document.querySelector(".trip-detail-hero");

  if (!hero) {
    return;
  }

  if (heroSection) {
    heroSection.style.backgroundImage = 'url("' + trip.image + '")';
  }

  hero.innerHTML =
    '<p class="section-label">' + trip.tripType + ' trip package</p>' +
    '<h1>' + trip.title + '</h1>' +
    '<p class="trip-hero-location">' + trip.city + ', ' + trip.country + '</p>' +
    '<p class="lead-text">' + trip.shortDescription + '</p>' +
    '<div class="trip-hero-meta">' +
      '<span>' + formatPrice(trip.estimatedPrice) + '</span>' +
      '<span>' + trip.durationDays + ' days</span>' +
      '<span>' + trip.recommendedGroupSize + '</span>' +
      '<span id="trip-hero-rating-summary">' + renderRatingSummary(ratingSummary) + '</span>' +
      (trip.kosherFriendly ? '<span>Kosher-friendly</span>' : '') +
    '</div>';
}

// Renders itinerary day cards.
// Expects an array of itinerary day objects.
// Returns HTML markup for the itinerary list.
function renderItinerary(itinerary) {
  return itinerary.map(function (item) {
    return '<article class="itinerary-card">' +
      '<span>Day ' + item.day + '</span>' +
      '<h3>' + item.title + '</h3>' +
      '<p>' + item.description + '</p>' +
    '</article>';
  }).join("");
}

// Renders the visual gallery for the selected trip.
// Expects a trip object with a gallery array, or falls back to the main image.
// Returns responsive image-card markup.
function renderGallery(trip) {
  const gallery = getTripGallery(trip);

  return gallery.map(function (image) {
    return '<figure class="gallery-item">' +
      '<img src="' + image.src + '" alt="' + escapeHtml(image.alt) + '">' +
    '</figure>';
  }).join("");
}

// Gets a safe gallery array for a trip details page.
// Expects a trip object.
// Returns at least the main trip image when gallery data is missing.
function getTripGallery(trip) {
  if (Array.isArray(trip.gallery) && trip.gallery.length > 0) {
    return trip.gallery;
  }

  return [
    {
      src: trip.image,
      alt: trip.title + " in " + trip.city + ", " + trip.country
    }
  ];
}

// Combines static data reviews with localStorage reviews for one trip.
// Expects a trip object with an id and optional static reviews.
// Returns normalized review objects used by rendering and rating calculations.
function getCombinedTripReviews(trip) {
  return window.appStorage && window.appStorage.getAllReviewsForTrip
    ? window.appStorage.getAllReviewsForTrip(trip)
    : [];
}

// Calculates the real average rating from review data.
// Expects normalized reviews and counts only numeric ratings.
function calculateRatingSummary(reviews) {
  return window.appStorage && window.appStorage.calculateRatingSummary
    ? window.appStorage.calculateRatingSummary(reviews)
    : { average: null, count: 0 };
}

// Renders the visible rating summary from real review counts.
// Expects the output of calculateRatingSummary.
function renderRatingSummary(summary) {
  return window.appStorage && window.appStorage.formatRatingSummary
    ? window.appStorage.formatRatingSummary(summary)
    : "Not rated yet";
}

// Renders traveler review cards.
// Expects normalized review objects from static data and localStorage.
// Returns HTML markup for all reviews.
function renderReviews(reviews) {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return '<p class="muted-text">No reviews yet.</p>';
  }

  return reviews.map(function (review) {
    return '<article class="review-card">' +
      '<div class="review-card-header">' +
        '<h3>' + escapeHtml(getReviewDisplayName(review)) + '</h3>' +
        '<span>' + Number(review.rating).toFixed(1) + ' / 5</span>' +
      '</div>' +
      '<p>' + escapeHtml(review.text) + '</p>' +
    '</article>';
  }).join("");
}

// Chooses a friendly display name for static and local reviews.
// Expects a normalized review object.
// Avoids showing personal email addresses in the UI.
function getReviewDisplayName(review) {
  if (review.source !== "local") {
    return review.user || "Traveler";
  }

  const currentUserEmail = getCurrentUserEmail();

  if (currentUserEmail && normalizeEmail(review.userEmail) === currentUserEmail) {
    return "You";
  }

  return "Traveler";
}

// Wires client-side review submission for the current trip.
// Expects the selected trip object so localStorage reviews can be updated.
function initializeReviewForm(trip) {
  const reviewForm = document.getElementById("review-form");

  if (!reviewForm) {
    return;
  }

  updateReviewFormAvailability(trip);

  reviewForm.addEventListener("submit", function (event) {
    handleReviewSubmit(event, trip);
  });
}

// Updates the review form for guests and users who already reviewed.
// Expects the current trip object.
function updateReviewFormAvailability(trip) {
  const authActions = document.getElementById("review-auth-actions");
  const submitButton = document.querySelector("#review-form button[type='submit']");
  const userEmail = getCurrentUserEmail();

  if (authActions) {
    authActions.hidden = Boolean(userEmail);
  }

  if (!userEmail) {
    enableReviewForm();
    showReviewFeedback("Please log in or sign up to leave a review.", "error");
    return;
  }

  if (userHasReviewedTrip(trip.id, userEmail)) {
    disableReviewForm();
    showReviewFeedback("You have already reviewed this trip.", "error");
    return;
  }

  enableReviewForm();
  showReviewFeedback("");

  if (submitButton) {
    submitButton.textContent = "Submit Review";
  }
}

// Validates and saves a new review in localStorage.
// Expects a submit event and the current trip object.
// Re-renders reviews and rating summaries after a valid submission.
function handleReviewSubmit(event, trip) {
  event.preventDefault();

  clearReviewFieldError("review-rating");
  clearReviewFieldError("review-text");
  showReviewFeedback("");

  const userEmail = getCurrentUserEmail();

  if (!userEmail) {
    showReviewFeedback("Please log in or sign up to leave a review.", "error");
    const authActions = document.getElementById("review-auth-actions");

    if (authActions) {
      authActions.hidden = false;
    }

    return;
  }

  if (userHasReviewedTrip(trip.id, userEmail)) {
    disableReviewForm();
    showReviewFeedback("You have already reviewed this trip.", "error");
    return;
  }

  const ratingField = document.getElementById("review-rating");
  const textField = document.getElementById("review-text");
  const rating = ratingField ? ratingField.value.trim() : "";
  const reviewText = textField ? textField.value.trim() : "";
  let isValid = true;

  if (rating === "") {
    showReviewFieldError("review-rating", "Rating is required.");
    isValid = false;
  }

  if (reviewText === "") {
    showReviewFieldError("review-text", "Review text is required.");
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const saveResult = window.appStorage.saveTripReview({
    tripId: trip.id,
    userEmail: userEmail,
    rating: Number(rating),
    text: reviewText,
    createdAt: new Date().toISOString()
  });

  if (!saveResult.saved) {
    disableReviewForm();
    showReviewFeedback("You have already reviewed this trip.", "error");
    return;
  }

  event.target.reset();
  renderReviewAndRatingState(trip);
  disableReviewForm();
  showReviewFeedback("Review submitted successfully.", "success");
}

// Re-renders combined reviews and calculated rating summaries.
// Expects the current trip object.
function renderReviewAndRatingState(trip) {
  const reviews = getCombinedTripReviews(trip);
  const ratingSummary = calculateRatingSummary(reviews);
  const reviewList = document.getElementById("review-list");
  const essentialRating = document.getElementById("trip-rating-summary");
  const heroRating = document.getElementById("trip-hero-rating-summary");

  if (reviewList) {
    reviewList.innerHTML = renderReviews(reviews);
  }

  if (essentialRating) {
    essentialRating.textContent = renderRatingSummary(ratingSummary);
  }

  if (heroRating) {
    heroRating.textContent = renderRatingSummary(ratingSummary);
  }
}

// Checks whether the current user already reviewed a trip.
// Expects a trip id and normalized user email.
function userHasReviewedTrip(tripId, userEmail) {
  return Boolean(window.appStorage &&
    window.appStorage.hasUserReviewedTrip &&
    window.appStorage.hasUserReviewedTrip(tripId, userEmail));
}

// Gets the logged-in user's email when available.
// Expects appStorage current-user data.
function getCurrentUserEmail() {
  if (!window.appStorage || !window.appStorage.isUserLoggedIn()) {
    return "";
  }

  const currentUser = window.appStorage.getCurrentUser ? window.appStorage.getCurrentUser() : null;
  return normalizeEmail(currentUser && currentUser.email);
}

// Normalizes emails before duplicate checks.
// Expects any email-like value.
function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

// Enables review fields for users who can review.
// Expects review form controls to exist on the page.
function enableReviewForm() {
  setReviewFormDisabled(false);
}

// Disables review fields after a user has reviewed the trip.
// Expects review form controls to exist on the page.
function disableReviewForm() {
  setReviewFormDisabled(true);
}

// Toggles review form controls.
// Expects a disabled boolean.
function setReviewFormDisabled(disabled) {
  const formControls = document.querySelectorAll("#review-rating, #review-text, #review-form button[type='submit']");

  formControls.forEach(function (control) {
    control.disabled = disabled;
  });
}

// Shows an inline review-form field error.
// Expects a field id and message.
// Keeps review validation feedback beside the relevant input.
function showReviewFieldError(fieldId, message) {
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

// Clears one review-form field error.
// Expects a field id.
// Removes invalid styling and visible error text.
function clearReviewFieldError(fieldId) {
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

// Shows review submission feedback.
// Expects a short message or an empty string and an optional message type.
// Uses success and error styles near the review form.
function showReviewFeedback(message, type) {
  const feedback = document.getElementById("review-form-feedback");

  if (!feedback) {
    return;
  }

  feedback.textContent = message;
  feedback.className = "save-feedback";

  if (message) {
    feedback.classList.add("save-feedback--visible");
    feedback.classList.add(type === "error" ? "save-feedback--error" : "save-feedback--success");
  }
}

// Shows a friendly not-found state when the trip id is missing or invalid.
// Expects no input.
// Replaces the page content with a clear message and link back.
function showTripNotFound() {
  const hero = document.getElementById("trip-hero-content");
  const content = document.getElementById("trip-details-content");

  if (hero) {
    hero.innerHTML =
      '<p class="section-label">Trip package</p>' +
      '<h1>Trip package not found.</h1>' +
      '<p class="lead-text">Choose another trip from Plan a Trip.</p>';
  }

  if (content) {
    content.innerHTML =
      '<div class="empty-state large-empty-state">' +
        '<h2>Trip package not found.</h2>' +
        '<p>Choose another trip from Plan a Trip.</p>' +
        '<a class="btn btn-primary" href="preferences.html">Back to Plan a Trip</a>' +
      '</div>';
  }
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

// Saves the current trip for logged-in users or opens the guest modal.
// Expects the current trip id and Save Trip button.
// Updates localStorage only when a user is logged in.
function handleTripDetailsSave(tripId, saveButton) {
  if (!window.appStorage || !window.appStorage.isUserLoggedIn()) {
    openSaveModal();
    return;
  }

  window.appStorage.saveTripById(tripId);
  setTripDetailsSavedState(saveButton, "♥ Saved to My Trips");
  showTripSaveFeedback("Trip saved to My Trips.");
}

// Updates the trip details save button after saving.
// Expects the button element and display text.
// Prevents duplicate save clicks on this page.
function setTripDetailsSavedState(button, text) {
  if (!button) {
    return;
  }

  button.textContent = "\u2665 Saved to My Trips";
  button.classList.add("saved-button");
  button.disabled = true;
}

// Shows save feedback on the trip details page.
// Expects a message string.
// Writes visible feedback below the action area.
function showTripSaveFeedback(message) {
  const feedback = document.getElementById("trip-save-feedback");

  if (feedback) {
    feedback.textContent = message;
    feedback.classList.add("save-feedback--visible");
  }
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

// Connects the save modal close button and backdrop behavior.
// Expects the modal and close button to exist on the page.
// Adds event listeners without saving any trip data.
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

// Builds the visible tag list for a trip.
// Expects one trip object.
// Returns regular tags plus Kosher-friendly when relevant.
function getTripTags(trip) {
  return trip.kosherFriendly ? trip.tags.concat("Kosher-friendly") : trip.tags;
}

// Converts a list of tag or interest names into badge markup.
// Expects an array of strings.
// Returns HTML for styled badge spans.
function renderBadgeList(items) {
  return items.map(function (item) {
    return '<span class="tag">' + item + '</span>';
  }).join("");
}
