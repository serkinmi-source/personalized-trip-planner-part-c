-- Fix trip image paths to match the files that exist in assets/images/trips.
-- Run this against the current Personalized Trip Planner database in Azure Data Studio.

UPDATE trips
SET image_path = 'images/trips/paris-romantic-escape.jpg'
WHERE LOWER(city) = 'paris' OR LOWER(title) LIKE '%paris%' OR LOWER(slug) LIKE '%paris%';

UPDATE trips
SET image_path = 'images/trips/orlando-family-adventure.jpg'
WHERE LOWER(city) = 'orlando' OR LOWER(title) LIKE '%orlando%' OR LOWER(slug) LIKE '%orlando%';

UPDATE trips
SET image_path = 'images/trips/tokyo-food-weekend.jpg'
WHERE LOWER(city) = 'tokyo' OR LOWER(title) LIKE '%tokyo%' OR LOWER(slug) LIKE '%tokyo%';

UPDATE trips
SET image_path = 'images/trips/athens-nature-history.jpg'
WHERE LOWER(city) = 'athens' OR LOWER(title) LIKE '%greece%' OR LOWER(title) LIKE '%athens%' OR LOWER(slug) LIKE '%athens%' OR LOWER(slug) LIKE '%greece%';

UPDATE trips
SET image_path = 'images/trips/barcelona-culture-beach.jpg'
WHERE LOWER(city) = 'barcelona' OR LOWER(title) LIKE '%barcelona%' OR LOWER(slug) LIKE '%barcelona%';

UPDATE trips
SET image_path = 'images/trips/new-york-urban-discovery.jpg'
WHERE LOWER(city) IN ('new york', 'new york city') OR LOWER(title) LIKE '%new york%' OR LOWER(slug) LIKE '%new-york%';

UPDATE trips
SET image_path = 'images/trips/bangkok-family-culture.jpg'
WHERE LOWER(city) = 'bangkok' OR LOWER(title) LIKE '%bangkok%' OR LOWER(slug) LIKE '%bangkok%';

UPDATE trips
SET image_path = 'images/trips/rome-history-romance.jpg'
WHERE LOWER(city) = 'rome' OR LOWER(title) LIKE '%rome%' OR LOWER(slug) LIKE '%rome%';

UPDATE trips
SET image_path = 'images/trips/amsterdam-canal-weekend.jpg'
WHERE LOWER(city) = 'amsterdam' OR LOWER(title) LIKE '%amsterdam%' OR LOWER(slug) LIKE '%amsterdam%';

UPDATE trips
SET image_path = 'images/trips/dubai-family-luxury.jpg'
WHERE LOWER(city) = 'dubai' OR LOWER(title) LIKE '%dubai%' OR LOWER(slug) LIKE '%dubai%';

UPDATE trips
SET image_path = 'images/trips/prague-history-weekend.jpg'
WHERE LOWER(city) = 'prague' OR LOWER(title) LIKE '%prague%' OR LOWER(slug) LIKE '%prague%';

UPDATE trips
SET image_path = 'images/trips/lisbon-coastal-culture.jpg'
WHERE LOWER(city) = 'lisbon' OR LOWER(title) LIKE '%lisbon%' OR LOWER(slug) LIKE '%lisbon%';

UPDATE trips
SET image_path = 'images/trips/cape-town-adventure.jpg'
WHERE LOWER(city) = 'cape town' OR LOWER(title) LIKE '%cape town%' OR LOWER(slug) LIKE '%cape-town%';

UPDATE trips
SET image_path = 'images/trips/queenstown-outdoor-adventure.jpg'
WHERE LOWER(city) = 'queenstown' OR LOWER(title) LIKE '%queenstown%' OR LOWER(slug) LIKE '%queenstown%';

UPDATE trips
SET image_path = 'images/trips/kyoto-culture-retreat.jpg'
WHERE LOWER(city) = 'kyoto' OR LOWER(title) LIKE '%kyoto%' OR LOWER(slug) LIKE '%kyoto%';

UPDATE trips
SET image_path = 'images/trips/reykjavik-northern-adventure.jpg'
WHERE LOWER(city) = 'reykjavik' OR LOWER(title) LIKE '%reykjavik%' OR LOWER(slug) LIKE '%reykjavik%';

UPDATE trips
SET image_path = 'images/trips/london-family-icons.jpg'
WHERE LOWER(city) = 'london' OR LOWER(title) LIKE '%london%' OR LOWER(slug) LIKE '%london%';

UPDATE trips
SET image_path = 'images/trips/vancouver-nature-city.jpg'
WHERE LOWER(city) = 'vancouver' OR LOWER(title) LIKE '%vancouver%' OR LOWER(slug) LIKE '%vancouver%';

UPDATE trips
SET image_path = 'images/trips/buenos-aires-culture-nightlife.jpg'
WHERE LOWER(city) = 'buenos aires' OR LOWER(title) LIKE '%buenos aires%' OR LOWER(slug) LIKE '%buenos-aires%';

UPDATE trips
SET image_path = 'images/trips/singapore-family-city.jpg'
WHERE LOWER(city) = 'singapore' OR LOWER(title) LIKE '%singapore%' OR LOWER(slug) LIKE '%singapore%';

UPDATE trips
SET image_path = 'images/trips/vienna.jpg'
WHERE LOWER(city) = 'vienna' OR LOWER(title) LIKE '%vienna%' OR LOWER(slug) LIKE '%vienna%';

UPDATE trips
SET image_path = 'images/trips/berlin.jpg'
WHERE LOWER(city) = 'berlin' OR LOWER(title) LIKE '%berlin%' OR LOWER(slug) LIKE '%berlin%';

UPDATE trips
SET image_path = 'images/trips/budapest.jpg'
WHERE LOWER(city) = 'budapest' OR LOWER(title) LIKE '%budapest%' OR LOWER(slug) LIKE '%budapest%';

UPDATE trips
SET image_path = 'images/trips/zurich.jpg'
WHERE LOWER(city) = 'zurich' OR LOWER(title) LIKE '%zurich%' OR LOWER(slug) LIKE '%zurich%';

UPDATE trips
SET image_path = 'images/trips/interlaken.jpg'
WHERE LOWER(city) = 'interlaken' OR LOWER(title) LIKE '%interlaken%' OR LOWER(slug) LIKE '%interlaken%';

UPDATE trips
SET image_path = 'images/trips/miami.jpg'
WHERE LOWER(city) = 'miami' OR LOWER(title) LIKE '%miami%' OR LOWER(slug) LIKE '%miami%';

UPDATE trips
SET image_path = 'images/trips/istanbul.jpg'
WHERE trip_id = 13
    OR LOWER(city) = 'istanbul'
    OR LOWER(title) LIKE '%istanbul%'
    OR LOWER(slug) = 'istanbul-culture-food'
    OR LOWER(slug) LIKE '%istanbul%';

SELECT trip_id, slug, title, city, image_path
FROM trips
ORDER BY trip_id;
