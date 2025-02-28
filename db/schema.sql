DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

\c department_db;

-- Create the department table first
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

-- Create the role table with a foreign key referencing department
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

-- Create the employee table with foreign keys referencing role and manager
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (role_id)
    REFERENCES role(id),
  FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);