# Personalized Trip Planner

Personalized Trip Planner is a frontend-only university web course project. It is an English-language travel planning website that recommends trip packages based on user preferences.

Users can browse as guests, fill in trip preferences, view recommendation cards, open trip details, and try to save trips. Guests can view recommendations and details, but saving trips requires login or signup.

## Current Status

This project is currently a frontend-only travel planner built with:

- HTML
- CSS
- Vanilla JavaScript
- `sessionStorage`
- `localStorage`
- Local trip data
- Local image files

No backend, database, framework, or external UI library is used.

## Main Features

- Shared header, navigation, and footer across all pages.
- Responsive Home page with travel hero, feature cards, how-it-works section, and travel style cards.
- Login and signup forms with client-side validation.
- Frontend-only Profile page for editing demo user details in `localStorage`.
- Plan a Trip page with client-side validation and same-page trip matches.
- Preferences are stored temporarily in `sessionStorage` before rendering trip matches.
- Trip matches render from 20 local trip packages in `js/data.js`.
- Client-side matching for trip type, budget, duration, kosher-friendly trips, and interests.
- Trip details page renders dynamically by URL id, for example:
  `pages/trip-details.html?id=trip-paris-romantic`
- Frontend-only login state using `localStorage`.
- Logged-in users can save trips to My Trips.
- My Trips page renders saved trips and supports removing them.
- Local real image files are used for trip cards and hero backgrounds.

## Project Structure

```text
personalized-trip-planner/
|-- AGENTS.md
|-- README.md
|-- index.html
|-- pages/
|   |-- login.html
|   |-- signup.html
|   |-- profile.html
|   |-- preferences.html
|   |-- trip-details.html
|   `-- my-trips.html
|-- css/
|   `-- style.css
|-- js/
|   |-- main.js
|   |-- data.js
|   |-- validation.js
|   |-- storage.js
|   |-- profile.js
|   |-- recommendations.js
|   |-- tripDetails.js
|   `-- myTrips.js
`-- assets/
    `-- images/
        |-- IMAGE-CREDITS.md
        |-- backgrounds/
        `-- trips/
```

`index.html` is the Home page. Supporting website pages are inside the `pages/` folder.

## Pages

- `index.html` - Main Home page.
- `pages/preferences.html` - Trip preferences form with dynamic trip matches and filters.
- `pages/trip-details.html` - Dynamic trip details by query string id.
- `pages/login.html` - Login form.
- `pages/signup.html` - Signup form.
- `pages/profile.html` - Frontend-only demo profile editor for first name and email.
- `pages/my-trips.html` - Saved trips for logged-in users.

## JavaScript Files

- `js/main.js` - Shared UI behavior, mobile navigation, login greeting, and logout.
- `js/data.js` - Local data for 20 trip packages.
- `js/validation.js` - Login, signup, and preferences form validation.
- `js/storage.js` - Helper functions for login state and saved trips.
- `js/profile.js` - Frontend-only profile rendering and validation.
- `js/recommendations.js` - Recommendation filtering, rendering, and save behavior.
- `js/tripDetails.js` - Dynamic trip details rendering by URL id.
- `js/myTrips.js` - My Trips rendering and remove behavior.

## Local Storage and Session Storage

The project uses browser storage only for frontend behavior.

`sessionStorage`:

- `tripPreferences` - Temporary preferences used to initialize trip matches.

`localStorage`:

- `currentUser` - Login state. Passwords are not stored.
- `savedTrips` - Array of saved trip ids.

This is not real authentication.

## Images

Trip images are stored locally in:

```text
assets/images/trips/
```

Background images are stored locally in:

```text
assets/images/backgrounds/
```

Image documentation and credit tracking are in:

```text
assets/images/IMAGE-CREDITS.md
```

Do not use external image URLs in the final project.

## How to Run

This is a static frontend project. No installation is required.

Open this file in a browser:

```text
index.html
```

The Home page opens directly from `index.html`.

## Manual Test Flow

1. Open `index.html`.
2. Click **Start Planning**.
3. Fill valid preferences and submit.
4. Confirm trip matches render on the same Plan a Trip page.
5. Test filters and Clear Filters.
6. Click **View Details** on a trip card.
7. Confirm the correct trip details page loads.
8. Click **Save** as a guest and confirm the login/signup modal appears.
9. Create an account through `signup.html`.
10. Open Profile, edit the demo first name and email, and save.
11. Save a trip from Plan a Trip or Trip Details.
12. Open My Trips and confirm the saved trip appears.
13. Remove a saved trip.
14. Log out and confirm guest behavior returns.

## Course Requirements Covered

- Multiple linked HTML pages.
- Shared navigation and footer.
- External CSS file.
- External JavaScript files.
- Responsive design.
- CSS transitions and animations.
- Client-side form validation.
- Dynamic rendering from local data.
- At least two `addEventListener` interactions.
- Local browser storage for login and saved trips.
- Frontend-only profile editing for demo account data.
- Local images only.

## Future Development

Possible later phases may add:

- Real backend authentication.
- Node.js and Express.js.
- MySQL database storage.
- Server-side recommendation logic.
- Real review submission.
- Real image credit/license completion.
- API or scraper-based destination enrichment.

These are not part of the current frontend-only phase.
