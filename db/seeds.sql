INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Lead Engineer', 120000, 2),
    ('Software Engineer', 80000, 2),
    ('Cook', 35000, 3),
    ('Lawyer', 150000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('Trent', 'Williams', 1, null),
    ('Jimmy', 'G', 2, 1),
    ('Trevor', 'Lawerence', 4, 2),
    ('Jim', 'Halpert', 1, 2),
    ('Tom', 'Holland', 5, null);