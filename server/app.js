const express = require("express");
const path = require("path");
const cors = require("cors");
const { connectToDatabase } = require("./db");

const app = express();
const port = 3000;

// Allows the server to read JSON and form data from client requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allows frontend and backend communication during development
app.use(cors());

// Project root folder
const projectRoot = path.join(__dirname, "..");

// Serve static client-side folders
app.use("/assets", express.static(path.join(projectRoot, "assets")));
app.use("/css", express.static(path.join(projectRoot, "css")));
app.use("/js", express.static(path.join(projectRoot, "js")));
app.use("/pages", express.static(path.join(projectRoot, "pages")));

// Home page route
app.get("/", (req, res) => {
    res.sendFile(path.join(projectRoot, "index.html"));
});

// Simple API test route
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Express server is working"
    });
});

// Database connection test route
app.get("/api/db-test", async (req, res) => {
    try {
        const pool = await connectToDatabase();

        const result = await pool.request().query(`
            SELECT 
                DB_NAME() AS databaseName,
                COUNT(*) AS tripsCount
            FROM trips;
        `);

        res.json({
            success: true,
            message: "Connected to SQL Server successfully",
            database: result.recordset[0].databaseName,
            tripsCount: result.recordset[0].tripsCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error.message
        });
    }
});

// Get all trips from the database
app.get("/api/trips", async (req, res) => {
    try {
        const pool = await connectToDatabase();

        const result = await pool.request().query(`
            SELECT 
                trip_id,
                slug,
                title,
                city,
                country,
                trip_type,
                estimated_price,
                duration_days,
                recommended_group_size,
                kosher_friendly,
                short_description,
                image_path
            FROM trips
            ORDER BY trip_id;
        `);

        res.json({
            success: true,
            count: result.recordset.length,
            trips: result.recordset
        });
    } catch (error) {
        console.error("Error getting trips:", error.message);

        res.status(500).json({
            success: false,
            message: "Error getting trips from database",
            error: error.message
        });
    }
});

// Search trips by user preferences
app.post("/api/trips/search", async (req, res) => {
    try {
        const {
            tripType,
            budget,
            durationDays,
            kosherFriendly,
            interests
        } = req.body;

        // Server-side validations
        if (!tripType || !budget || !durationDays) {
            return res.status(400).json({
                success: false,
                message: "Trip type, budget, and duration are required"
            });
        }

        if (Number(budget) <= 0 || Number(durationDays) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Budget and duration must be positive numbers"
            });
        }

        const pool = await connectToDatabase();

        const request = pool.request();

        request.input("tripType", tripType);
        request.input("budget", Number(budget));
        request.input("durationDays", Number(durationDays));
        request.input("kosherFriendly", kosherFriendly === true || kosherFriendly === "true" ? 1 : 0);

        let query = `
            SELECT 
                t.trip_id,
                t.slug,
                t.title,
                t.city,
                t.country,
                t.trip_type,
                t.estimated_price,
                t.duration_days,
                t.recommended_group_size,
                t.kosher_friendly,
                t.short_description,
                t.image_path,
                ISNULL(AVG(CAST(r.rating AS FLOAT)), 0) AS average_rating,
                COUNT(r.review_id) AS review_count
            FROM trips t
            LEFT JOIN reviews r ON t.trip_id = r.trip_id
            WHERE 
                t.trip_type = @tripType
                AND t.estimated_price <= @budget
                AND t.duration_days <= @durationDays
        `;

        if (kosherFriendly === true || kosherFriendly === "true") {
            query += `
                AND t.kosher_friendly = @kosherFriendly
            `;
        }

        query += `
            GROUP BY
                t.trip_id,
                t.slug,
                t.title,
                t.city,
                t.country,
                t.trip_type,
                t.estimated_price,
                t.duration_days,
                t.recommended_group_size,
                t.kosher_friendly,
                t.short_description,
                t.image_path
        `;

        if (Array.isArray(interests) && interests.length > 0) {
            query += `
                ORDER BY
                    (
                        SELECT COUNT(*)
                        FROM trip_interests ti
                        JOIN interests i ON ti.interest_id = i.interest_id
                        WHERE ti.trip_id = t.trip_id
                        AND i.name IN (${interests.map((interest, index) => {
                            const paramName = `interest${index}`;
                            request.input(paramName, interest);
                            return `@${paramName}`;
                        }).join(", ")})
                    ) DESC,
                    average_rating DESC,
                    t.estimated_price ASC;
            `;
        } else {
            query += `
                ORDER BY
                    average_rating DESC,
                    t.estimated_price ASC;
            `;
        }

        const result = await request.query(query);

        res.json({
            success: true,
            count: result.recordset.length,
            trips: result.recordset
        });
    } catch (error) {
        console.error("Error searching trips:", error.message);

        res.status(500).json({
            success: false,
            message: "Error searching trips",
            error: error.message
        });
    }
});

