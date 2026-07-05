USE personalized_trip_planner;
GO

SET IDENTITY_INSERT dbo.interests ON;
GO

INSERT INTO dbo.interests (interest_id, name)
VALUES
(0, N'Cuisine'),
(1, N'Nature'),
(2, N'History'),
(3, N'Nightlife'),
(4, N'Relaxation'),
(5, N'Shopping'),
(6, N'Attractions'),
(7, N'Extreme sports');
GO

SET IDENTITY_INSERT dbo.interests OFF;
GO
-- Trips
SET IDENTITY_INSERT dbo.trips ON;
GO
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (0, N'paris-romantic-escape', N'Paris Romantic Escape', N'Paris', N'France', N'Romantic', 6200.00, 4, 2, 1, N'A romantic city escape with classic landmarks, cozy cafés, art, and evening walks along the Seine.', N'images/trips/paris-romantic-escape.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (1, N'rome-history-weekend', N'Rome History Weekend', N'Rome', N'Italy', N'Urban', 5200.00, 4, 2, 1, N'A historical urban trip through ancient ruins, piazzas, museums, and Italian food experiences.', N'images/trips/rome-history-romance.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (2, N'barcelona-family-fun', N'Barcelona Family Fun', N'Barcelona', N'Spain', N'Family', 5800.00, 4, 4, 1, N'A family-friendly trip with beaches, parks, architecture, shopping streets, and fun attractions.', N'images/trips/barcelona-culture-beach.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (3, N'amsterdam-urban-discovery', N'Amsterdam Urban Discovery', N'Amsterdam', N'Netherlands', N'Urban', 4900.00, 3, 2, 1, N'A relaxed urban discovery route with canals, museums, markets, cycling areas, and scenic neighborhoods.', N'images/trips/amsterdam-canal-weekend.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (4, N'prague-budget-charm', N'Prague Budget Charm', N'Prague', N'Czech Republic', N'Romantic', 3600.00, 3, 2, 0, N'A charming and affordable trip filled with old streets, castles, viewpoints, cafés, and local culture.', N'images/trips/prague-history-weekend.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (5, N'vienna-culture-family', N'Vienna Culture Family', N'Vienna', N'Austria', N'Family', 5400.00, 4, 4, 1, N'A cultural family route with palaces, parks, museums, concerts, and comfortable city walks.', N'images/trips/vienna.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (6, N'lisbon-coastal-escape', N'Lisbon Coastal Escape', N'Lisbon', N'Portugal', N'Urban', 4700.00, 4, 2, 0, N'A colorful coastal city trip with viewpoints, old neighborhoods, beaches nearby, and great food.', N'images/trips/lisbon-coastal-culture.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (7, N'berlin-nightlife-history', N'Berlin Nightlife and History', N'Berlin', N'Germany', N'Urban', 5100.00, 4, 2, 1, N'A dynamic urban trip combining modern culture, historical sites, street art, nightlife, and food markets.', N'images/trips/berlin.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (8, N'london-classic-family', N'London Classic Family', N'London', N'United Kingdom', N'Family', 7200.00, 5, 4, 1, N'A classic family trip with museums, parks, iconic landmarks, shopping, and easy public transportation.', N'images/trips/london-family-icons.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (9, N'budapest-spa-weekend', N'Budapest Spa Weekend', N'Budapest', N'Hungary', N'Romantic', 3900.00, 3, 2, 1, N'A relaxing weekend with thermal baths, river views, historic streets, markets, and evening cruises.', N'images/trips/budapest.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (10, N'zurich-nature-city', N'Zurich Nature and City', N'Zurich', N'Switzerland', N'Urban', 7600.00, 4, 2, 1, N'A clean and scenic city trip with lake views, mountain access, old town walks, and premium shopping.', N'images/trips/zurich.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (11, N'interlaken-adventure', N'Interlaken Adventure', N'Interlaken', N'Switzerland', N'Adventure', 8400.00, 5, 3, 0, N'An adventure-focused trip with mountains, lakes, hiking, viewpoints, and extreme sports options.', N'images/trips/interlaken.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (12, N'athens-history-islands', N'Athens History and Islands', N'Athens', N'Greece', N'Family', 5000.00, 5, 4, 0, N'A sunny family trip combining ancient history, city walks, local food, and a short island experience.', N'images/trips/athens-nature-history.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (13, N'istanbul-culture-food', N'Istanbul Culture and Food', N'Istanbul', N'Turkey', N'Urban', 4200.00, 4, 2, 1, N'A rich cultural route through markets, historic mosques, neighborhoods, food streets, and waterfronts.', N'images/trips/istanbul.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (14, N'dubai-family-attractions', N'Dubai Family Attractions', N'Dubai', N'United Arab Emirates', N'Family', 6800.00, 5, 4, 1, N'A modern family trip with theme parks, desert experiences, malls, beaches, and impressive city views.', N'images/trips/dubai-family-luxury.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (15, N'new-york-urban-energy', N'New York Urban Energy', N'New York', N'United States', N'Urban', 9300.00, 6, 2, 1, N'An energetic city trip with landmarks, shows, neighborhoods, museums, shopping, and food experiences.', N'images/trips/new-york-urban-discovery.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (16, N'miami-relaxation-beach', N'Miami Relaxation Beach', N'Miami', N'United States', N'Romantic', 8100.00, 5, 2, 1, N'A warm beach escape with ocean views, art districts, restaurants, nightlife, and relaxed sunny days.', N'images/trips/miami.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (17, N'tokyo-family-discovery', N'Tokyo Family Discovery', N'Tokyo', N'Japan', N'Family', 9800.00, 7, 4, 0, N'A unique family discovery route with technology, parks, temples, shopping districts, and food streets.', N'images/trips/tokyo-food-weekend.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (18, N'bangkok-budget-adventure', N'Bangkok Budget Adventure', N'Bangkok', N'Thailand', N'Adventure', 4300.00, 5, 3, 0, N'A budget-friendly adventure with temples, markets, boat rides, street food, and lively neighborhoods.', N'images/trips/bangkok-family-culture.jpg', '2026-06-10T17:23:21.4360658');
INSERT INTO dbo.trips     (trip_id, slug, title, city, country, trip_type, estimated_price,      duration_days, recommended_group_size, kosher_friendly,      short_description, image_path, created_at)     VALUES (19, N'cape-town-nature-adventure', N'Cape Town Nature Adventure', N'Cape Town', N'South Africa', N'Adventure', 7000.00, 6, 3, 0, N'An outdoor adventure route with mountains, beaches, viewpoints, wildlife experiences, and scenic drives.', N'images/trips/cape-town-adventure.jpg', '2026-06-10T17:23:21.4360658');
SET IDENTITY_INSERT dbo.trips OFF;
GO
-- Trip interests
INSERT INTO dbo.trip_interests (trip_id, interest_id)
VALUES
(0, 0),
(0, 2),
(0, 4),
(0, 5),

(1, 0),
(1, 2),
(1, 6),

(2, 0),
(2, 4),
(2, 5),
(2, 6),

(3, 2),
(3, 4),
(3, 5),
(3, 6),

(4, 0),
(4, 2),
(4, 6),

(5, 2),
(5, 4),
(5, 6),

(6, 0),
(6, 1),
(6, 3),
(6, 6),

(7, 0),
(7, 2),
(7, 3),
(7, 6),

(8, 0),
(8, 2),
(8, 5),
(8, 6),

(9, 0),
(9, 2),
(9, 3),
(9, 4),

(10, 1),
(10, 4),
(10, 5),

(11, 1),
(11, 6),
(11, 7),

(12, 0),
(12, 1),
(12, 2),
(12, 6),

(13, 0),
(13, 2),
(13, 5),
(13, 6),

(14, 4),
(14, 5),
(14, 6),
(14, 7),

(15, 0),
(15, 3),
(15, 5),
(15, 6),

(16, 0),
(16, 3),
(16, 4),
(16, 5),

(17, 0),
(17, 2),
(17, 5),
(17, 6),

(18, 0),
(18, 3),
(18, 6),
(18, 7),

(19, 1),
(19, 4),
(19, 6),
(19, 7);
GO
-- Itinerary days
SET IDENTITY_INSERT dbo.itinerary_days ON;
GO
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (0, 0, 1, N'Arrival and First Walk', N'Arrive in Paris, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (1, 0, 2, N'Main Attractions', N'Visit the most important attractions in Paris and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (2, 0, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (3, 0, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Paris.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (4, 1, 1, N'Arrival and First Walk', N'Arrive in Rome, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (5, 1, 2, N'Main Attractions', N'Visit the most important attractions in Rome and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (6, 1, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (7, 1, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Rome.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (8, 2, 1, N'Arrival and First Walk', N'Arrive in Barcelona, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (9, 2, 2, N'Main Attractions', N'Visit the most important attractions in Barcelona and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (10, 2, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (11, 2, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Barcelona.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (12, 3, 1, N'Arrival and First Walk', N'Arrive in Amsterdam, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (13, 3, 2, N'Main Attractions', N'Visit the most important attractions in Amsterdam and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (14, 3, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (15, 4, 1, N'Arrival and First Walk', N'Arrive in Prague, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (16, 4, 2, N'Main Attractions', N'Visit the most important attractions in Prague and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (17, 4, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (18, 5, 1, N'Arrival and First Walk', N'Arrive in Vienna, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (19, 5, 2, N'Main Attractions', N'Visit the most important attractions in Vienna and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (20, 5, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (21, 5, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Vienna.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (22, 6, 1, N'Arrival and First Walk', N'Arrive in Lisbon, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (23, 6, 2, N'Main Attractions', N'Visit the most important attractions in Lisbon and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (24, 6, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (25, 6, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Lisbon.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (26, 7, 1, N'Arrival and First Walk', N'Arrive in Berlin, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (27, 7, 2, N'Main Attractions', N'Visit the most important attractions in Berlin and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (28, 7, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (29, 7, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Berlin.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (30, 8, 1, N'Arrival and First Walk', N'Arrive in London, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (31, 8, 2, N'Main Attractions', N'Visit the most important attractions in London and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (32, 8, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (33, 8, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near London.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (34, 8, 5, N'Special Activity', N'Enjoy a special activity connected to the trip type: Family.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (35, 9, 1, N'Arrival and First Walk', N'Arrive in Budapest, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (36, 9, 2, N'Main Attractions', N'Visit the most important attractions in Budapest and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (37, 9, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (38, 10, 1, N'Arrival and First Walk', N'Arrive in Zurich, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (39, 10, 2, N'Main Attractions', N'Visit the most important attractions in Zurich and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (40, 10, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (41, 10, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Zurich.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (42, 11, 1, N'Arrival and First Walk', N'Arrive in Interlaken, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (43, 11, 2, N'Main Attractions', N'Visit the most important attractions in Interlaken and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (44, 11, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (45, 11, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Interlaken.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (46, 11, 5, N'Special Activity', N'Enjoy a special activity connected to the trip type: Adventure.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (47, 12, 1, N'Arrival and First Walk', N'Arrive in Athens, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (48, 12, 2, N'Main Attractions', N'Visit the most important attractions in Athens and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (49, 12, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (50, 12, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Athens.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (51, 12, 5, N'Special Activity', N'Enjoy a special activity connected to the trip type: Family.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (52, 13, 1, N'Arrival and First Walk', N'Arrive in Istanbul, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (53, 13, 2, N'Main Attractions', N'Visit the most important attractions in Istanbul and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (54, 13, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (55, 13, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Istanbul.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (56, 14, 1, N'Arrival and First Walk', N'Arrive in Dubai, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (57, 14, 2, N'Main Attractions', N'Visit the most important attractions in Dubai and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (58, 14, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (59, 14, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Dubai.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (60, 14, 5, N'Special Activity', N'Enjoy a special activity connected to the trip type: Family.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (61, 15, 1, N'Arrival and First Walk', N'Arrive in New York, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (62, 15, 2, N'Main Attractions', N'Visit the most important attractions in New York and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (63, 15, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (64, 15, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near New York.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (65, 15, 5, N'Special Activity', N'Enjoy a special activity connected to the trip type: Urban.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (66, 15, 6, N'Flexible Free Day', N'Use this day for shopping, optional attractions, or returning to favorite places in New York.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (67, 16, 1, N'Arrival and First Walk', N'Arrive in Miami, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (68, 16, 2, N'Main Attractions', N'Visit the most important attractions in Miami and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (69, 16, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (70, 16, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Miami.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (71, 16, 5, N'Special Activity', N'Enjoy a special activity connected to the trip type: Romantic.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (72, 17, 1, N'Arrival and First Walk', N'Arrive in Tokyo, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (73, 17, 2, N'Main Attractions', N'Visit the most important attractions in Tokyo and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (74, 17, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (75, 17, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Tokyo.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (76, 17, 5, N'Special Activity', N'Enjoy a special activity connected to the trip type: Family.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (77, 17, 6, N'Flexible Free Day', N'Use this day for shopping, optional attractions, or returning to favorite places in Tokyo.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (78, 17, 7, N'Departure', N'Enjoy a calm final morning in Tokyo, pack, and depart.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (79, 18, 1, N'Arrival and First Walk', N'Arrive in Bangkok, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (80, 18, 2, N'Main Attractions', N'Visit the most important attractions in Bangkok and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (81, 18, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (82, 18, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Bangkok.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (83, 18, 5, N'Special Activity', N'Enjoy a special activity connected to the trip type: Adventure.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (84, 19, 1, N'Arrival and First Walk', N'Arrive in Cape Town, check in, and take an easy first walk around the central area.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (85, 19, 2, N'Main Attractions', N'Visit the most important attractions in Cape Town and enjoy a structured day based on the trip style.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (86, 19, 3, N'Local Experience', N'Explore local neighborhoods, food spots, markets, and hidden corners that match the selected preferences.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (87, 19, 4, N'Nature or Relaxation Day', N'Add a slower day with parks, viewpoints, beaches, or relaxing activities near Cape Town.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (88, 19, 5, N'Special Activity', N'Enjoy a special activity connected to the trip type: Adventure.');
INSERT INTO dbo.itinerary_days     (day_id, trip_id, day_number, title, description)     VALUES (89, 19, 6, N'Flexible Free Day', N'Use this day for shopping, optional attractions, or returning to favorite places in Cape Town.');
SET IDENTITY_INSERT dbo.itinerary_days OFF;
GO
-- Users
SET IDENTITY_INSERT dbo.users ON;
GO

INSERT INTO dbo.users
    (user_id, first_name, last_name, email, password, created_at)
VALUES
    (0, N'Maya', N'Cohen', N'maya@example.com', N'123456', '2026-06-10T17:23:21.4038296'),
    (1, N'Daniel', N'Levi', N'daniel@example.com', N'123456', '2026-06-10T17:23:21.4038296'),
    (2, N'Noa', N'Avraham', N'noa@example.com', N'123456', '2026-06-10T17:23:21.4038296'),
    (3, N'Test', N'User', N'test.user.auth@example.com', N'123456', '2026-06-11T12:12:09.3161100'),
    (4, N'Michelle', N'Ser', N'michelleser@gmail.com', N'123456', '2026-06-11T12:18:27.8294375'),
    (1001, N'elana', N'ker', N'elana119@gmail.com', N'elana12390', '2026-07-05T09:05:53.6610548');
GO

SET IDENTITY_INSERT dbo.users OFF;
GO
-- Reviews
SET IDENTITY_INSERT dbo.reviews ON;
GO

INSERT INTO dbo.reviews
    (review_id, user_id, trip_id, rating, comment, created_at)
VALUES
    (0, 0, 0, 5, N'Beautiful route, very easy to follow and perfect for a first visit.', '2026-06-10T17:23:21.8515595'),
    (1, 1, 1, 4, N'Great balance between history, food, and walking time.', '2026-06-10T17:23:21.8615768'),
    (2, 2, 2, 5, N'Excellent for families. The plan felt organized and not too stressful.', '2026-06-10T17:23:21.8615768'),
    (3, 1, 11, 5, N'Amazing nature and adventure activities. Highly recommended.', '2026-06-10T17:23:21.8615768'),
    (4, 0, 15, 4, N'Fun city energy, lots of options, and good recommendations.', '2026-06-10T17:23:21.8615768'),
    (5, 4, 0, 5, N'Amazing romantic trip!', '2026-06-11T13:23:27.8533333'),
    (6, 4, 9, 4, N'the best trip ever!', '2026-06-11T15:33:02.6366667');
GO

SET IDENTITY_INSERT dbo.reviews OFF;
GO
-- Saved trips
SET IDENTITY_INSERT dbo.saved_trips ON;
GO

INSERT INTO dbo.saved_trips
    (saved_id, user_id, trip_id, status, saved_at)
VALUES
    (0, 0, 0, N'planned', '2026-06-10T17:23:21.8059902'),
    (1, 0, 1, N'favorite', '2026-06-10T17:23:21.8059902'),
    (2, 1, 2, N'visited', '2026-06-10T17:23:21.8107404'),
    (3, 2, 11, N'planned', '2026-06-10T17:23:21.8107404'),
    (6, 4, 0, N'favorite', '2026-06-11T13:53:53.9600000'),
    (7, 4, 9, N'visited', '2026-06-11T15:33:15.6866667'),
    (1001, 1001, 18, N'planned', '2026-07-05T09:09:04.9666667');
GO

SET IDENTITY_INSERT dbo.saved_trips OFF;
GO