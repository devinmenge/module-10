-- view all departments --
SELECT id AS department_id, name AS department_name
FROM department;

-- view all roles --
SELECT r.id AS role_id, r.title AS job_title, d.name AS department_name, r.salary
FROM role r
JOIN department d ON r.department_id = d.id;

-- view all employees -- 
SELECT e.id AS employee_id, e.first_name, e.last_name, r.title AS job_title, 
       d.name AS department_name, r.salary, 
       CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;

-- add a department --
INSERT INTO department (name)
VALUES ('Department Name');  -- Replace 'Department Name' with user input

-- add a role --
INSERT INTO role (title, salary, department_id)
VALUES ('Role Title', 50000, 1);  -- Replace 'Role Title' and values with user input

-- add an employee --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('First Name', 'Last Name', 1, NULL);  -- Replace with user input for names, role_id, and manager_id

-- update an employee's role --
UPDATE employee
SET role_id = 2  -- Replace with the selected new role_id
WHERE id = 1;    -- Replace with the selected employee_id

