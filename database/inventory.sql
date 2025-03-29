-- Table structure for table `inventory`
CREATE TABLE IF NOT EXISTS public.inventory (
    inv_id SERIAL PRIMARY KEY, -- Auto-incrementing unique identifier
    inv_make VARCHAR(50) NOT NULL, -- Manufacturer of the vehicle
    inv_model VARCHAR(50) NOT NULL, -- Model of the vehicle
    inv_year CHAR(4) NOT NULL CHECK (inv_year ~ '^[0-9]{4}$'), -- Year must be exactly 4 digits
    inv_description TEXT NOT NULL, -- Description of the vehicle
    inv_image VARCHAR(255) NOT NULL, -- Path to the vehicle image
    inv_thumbnail VARCHAR(255) NOT NULL, -- Path to the vehicle thumbnail
    inv_price NUMERIC(10, 2) NOT NULL, -- Price with up to 2 decimal places
    inv_miles INTEGER NOT NULL, -- Vehicle mileage
    inv_color VARCHAR(30) NOT NULL, -- Vehicle color
    classification_id INTEGER NOT NULL, -- Foreign key to classification
    CONSTRAINT fk_classification FOREIGN KEY (classification_id) REFERENCES public.classification (classification_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Create an index for classification_id
CREATE INDEX IF NOT EXISTS idx_classification_id ON public.inventory (classification_id);
