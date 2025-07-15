BEGIN;

INSERT INTO users (firstname, lastname, avatar, email, password)
VALUES 
('David', 'DUFOUR', 0, 'david.dufour@example.com', 'password123');

COMMIT;
