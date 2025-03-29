-- Define ENUM for account_type
CREATE TYPE public.account_type AS ENUM ('Admin', 'Client', 'Employee');

-- Table structure for table `classification`
CREATE TABLE IF NOT EXISTS public.classification (
    classification_id SERIAL PRIMARY KEY, -- Auto-incrementing unique identifier
    classification_name VARCHAR(100) NOT NULL UNIQUE -- Unique classification name
);

-- Table structure for table `inventory`
CREATE TABLE IF NOT EXISTS public.inventory (
    inv_id SERIAL PRIMARY KEY, -- Auto-incrementing unique identifier
    inv_make VARCHAR(100) NOT NULL, -- Manufacturer of the vehicle
    inv_model VARCHAR(100) NOT NULL, -- Model of the vehicle
    inv_year CHAR(4) NOT NULL, -- Year of manufacture (fixed-length)
    inv_description TEXT NOT NULL, -- Description of the vehicle
    inv_image VARCHAR(255) NOT NULL, -- Path to the vehicle image
    inv_thumbnail VARCHAR(255) NOT NULL, -- Path to the vehicle thumbnail
    inv_price NUMERIC(10, 2) NOT NULL, -- Price with precision and scale
    inv_miles INTEGER NOT NULL, -- Vehicle mileage
    inv_color VARCHAR(50) NOT NULL, -- Vehicle color
    classification_id INTEGER NOT NULL, -- Foreign key to classification
    CONSTRAINT fk_classification FOREIGN KEY (classification_id) REFERENCES public.classification (classification_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Table structure for table `account`
CREATE TABLE IF NOT EXISTS public.account (
    account_id SERIAL PRIMARY KEY, -- Auto-incrementing unique identifier
    account_firstname VARCHAR(100) NOT NULL, -- First name of the account holder
    account_lastname VARCHAR(100) NOT NULL, -- Last name of the account holder
    account_email VARCHAR(255) NOT NULL UNIQUE, -- Unique email address
    account_password TEXT NOT NULL, -- Store hashed passwords securely
    account_type public.account_type NOT NULL DEFAULT 'Client' -- Role of the account
);

-- Data for table `classification`
INSERT INTO public.classification (classification_name)
VALUES ('Custom'), ('Sport'), ('SUV'), ('Truck'), ('Sedan')
ON CONFLICT DO NOTHING; -- Avoid duplicates if data already exists
