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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});