/*=========================================
  STORED PROCEDURES
=========================================*/

------------------------------------------------
-- Gallery Count
------------------------------------------------

CREATE OR REPLACE PROCEDURE sp_gallery_count
(
    INOUT total_count INTEGER
)
LANGUAGE plpgsql
AS
$$
BEGIN

    SELECT COUNT(*)
    INTO total_count
    FROM gallery
    WHERE status = TRUE;

END;
$$;

------------------------------------------------
-- Event Count
------------------------------------------------

CREATE OR REPLACE PROCEDURE sp_event_count
(
    INOUT total_count INTEGER
)
LANGUAGE plpgsql
AS
$$
BEGIN

    SELECT COUNT(*)
    INTO total_count
    FROM event_master
    WHERE status = TRUE;

END;
$$;

------------------------------------------------
-- Temple Services Count
------------------------------------------------

CREATE OR REPLACE PROCEDURE sp_service_count
(
    INOUT total_count INTEGER
)
LANGUAGE plpgsql
AS
$$
BEGIN

    SELECT COUNT(*)
    INTO total_count
    FROM temple_services
    WHERE status = TRUE;

END;
$$;

------------------------------------------------
-- Daily Aarti Count
------------------------------------------------

CREATE OR REPLACE PROCEDURE sp_aarti_count
(
    INOUT total_count INTEGER
)
LANGUAGE plpgsql
AS
$$
BEGIN

    SELECT COUNT(*)
    INTO total_count
    FROM daily_aarti
    WHERE status = TRUE;

END;
$$;