// Creates a user account in the database for the course demo login flow
app.post("/api/auth/signup", async (req, res) => {
    try {
        const firstName = String(req.body.firstName || "").trim();
        const lastName = String(req.body.lastName || "").trim();
        const email = String(req.body.email || "").trim().toLowerCase();
        const password = String(req.body.password || "");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstName) {
            return res.status(400).json({
                success: false,
                message: "First name is required."
            });
        }

        if (!lastName) {
            return res.status(400).json({
                success: false,
                message: "Last name is required."
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required."
            });
        }

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid email address."
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters."
            });
        }

        const pool = await connectToDatabase();

        const existingUserResult = await pool.request()
            .input("email", email)
            .query(`
                SELECT user_id
                FROM users
                WHERE email = @email;
            `);

        if (existingUserResult.recordset.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered."
            });
        }

        const insertResult = await pool.request()
            .input("firstName", firstName)
            .input("lastName", lastName)
            .input("email", email)
            .input("password", password)
            .query(`
                INSERT INTO users (first_name, last_name, email, [password])
                OUTPUT INSERTED.user_id
                VALUES (@firstName, @lastName, @email, @password);
            `);

        res.json({
            success: true,
            message: "Account created successfully.",
            user: {
                userId: insertResult.recordset[0].user_id,
                firstName: firstName,
                lastName: lastName,
                email: email
            }
        });
    } catch (error) {
        console.error("Error creating account:", error.message);

        res.status(500).json({
            success: false,
            message: "Error creating account",
            error: error.message
        });
    }
});

// Logs in a user by checking the database email and plain-text demo password
app.post("/api/auth/login", async (req, res) => {
    try {
        const email = String(req.body.email || "").trim().toLowerCase();
        const password = String(req.body.password || "");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required."
            });
        }

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid email address."
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required."
            });
        }

        const pool = await connectToDatabase();

        const userResult = await pool.request()
            .input("email", email)
            .query(`
                SELECT
                    user_id,
                    first_name,
                    last_name,
                    email,
                    [password]
                FROM users
                WHERE email = @email;
            `);

        const user = userResult.recordset[0];

        if (!user || user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        res.json({
            success: true,
            message: "Login successful.",
            user: {
                userId: user.user_id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error logging in:", error.message);

        res.status(500).json({
            success: false,
            message: "Error logging in",
            error: error.message
        });
    }
});

// Get one trip with itinerary, interests, and reviews from the database
app.get("/api/trips/:id", async (req, res) => {
    try {
        const tripIdentifier = String(req.params.id || "").trim();
        const numericTripId = Number(tripIdentifier);
        const isNumericTripId = tripIdentifier !== "" && Number.isInteger(numericTripId);

        if (tripIdentifier === "") {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        const pool = await connectToDatabase();
        const tripRequest = pool.request();
        let tripWhereClause = "t.slug = @slug";

        if (isNumericTripId) {
            tripRequest.input("tripId", numericTripId);
            tripWhereClause = "t.trip_id = @tripId";
        } else {
            tripRequest.input("slug", tripIdentifier);
        }

        const tripResult = await tripRequest.query(`
            SELECT
                t.trip_id,
                t.slug,
                t.title,
                t.city,
                t.country,
                t.trip_type,
                t.estimated_price,
                t.duration_days,
                t.recommended_group_size,
                t.kosher_friendly,
                t.short_description,
                t.image_path,
                ISNULL(AVG(CAST(r.rating AS FLOAT)), 0) AS average_rating,
                COUNT(r.review_id) AS review_count
            FROM trips t
            LEFT JOIN reviews r ON t.trip_id = r.trip_id
            WHERE ${tripWhereClause}
            GROUP BY
                t.trip_id,
                t.slug,
                t.title,
                t.city,
                t.country,
                t.trip_type,
                t.estimated_price,
                t.duration_days,
                t.recommended_group_size,
                t.kosher_friendly,
                t.short_description,
                t.image_path;
        `);

        if (tripResult.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        const trip = tripResult.recordset[0];
        const actualTripId = trip.trip_id;

        const itineraryResult = await pool.request()
            .input("tripId", actualTripId)
            .query(`
                SELECT
                    day_number AS day,
                    title,
                    description
                FROM itinerary_days
                WHERE trip_id = @tripId
                ORDER BY day_number;
            `);

        const interestsResult = await pool.request()
            .input("tripId", actualTripId)
            .query(`
                SELECT i.name
                FROM trip_interests ti
                JOIN interests i ON ti.interest_id = i.interest_id
                WHERE ti.trip_id = @tripId
                ORDER BY i.name;
            `);

        const reviewsResult = await pool.request()
            .input("tripId", actualTripId)
            .query(`
                SELECT
                    r.review_id,
                    NULLIF(LTRIM(RTRIM(CONCAT(u.first_name, ' ', u.last_name))), '') AS [user],
                    r.rating,
                    r.comment AS [text],
                    r.created_at
                FROM reviews r
                LEFT JOIN users u ON r.user_id = u.user_id
                WHERE r.trip_id = @tripId
                ORDER BY r.created_at DESC;
            `);

        trip.interests = interestsResult.recordset.map(function (interest) {
            return interest.name;
        });
        trip.itinerary = itineraryResult.recordset;
        trip.reviews = reviewsResult.recordset;

        res.json({
            success: true,
            trip: trip
        });
    } catch (error) {
        console.error("Error getting trip details:", error.message);

        res.status(500).json({
            success: false,
            message: "Error getting trip details from database",
            error: error.message
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
