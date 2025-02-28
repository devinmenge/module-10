import inquirer from 'inquirer';
import pg from "pg";
const { Pool } = pg;

const db = new Pool({
    host: "localhost",
    user: "postgres",
    password: "password",
    database: "department_db",
    port: 5432
})

await db.connect();

function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: ('What would you like to do?'),
                name: 'Options',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
            },
        ])
        .then((response) => {

            // console.log(response)


            if(response.Options === "view all departments") {
                // send a query to the database
                // SELECT * FROM department;
                db.query("SELECT * FROM department;")
                .then((res) => {
                       // receive the res, extract the rows
                       const { rows } = res;
                        // print the rows in table form
                        console.table(rows);
                        init();

                    })
            }

            if(response.Options === "view all roles") {
                // send a query to the database
                // SELECT * FROM department;
                db.query("SELECT * FROM role;")
                .then((res) => {
                       // receive the res, extract the rows
                       const { rows } = res;
                        // print the rows in table form
                        console.table(rows)
                        init();
                    })
            }

            if(response.Options === "view all employees") {
                // send a query to the database
                // SELECT * FROM department;
                db.query("SELECT * FROM employee;")
                .then((res) => {
                       // receive the res, extract the rows
                       const { rows } = res;
                        // print the rows in table form
                        console.table(rows);
                        init();

                    })
            }

            if(response.Options === "add a department") {
                
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the name of the new department?",
                        name: "dept_name"
                    }
                ])
                .then(response => {
                    // const myquery = `INSERT INTO department (name) VALUES ('${response.dept_name}');`
                    // db.query(myquery)
                    db.query("INSERT INTO department (name) VALUES ($1)", [response.dept_name])
                    .then(res => {
                        console.log('Department has been added!');
                        init();

                    })
                })
            }

            if(response.Options === "add a role") {
                
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the name of the new role?",
                        name: "role_name"
                    },
                    {
                        type: "input",
                        message: "What is the salary of the new role?",
                        name: "salary"
                    },
                    {
                        type: "input",
                        message: "Which department is the role in? 1 for Engineering, 2 for Finance, 3 for Legal",
                        name: "department_id"
                    },
                ])
                .then(response => {
                    // const myquery = `INSERT INTO department (name) VALUES ('${response.dept_name}');`
                    // db.query(myquery)
                    db.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [response.role_name, response.salary, response.department_id])
                    .then(res => {
                        console.log('Role has been added!');
                        init();

                    })
                })
            }

            if(response.Options === "add an employee") {
                
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the first name of the new employee?",
                        name: "first_name"
                    },
                    {
                        type: "input",
                        message: "What is the last name of the new employee?",
                        name: "last_name"
                    },
                    {
                        type: "input",
                        message: "What role is the employee in? Check 'view all roles' for ids.",
                        name: "role_id"
                    },
                ])
                .then(response => {
                   
                    // const myquery = `INSERT INTO department (name) VALUES ('${response.dept_name}');`
                    // db.query(myquery)
                    db.query("INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)", [response.first_name, response.last_name, response.role_id])
                    .then(res => {
                        console.log('Employee has been added!');
                        init();

                    })
                })
            }
            
            if(response.Options === "update an employee role") {
                
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Which employee would you like to update",
                        name: "target_employee"
                    },
                    {
                        type: "input",
                        message: "What is the new role of the employee",
                        name: "target_role"
                    }
                ])
                .then(response => {
                    // const myquery = `INSERT INTO department (name) VALUES ('${response.dept_name}');`
                    // db.query(myquery)
                    db.query("UPDATE employee SET role_id = $1 WHERE id = $2;", [response.target_role, response.target_employee])
                    .then(res => {
                        console.log('Employee has been updated!');
                        init();

                    })
                })
            }

        })
}

init();