CREATE TABLE IF NOT EXISTS admin_users
(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    username VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    full_name VARCHAR(100),

    email VARCHAR(150) UNIQUE,

    role VARCHAR(20) NOT NULL DEFAULT 'Admin',

    status BOOLEAN NOT NULL DEFAULT TRUE,

    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS users
(
    user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    full_name VARCHAR(100) NOT NULL,

    username VARCHAR(50) NOT NULL UNIQUE,

    email VARCHAR(100) UNIQUE,

    password VARCHAR(255) NOT NULL,

    mobile_no VARCHAR(15),

    role VARCHAR(20) NOT NULL DEFAULT 'User',

    status BOOLEAN NOT NULL DEFAULT TRUE,

    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modified_on TIMESTAMP
);
CREATE TABLE IF NOT EXISTS temple_settings
(
    setting_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    temple_name VARCHAR(200) NOT NULL,

    temple_logo VARCHAR(255),

    temple_banner VARCHAR(255),

    about_temple TEXT,

    address TEXT,

    city VARCHAR(100),

    state VARCHAR(100),

    pincode VARCHAR(10),

    mobile_no VARCHAR(15),

    whatsapp_no VARCHAR(15),

    email VARCHAR(100),

    website VARCHAR(200),

    facebook_url VARCHAR(255),

    instagram_url VARCHAR(255),

    youtube_url VARCHAR(255),

    google_map TEXT,

    live_darshan_url TEXT,

    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modified_on TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery
(
    gallery_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    title VARCHAR(200),

    description TEXT,

    image_url VARCHAR(500),

    category VARCHAR(100),

    status BOOLEAN NOT NULL DEFAULT TRUE,

    created_by INTEGER,

    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modified_on TIMESTAMP
);

CREATE TABLE IF NOT EXISTS event_master
(
    event_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    title VARCHAR(200) NOT NULL,

    description TEXT,

    event_date DATE,

    event_time TIME,

    location VARCHAR(250),

    image_url VARCHAR(500),

    status BOOLEAN NOT NULL DEFAULT TRUE,

    created_by INTEGER,

    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modified_on TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_aarti
(
    aarti_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    aarti_name VARCHAR(100) NOT NULL,

    aarti_time VARCHAR(50) NOT NULL,

    description TEXT,

    display_order INTEGER DEFAULT 1,

    image_url VARCHAR(500),

    status BOOLEAN NOT NULL DEFAULT TRUE,

    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modified_on TIMESTAMP
);

CREATE TABLE IF NOT EXISTS temple_services
(
    service_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    service_name VARCHAR(150) NOT NULL,

    description TEXT,

    image_url VARCHAR(300),

    display_order INTEGER DEFAULT 1,

    status BOOLEAN NOT NULL DEFAULT TRUE,

    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modified_on TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news_master
(
    news_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    title VARCHAR(200) NOT NULL,

    description TEXT,

    news_date DATE NOT NULL,

    image_url VARCHAR(255),

    status BOOLEAN NOT NULL DEFAULT TRUE,

    created_by INTEGER,

    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modified_on TIMESTAMP
);