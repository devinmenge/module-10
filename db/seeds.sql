-- Insert departments first
INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal');

-- Insert roles, referencing department_id instead of name
INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 80000, (SELECT id FROM department WHERE name = 'Engineering')),
       ('Account Manager', 60000, (SELECT id FROM department WHERE name = 'Finance')),
       ('Accountant', 55000, (SELECT id FROM department WHERE name = 'Finance')),
       ('Legal Team Lead', 95000, (SELECT id FROM department WHERE name = 'Legal')),
       ('Lawyer', 75000, (SELECT id FROM department WHERE name = 'Legal'));
