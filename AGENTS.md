# AGENTS.md

## Project Identity

This repository is for a university web course project called **Personalized Trip Planner**.

Personalized Trip Planner is an English-language web application that recommends personalized trip packages based on user preferences. Users can browse as guests, fill in travel preferences, receive recommended trip packages, view detailed itineraries, read reviews, and interact with trip cards.

Guests may receive recommendations and view trip details, but they cannot save trips to **My Trips** unless they log in or sign up.

## Current Phase

This project is currently in the **frontend/client-side only** phase.

Use only:

- HTML
- CSS
- Vanilla JavaScript
- `localStorage`
- Local trip data
- Local images inside the project

Do not use frameworks or external UI libraries unless the user explicitly requests them later.

Do not use:

- React
- Vue
- Angular
- TypeScript
- Tailwind
- Bootstrap
- External UI libraries
- A real backend
- A real database
- Scraping
- External image URLs for the final project

## Do Not Build Prematurely

If this file is the only requested deliverable, do not create website files yet.

Do not create HTML, CSS, JavaScript, image, backend, database, or dependency files unless the user explicitly asks for an implementation step.

## Main Product Flow

The intended product flow is:

1. The user lands on the Home page.
2. The Home page presents this message:
   **"Your next trip starts with your preferences. Let's build it around you."**
3. The main CTA button says:
   **"Start Planning"**
4. The CTA leads to the Preferences page.
5. The user enters trip preferences.
6. The app validates the inputs.
7. The app generates recommendations from local trip data.
8. The user can open a trip details page.
9. The user can try to save a trip.
10. If the user is a guest, a modal asks them to log in or sign up.
11. If the user is logged in, saved trips are stored in `localStorage` and displayed in My Trips.

## Future Phase Context

Later phases may include:

- Node.js
- Express.js
- MySQL
- Server-side processing
- Real database records
- Possible enrichment from a Tripadvisor scraper or API

These are not part of the current frontend build unless explicitly requested.

## Required Pages

The website should eventually include these pages.

### `index.html`

Purpose: Landing page and first entry point.

Expected content:

- Hero section
- Project message
- **Start Planning** CTA
- Feature highlights
- Navigation

### `login.html`

Purpose: Login form for existing users.

Expected behavior:

- Email validation
- Password validation
- Simple frontend login state stored in `localStorage`

### `signup.html`

Purpose: Registration form for new users.

Expected fields:

- First name
- Last name
- Email
- Password
- Password confirmation

Expected behavior:

- Validate all fields
- Confirm password match
- Store simple user/login state in `localStorage`

### `profile.html`

Purpose: Frontend-only demo profile page for logged-in users.

Expected behavior:

- Show a guest state when the user is not logged in
- Allow logged-in users to edit first name and email
- Validate required first name and valid email
- Store updated demo profile data in `localStorage` under `currentUser`
- Do not store passwords

### `preferences.html`

Purpose: Main Plan a Trip page with the preferences form and matching trip packages.

Expected inputs:

- Trip type
- Budget
- Duration in days
- Number of travelers
- Interests
- Optional kosher-friendly preference/tag

Expected content and behavior:

- Filters
- Trip cards
- Tags
- Estimated price
- Duration
- Rating
- Save buttons
- Loading state while recommendations are generated

### `trip-details.html`

Purpose: Display a detailed trip package.

Expected content and behavior:

- Images
- Itinerary
- Estimated cost
- Tags
- Rating
- Reviews
- Save action

### `my-trips.html`

Purpose: Display trips saved by the logged-in user.

Expected behavior:

- Read saved trips from `localStorage`
- Show an empty state if no trips are saved
- Allow basic saved-trip interactions when requested

## Contact Information

Do not create a separate Contact page.

Contact information should appear as a static footer section on every page.

The footer may include:

- Email
- Phone

## Recommended Folder Structure

Use this structure unless there is a strong reason not to:

```text
personalized-trip-planner/
├── AGENTS.md
├── README.md
├── index.html
├── pages/
│   ├── login.html
│   ├── signup.html
│   ├── profile.html
│   ├── preferences.html
│   ├── trip-details.html
│   └── my-trips.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── data.js
│   ├── validation.js
│   ├── storage.js
│   ├── profile.js
│   ├── recommendations.js
│   └── tripDetails.js
└── assets/
    └── images/
        └── trips/
```

`index.html` is the Home page. Supporting website pages are stored inside the `pages/` folder.

## Trip Data Requirements

When the website is built, use 20 local trip packages in a JavaScript data file.

Each trip package must represent a full trip package, not just a city.

Example package names:

- Romantic Escape in Paris
- Family Adventure in Orlando
- Urban Food Weekend in Tokyo
- Nature and History Trip in Greece

Each trip object should eventually include:

- `id`
- `title`
- `city`
- `country`
- `tripType`
- `tags`
- `interests`
- `estimatedPrice`
- `durationDays`
- `recommendedGroupSize`
- `kosherFriendly`
- `rating`
- `reviewCount`
- `image`
- `shortDescription`
- `itinerary`
- `reviews`

## Image Rules

Use local images stored in:

```text
assets/images/trips/
```

Do not rely on external image URLs for the final frontend project.

If real images are not available yet, use meaningful placeholder file names such as:

- `paris-romantic-escape.jpg`
- `orlando-family-adventure.jpg`
- `tokyo-food-weekend.jpg`
- `greece-nature-history.jpg`

## Coding Style Rules

Write clean, readable, beginner-friendly code suitable for a university web course.

Follow these rules:

