CREATE USER emar_user WITH PASSWORD 'fu67Shhhh4';
CREATE DATABASE emar_db OWNER emar_user;

GRANT ALL PRIVILEGES ON DATABASE emar_db TO emar_user;

\c emar_db

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    role_id UUID REFERENCES roles(id)
);

CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    role_id UUID REFERENCES roles(id),
    UNIQUE(user_id, role_id)
);

INSERT INTO roles (name) VALUES ('Admin'), ('User');
INSERT INTO users (email, password, is_enabled, role_id) VALUES ('admin@example.com', 'hashedpassword123', true, (SELECT id FROM roles WHERE name='Admin'));
