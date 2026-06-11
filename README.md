# Personalized Trip Planner

Personalized Trip Planner is a full-stack web application for personalized trip recommendations. Users can sign up, log in, enter trip preferences, receive matching trip packages, view trip details, save trips, manage saved trips, add reviews, and update their profile.

## Technologies

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- SQL Server
- Azure Data Studio
- `mssql` npm package

## Course Note

The course examples used MySQL, but this project uses SQL Server because the development environment is Azure Data Studio. SQL scripts and server queries are therefore written with SQL Server syntax.

## Folder Structure

- `assets/` - Local image assets, including trip images and background images.
- `css/` - Shared stylesheet for all pages.
- `js/` - Frontend JavaScript for validation, recommendations, trip details, profile, storage helpers, and My Trips.
- `pages/` - Internal HTML pages such as login, signup, preferences, trip details, profile, and My Trips.
- `db/` - Database scripts, including schema, seed data, and image path fixes.
- `server/` - Express server, database connection helper, and database configuration example.

## Database

Database name:

```text
personalized_trip_planner
```

Tables:

- `users` - Stores user account details, including name, email, password, and creation date.
- `trips` - Stores trip packages, destination information, prices, duration, group size, descriptions, and image paths.
- `interests` - Stores available trip interest names.
- `trip_interests` - Connects trips to their related interests.
- `itinerary_days` - Stores day-by-day itinerary details for each trip.
- `saved_trips` - Stores trips saved by users, including status and saved date.
- `reviews` - Stores user reviews for trips, including rating, comment, and creation date.

## Main Features

- User signup
- User login
- Trip search based on preferences
- Trip details page
- Save trip
- My Trips page
- Update saved trip status
- Remove saved trip
- Add trip review
- User profile update
- Password update
- Trip images displayed from local assets

## Main API Routes

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Trips

- `POST /api/trips/search`
- `GET /api/trips/:id`
- `POST /api/trips/:tripId/reviews`

### Saved Trips

- `POST /api/saved-trips`
- `GET /api/users/:userId/saved-trips`
- `PUT /api/saved-trips/:savedId/status`
- `DELETE /api/saved-trips/:savedId`

### Users/Profile

- `GET /api/users/:userId`
- `PUT /api/users/:userId/profile`
- `PUT /api/users/:userId/password`

### Testing

- `GET /api/test`
- `GET /api/db-test`

## How to Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create `server/db.config.js` based on `server/db.config.example.js`.

3. Make sure SQL Server is running and available from Azure Data Studio.

4. Create the database using:

```text
db/schema.sql
```

5. Insert seed data using:

```text
db/seed.sql
```

6. If needed, run the image path fix script after seed data:

```text
db/fix_image_paths.sql
```

7. Start the server:

```bash
npm run dev
```

or:

```bash
npm start
```

8. Open the app:

```text
http://localhost:3000
```

## Environment and Security Notes

- `server/db.config.js` contains local database credentials and is ignored by Git.
- Passwords are stored as plain text only for this course project.
- In a real system, passwords should be hashed using a secure method such as bcrypt.
- `currentUser` is stored in `localStorage` for course-demo simplicity.
- In a production system, authentication should use secure sessions or tokens.

## Known Limitations

- Password hashing was not implemented because it was outside the current course scope.
- Review editing and deleting are not implemented.
- Users can write only one review per trip.
- Users can save each trip only once.
- Some image fallback logic exists as safety in case an image file is missing.

## Suggested Demo Flow

1. Sign up or log in.
2. Go to Plan a Trip.
3. Fill trip preferences.
4. View recommendations.
5. Open Trip Details.
6. Save a trip.
7. Go to My Trips.
8. Change trip status.
9. Remove or re-save a trip.
10. Add a review.
11. Update profile details.
12. Change password.

## Testing Examples

Test that the Express server is running:

```bash
curl http://localhost:3000/api/test
```

Test the database connection:

```bash
curl http://localhost:3000/api/db-test
```

Get one user:

```bash
curl http://localhost:3000/api/users/4
```

Get one trip:

```bash
curl http://localhost:3000/api/trips/0
```

Get saved trips for a user:

```bash
curl http://localhost:3000/api/users/4/saved-trips
```
