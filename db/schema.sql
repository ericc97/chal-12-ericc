DROP TABLE IF EXISTS departments; 
DROP TABLE IF EXISTS roles; 
DROP TABLE IF EXISTS employees; 

CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE 
);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    manager_id INTEGER,
    CONSTRAINT sr_fk_emp_man FOREIGN KEY (manager_id) REFERENCES employees(id) on DELETE SET NULL
);