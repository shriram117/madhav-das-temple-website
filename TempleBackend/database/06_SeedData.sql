/*=========================================
  SEED DATA
=========================================*/

------------------------------------------------
-- Default Admin User
------------------------------------------------

INSERT INTO admin_users
(
    username,
    password,
    full_name,
    email,
    role,
    status
)
VALUES
(
    'admin',
    'admin123',
    'Administrator',
    'admin@temple.com',
    'Admin',
    TRUE
);

------------------------------------------------
-- Default Temple Settings
------------------------------------------------

INSERT INTO temple_settings
(
    temple_name,
    about_temple,
    address,
    city,
    state,
    pincode,
    mobile_no,
    email
)
VALUES
(
    'Shri Madhav Das Ji Temple',
    'Welcome to Shri Madhav Das Ji Temple.',
    'Temple Address',
    'Jaipur',
    'Rajasthan',
    '303702',
    '9999999999',
    'info@temple.com'
);