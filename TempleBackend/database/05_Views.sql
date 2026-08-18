/*=========================================
  VIEWS
=========================================*/

------------------------------------------------
-- Active Gallery
------------------------------------------------

CREATE OR REPLACE VIEW vw_active_gallery AS

SELECT
    gallery_id,
    title,
    description,
    image_url,
    category,
    created_on
FROM gallery
WHERE status = TRUE;

------------------------------------------------
-- Upcoming Events
------------------------------------------------

CREATE OR REPLACE VIEW vw_upcoming_events AS

SELECT
    event_id,
    title,
    description,
    event_date,
    event_time,
    location,
    image_url
FROM event_master
WHERE status = TRUE
ORDER BY event_date;

------------------------------------------------
-- Active Daily Aarti
------------------------------------------------

CREATE OR REPLACE VIEW vw_daily_aarti AS

SELECT
    aarti_id,
    aarti_name,
    aarti_time,
    description,
    display_order
FROM daily_aarti
WHERE status = TRUE
ORDER BY display_order;

------------------------------------------------
-- Active Temple Services
------------------------------------------------

CREATE OR REPLACE VIEW vw_temple_services AS

SELECT
    service_id,
    service_name,
    description,
    image_url,
    display_order
FROM temple_services
WHERE status = TRUE
ORDER BY display_order;

------------------------------------------------
-- Active News
------------------------------------------------

CREATE OR REPLACE VIEW vw_news AS

SELECT
    news_id,
    title,
    description,
    news_date,
    image_url
FROM news_master
WHERE status = TRUE
ORDER BY news_date DESC;