/*=========================================
  INDEXES
=========================================*/

-- Admin Users
CREATE UNIQUE INDEX idx_admin_users_username
ON admin_users(username);

CREATE INDEX idx_admin_users_status
ON admin_users(status);

------------------------------------------------

-- Users
CREATE UNIQUE INDEX idx_users_username
ON users(username);

CREATE UNIQUE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_users_status
ON users(status);

------------------------------------------------

-- Temple Settings
CREATE INDEX idx_temple_settings_name
ON temple_settings(temple_name);

------------------------------------------------

-- Gallery
CREATE INDEX idx_gallery_status
ON gallery(status);

CREATE INDEX idx_gallery_category
ON gallery(category);

CREATE INDEX idx_gallery_created_on
ON gallery(created_on);

------------------------------------------------

-- Event Master
CREATE INDEX idx_event_date
ON event_master(event_date);

CREATE INDEX idx_event_status
ON event_master(status);

------------------------------------------------

-- Daily Aarti
CREATE INDEX idx_aarti_display_order
ON daily_aarti(display_order);

CREATE INDEX idx_aarti_status
ON daily_aarti(status);

------------------------------------------------

-- Temple Services
CREATE INDEX idx_service_display_order
ON temple_services(display_order);

CREATE INDEX idx_service_status
ON temple_services(status);

------------------------------------------------

-- News
CREATE INDEX idx_news_date
ON news_master(news_date);

CREATE INDEX idx_news_status
ON news_master(status);