- Prefer simple and explicit logic over over-engineered solutions.
- Use meaningful file names, function names, class names, and variable names.
- Use kebab-case for HTML and CSS file names.
- Use camelCase for JavaScript variables and functions.
- Keep HTML semantic where possible.
- Keep CSS organized by sections.
- Keep JavaScript modular by responsibility.
- Avoid duplicated logic.
- Avoid inline JavaScript in HTML.
- Avoid inline CSS unless absolutely necessary.
- Use external CSS files.
- Use external JavaScript files.
- Add comments only where they explain meaningful logic.
- Do not add unnecessary comments for obvious lines.

## JavaScript Function Documentation

Before every important JavaScript function, add a short comment explaining:

1. What the function does.
2. What inputs it expects, if any.
3. What output or side effect it produces.

Use this style:

```javascript
// Validates the signup form fields before allowing submission.
// Expects values from the signup form inputs.
// Shows error messages and returns true only when the form is valid.
function validateSignupForm() {
  // Implementation goes here.
}
```

## Validation Rules

Forms must include client-side validation.

Validation should be specific and useful. Include rules such as:

- Required fields cannot be empty.
- Email must have a valid format.
- Password must meet minimum length requirements.
- Password confirmation must match password.
- Budget must be a positive number.
- Duration must be a positive integer.
- Number of travelers must be a positive integer.
- Review text cannot be empty if submitting a review.
- Rating must be selected before submitting a review.

## User Feedback Rules

Provide clear feedback for user actions.

Use:

- Error messages near the relevant fields
- Success messages when appropriate
- Inline messages
- Modals
- Visible UI feedback
- Loading states when recommendations are being generated

Avoid using `alert()` for main user interactions.

## Guest vs Logged-In Behavior

For the frontend-only app:

- Store a simple login state in `localStorage`.
- A guest can browse, fill preferences, and view recommendations.
- A guest cannot save trips.
- If a guest clicks **Save**, show a modal with this message:
  **"Want to save this trip? Create an account or log in to keep it in My Trips."**
- The modal must include:
  - Log In button
  - Sign Up button
  - Close button
- A logged-in user can save trips.
- Saved trips should be stored in `localStorage`.

## UI and UX Direction

The interface should feel:

- Modern
- Clean
- Trustworthy
- Travel-oriented
- Friendly
- Easy to understand

Use Tripadvisor only as product inspiration for a travel-planning landing page. Suitable inspiration includes:

- Clear hero section
- Strong travel CTA
- Cards
- Categories
- Simple navigation

Do not copy Tripadvisor's exact design, branding, layout, images, text, or assets.

Preferred visual direction:

- Large hero section
- Clear CTA button
- Card-based recommendation layout
- Destination/trip images
- Small tags on cards
- Clean white background
- Blue and green accent colors
- Smooth hover effects
- Responsive grid

Suggested colors:

- Primary blue: `#2980B9`
- Accent green: `#27AE60`
- Background: `#FDFEFE`
- Text dark: `#1F2933`
- Muted text: `#6B7280`
- Light border/background: `#E5E7EB`

Typography:

- Use a clean sans-serif font.
- Prefer a system font stack.
- Use Open Sans only if it is added through a simple, course-appropriate approach.
- Keep typography consistent across all pages.

## Responsive Design

The site must be responsive.

Use:

- Flexbox
- CSS Grid
- Media queries

Target layouts:

- Desktop: full navigation and multi-column cards.
- Tablet: adjusted grid and comfortable spacing.
- Mobile: stacked layout, readable text, accessible buttons, and compact navigation.

## Animation and Interaction Requirements

Include at least one meaningful CSS animation or transition when the site is built.

Good examples:

- Button hover transitions
- Card hover elevation
- Modal fade-in
- Loading spinner for recommendations
- Smooth visual feedback on save buttons

## Accessibility and Usability

Follow basic accessibility and usability practices:

- Use alt text for images.
- Use labels for form fields.
- Use buttons for actions.
- Use links for navigation.
- Keep contrast readable.
- Make forms easy to understand.
- Avoid tiny clickable elements.
- Ensure keyboard-friendly basic navigation where possible.

## Course Requirements Awareness

The project must satisfy a client-side web project phase with:

- Multiple linked HTML pages
- Shared header/navigation/footer
- CSS styling
- Responsive design
- At least one animation
- External JavaScript files
- At least two `eventListener` functions
- Forms with validation
- Dynamic client-side behavior
- Clear and consistent UI/UX

## Development Workflow Rules

When implementing future tasks:

1. Do not change unrelated files.
2. Do not rewrite the whole project unless explicitly asked.
3. Explain what files were created or changed.
4. Keep each implementation step small and testable.
5. After each major step, mention how to run or test it in the browser.
6. Preserve existing naming conventions and structure.
7. Do not introduce dependencies unless explicitly requested.
8. Keep code understandable for students who need to explain it in a project defense.

## Git and Commit Guidance

Use clear commit messages when relevant.

Examples:

- Add initial frontend structure
- Add shared navigation and footer
- Add trip preferences form
- Add trip data
- Add recommendations rendering
- Add localStorage saved trips flow
- Add responsive styling

## Implementation Boundaries for Future Agents

Future agents should treat this document as the source of project direction.

Before making changes:

- Read the existing files first.
- Keep edits focused on the user's current request.
- Avoid introducing dependencies.
- Avoid changing the planned architecture without a clear reason.
- Prefer local, beginner-friendly solutions.
- Preserve the frontend-only phase unless the user explicitly starts a backend phase.

When uncertain, choose the simpler solution that satisfies the course requirements and is easy to explain.
