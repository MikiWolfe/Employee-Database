const mysql = require("mysql2");
const db = require("./db/connection");
const inquirer = require("inquirer");


const Department = require("./lib/Department");
const cyan = "\x1b[36m";
const magenta = "\x1b[35m";
const green = "\x1b[32m";

// view all employees READ - "SELECT * FROM [table_name]" <-- JOIN

// CREATE
// add a department "INSERT INTO [table_name] (col1, col2) VALUES (value1, value2)"

// SELECT the existing roles out for the 'roles' table

// .map() the results for the 'roles' to question data for inquirer

// THEN prompt the user for role information (inquirer)

// Take the user's ansers and go INSERT them into the 'role' table

// add an employee

// update an employee UPDATE

function askFirstQuestion() {
  console.log(cyan, "🚀 Hello! What would you like to do? 🚀");
  inquirer
    .prompt([
      {
        type: "list",
        name: "value",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "I would like to go home",
        ],
      },
    ])
    .then((data) => {
      statement = data.value;
      switch (statement) {
        case "View all departments":
          viewDepartments();
          break;

        case "View all roles":
          viewRoles();
          break;

        case "View all employees":
          viewEmployees();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Update an employee role":
          updateEmployee();
          break;

        case "I would like to go home":
          break;
      }
    });
}

askFirstQuestion();

async function viewDepartments() {
  const departments = await db.query("SELECT * FROM department");
  console.table(departments);
  askFirstQuestion();
}

async function viewRoles() {
  const roles = await db.query("SELECT * FROM role");
  console.table(roles);
  askFirstQuestion();
}

async function viewEmployees() {
  const employees = await db.query("SELECT * FROM employee");
  console.table(employees);
  askFirstQuestion();
}

async function addDepartment() {
  const departments = await db.query("SELECT * FROM department");

  const choices = departments.map((department) => {
    return {
      id: department.id,
      name: department.name,
    };
  });
  const answers = await inquirer
    .prompt([
      {
        type: "input",
        message: "Enter an ID for the department:",
        name: "id",
        validate: async (input) => {
          if (input == "") {
            return "Please enter a valid number";
          }
          return true;
        },
      },
      {
        type: "input",
        message: "Enter in a title for the department:",
        name: "name",
        validate: async (input) => {
          if (input == "" || /[0-9]/g.test(input)) {
            return "Please enter a valid name";
          }
          return true;
        },
      },
    ])
    .then((data) => {
      let { id, name } = data;
      console.log(data);
    });
  // const insertResult = db.query( 'INSERT INTO department (id, name) VALUES (?, ?)'
  // [
  //   department.id,
  //   department.name
  // ]
  // )

  askFirstQuestion();
}

async function addRole() {
  const roles = await db.query("SELECT * FROM role");
  const choices = roles.map((role) => {
    return {
      id: role.id,
      title: role.title,
      department_id: role.department_id,
      salary: role.salary,
    };
  });
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "department_id",
      message: "Choose a department to add the role to:",
      choices: choices,
    },
  ]);
  console.log(answers);
  // const insertResult = db.query( 'INSERT INTO roles (id, name, ) VALUES (?, ?, ?, ?)'
  // [
  //  role.id,
  //  role.title,
  //  role.department_id,
  //  role.salary
  // // ]
  // )

  askFirstQuestion();
}
async function addEmployee() {
  const employees = await db.query("SELECT * FROM employee");
  const choices = employees.map((employee) => {
    return {
      id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      role_id: employee.role_id,
      manager_id: employee.manager_id,
    };
  });

  inquirer.prompt([
    {
      type: "input",
      message: "Enter the employee's id number",
      name: "id",
      validate: async (input) => {
        if (input == "") {
          return "Please enter a valid number";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter the employee's first name",
      name: "first_name",
      validate: async (input) => {
        if (input == "") {
          return "Please enter a valid name";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter the employee's last name",
      name: "last_name",
      validate: async (input) => {
        if (input == "") {
          return "Please enter a valid name";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter the employee's role",
      name: "role_id",
      validate: async (input) => {
        if (input == "" || /[0-9]/g.test(input)) {
          return "Please enter a valid role";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter their manager's ID",
      name: "mmanager_id",
    },
  ]);
}

// updating an EMPOLYEE
async function updateEmployee() {
  const answers = await db
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the employee's id number",
      name: "id",
      validate: async (input) => {
        if (input == "") {
          return "Please enter a valid number";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter the employee's first name",
      name: "first_name",
      validate: async (input) => {
        if (input == "") {
          return "Please enter a valid name";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter the employee's last name",
      name: "last_name",
      validate: async (input) => {
        if (input == "") {
          return "Please enter a valid name";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter the employee's role",
      name: "role_id",
      validate: async (input) => {
        if (input == "" || /[0-9]/g.test(input)) {
          return "Please enter a valid role";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter the employee's manager",
      name: "mmanager_id",
    },
  ]);
}

// view all departments
// db.query('SELECT * FROM department', (err, results) => {
//   console.table(results)
//   console.error(err)
// });

// view all roles
// db.query('SELECT * FROM role', (err, results) => {
//   console.table(results)
//   console.error(err)
// });

// view all employees
// db.query('SELECT * FROM employee', (err, results) => {
//   console.table(results)
//   console.error(err)
// });

// adding a ROLE
// async function addRole() {
//   inquirer.prompt([
//     {
//       type: "input",
//       message: "Enter the title of the role",
//       name: "title",
//       validate: async (input) => {
//         if (input == ""|| (/[0-9]/g).test(input)) {
//           return "Please enter a valid name";
//         }
//         return true;
//       },
//     },
//     {
//       type: "input",
//       message: "Enter the salary for the role",
//       name: "salary",
//       validate: async (input) => {
//         if (input == ""
// || (/[0-9]/g).test(input)
//         )
//          {
//           return "Please enter a valid number";
//         }
//         return true;
//       },
//     },
//     {
//       type: "input",
//       message: "Enter the department the department the role falls under",
//       name: "department_id",
//       validate: async (input) => {
//         if (input == ""|| (/[0-9]/g).test(input)) {
//           return "Please enter a valid department";
//         }
//         return true;
//       },
//     },
//   ]);
// }
