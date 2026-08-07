/*=========================================
  FUNCTIONS
=========================================*/

------------------------------------------------
-- Active Gallery Count
------------------------------------------------

CREATE OR REPLACE FUNCTION fn_gallery_count()
RETURNS INTEGER
LANGUAGE plpgsql
AS
$$
DECLARE
    total INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO total
    FROM gallery
    WHERE status = TRUE;

    RETURN total;

END;
$$;

------------------------------------------------
-- Active Events Count
------------------------------------------------

CREATE OR REPLACE FUNCTION fn_event_count()
RETURNS INTEGER
LANGUAGE plpgsql
AS
$$
DECLARE
    total INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO total
    FROM event_master
    WHERE status = TRUE;

    RETURN total;

END;
$$;

------------------------------------------------
-- Active Temple Services Count
------------------------------------------------

CREATE OR REPLACE FUNCTION fn_service_count()
RETURNS INTEGER
LANGUAGE plpgsql
AS
$$
DECLARE
    total INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO total
    FROM temple_services
    WHERE status = TRUE;

    RETURN total;

END;
$$;