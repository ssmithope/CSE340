-- Custom type for account_type
CREATE TYPE account_type AS ENUM ('Admin', 'Client', 'Employee');

-- Table structure for table `account`
CREATE TABLE IF NOT EXISTS public.account (
    account_id SERIAL PRIMARY KEY, -- Auto-incrementing unique ID
    account_firstname VARCHAR(100) NOT NULL, -- First name of the account holder
    account_lastname VARCHAR(100) NOT NULL, -- Last name of the account holder
    account_email VARCHAR(255) NOT NULL UNIQUE, -- Enforces unique email addresses
    account_password TEXT NOT NULL, -- Store hashed passwords; plaintext is not allowed
    account_type account_type NOT NULL DEFAULT 'Client', -- Role of the account (Client by default)
    CONSTRAINT account_pkey PRIMARY KEY (account_id)
);
