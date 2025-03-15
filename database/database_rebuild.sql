-- Create classification table
CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50)
);

-- Populate classification table
INSERT INTO classification (classification_name) VALUES
('Sport'),
('Luxury');

-- Create inventory table
CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    make VARCHAR(50),
    model VARCHAR(50),
    classification_id INT REFERENCES classification(classification_id),
    description TEXT,
    inv_image TEXT,
    inv_thumbnail TEXT
);

-- Populate inventory table
INSERT INTO inventory (make, model, classification_id, description, inv_image, inv_thumbnail)
VALUES 
('GM', 'Hummer', 1, 'small interiors', '/images/hummer.jpg', '/images/hummer-thumb.jpg'),
('Tesla', 'Model S', 2, 'luxury electric sedan', '/images/tesla-models.jpg', '/images/tesla-models-thumb.jpg');
