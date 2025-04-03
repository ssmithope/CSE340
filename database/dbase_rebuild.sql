-- Create custom type for account status
CREATE TYPE public.account_type AS ENUM ('active', 'inactive', 'suspended');

-- Create classification table
CREATE TABLE IF NOT EXISTS public.classification (
    classification_id SERIAL PRIMARY KEY, -- Auto-incrementing unique identifier
    classification_name VARCHAR(100) NOT NULL UNIQUE -- Unique classification name
);

-- Populate classification table
INSERT INTO public.classification (classification_name)
VALUES ('Custom'), ('Sport'), ('SUV'), ('Truck'), ('Sedan')
ON CONFLICT DO NOTHING; -- Prevent duplicate entries

-- Create inventory table
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
    CONSTRAINT fk_classification FOREIGN KEY (classification_id)
        REFERENCES public.classification (classification_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Populate inventory table
INSERT INTO public.inventory (
    inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail,
    inv_price, inv_miles, inv_color, classification_id
)
VALUES 
('Chevy', 'Camaro', '2018', 'If you want to look cool...', '/images/vehicles/camaro.jpg', '/images/vehicles/camaro-tn.jpg', 25000.00, 101222, 'Silver', 2),
('GM', 'Hummer', '2016', 'Do you have 6 kids and like to go offroading?', '/images/vehicles/hummer.jpg', '/images/vehicles/hummer-tn.jpg', 58800.00, 56564, 'Yellow', 4)
ON CONFLICT DO NOTHING; -- Prevent duplicate entries

-- Create account table
CREATE TABLE IF NOT EXISTS public.account (
    account_id SERIAL PRIMARY KEY, -- Auto-incrementing unique identifier
    account_firstname VARCHAR(100) NOT NULL, -- First name of the account holder
    account_lastname VARCHAR(100) NOT NULL, -- Last name of the account holder
    account_email VARCHAR(255) NOT NULL UNIQUE, -- Unique email address
    account_password TEXT NOT NULL, -- Store hashed passwords securely
    account_type public.account_type NOT NULL DEFAULT 'active' -- Status of the account (default: active)
);

-- Populate account table
INSERT INTO public.account (
    account_firstname, account_lastname, account_email, account_password, account_type
)
VALUES
('Bruce', 'Wayne', 'bruce@wayneent.com', 'IamBatm@n', 'active')
ON CONFLICT DO NOTHING; -- Prevent duplicate entries

-- Update GM Hummer description
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Update image paths in the inventory table
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
