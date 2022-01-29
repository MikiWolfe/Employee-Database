const cyan = "\x1b[36m";
const magenta = "\x1b[35m";
const green = "\x1b[32m";

// present user with options

// view all departments READ - "SELECT * FROM [table_name]"

// View all roles

// view all employees READ - "SELECT * FROM [table_name]" <-- JOIN

// CREATE
// add a department "INSERT INTO [table_name] (col1, col2) VALUES (value1, value2)"

// add a role

// SELECT the existing roles out for the 'roles' table

// .map() the results for the 'roles' to question data for inquirer

// THEN prompt the user for role information (inquirer)

// Take the user's ansers and go INSERT them into the 'role' table

// add an employee

// update an employee UPDATE

// 1) step one work on inquierer questions chain
const inquirer = require("inquirer");
const firstInput = [];
// inquirerQuestions = ;
function askFirstQuestion() {
  console.log(cyan, "Welcome! What would you like to do?");
  inquirer
    .prompt([
      {
        type: "list",
        name: "firstInput",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((data) => {
      statement = data.next;
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
      }
    });

  async function addDepartment() {
    inquirer.prompt([
      {
        type: "input",
        message: "Enter in a name for the department:",
        name: "department",
        validate: async (input) => {
          if (input == "") {
            return "Please choice must be valid";
          }
          return true;
        },
      },
    ]);
  };

  async function 
  // adding the DEPARTMENT
  //
  //     // adding a ROLE
  //     {
  //         type: "input",
  //         message: "Enter the name for the role",
  //         name: "roleName"
  //     },
  //     {
  //         type: "input",
  //         message: "Enter the salary for the role",
  //         name: "roleSalary"
  //     },
  //     {
  //         type: "input",
  //         message: "Enter the department for the role",
  //         name: "roleDepartment"
  //     },
  // // adding an EMPLOYEE
  //     {
  //         type: "input",
  //         message: "Enter the employee's first name",
  //         name: "firstEmployee"
  //     },
  //     {
  //         type: "input",
  //         message: "Enter the employee's last name",
  //         name: "lastEmployee"
  //     },
  //     {
  //         type: "input",
  //         message: "Enter the employee's role",
  //         name: "roleEmployee"
  //     },
  //     {
  //         type: "input",
  //         message: "Enter the employee's manager",
  //         name: "managerEmployee"
  //     },

  // ])
}
askFirstQuestion();
