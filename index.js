const mysql = require('mysql2');
const db = require('./db/connection');
const inquirer = require("inquirer");
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

// view all departments
db.query('SELECT * FROM department', (err, results) => {
  console.table(results)
  console.error(err)
});

// view all roles
db.query('SELECT * FROM role', (err, results) => {
  console.table(results)
  console.error(err)
});

// view all employees
db.query('SELECT * FROM employee', (err, results) => {
  console.table(results)
  console.error(err)
});

async function viewDepartments(){
  const departments = await db.query('SELECT * FROM department')
  console.table(departments)
};

async function viewRoles(){
  const roles = await db.query('SELECT * FROM role')
  console.table(roles)
}

async function  viewEmployees() {
  const employees = await db.query('SELECT * FROM employee') 
console.table(employees)
};

async function addRole() {

  const department = await db.query('SELECT * FROM department')
  const choices = departments.map( department => {
    return{
      name: department.name,
      value: departmentid
    }
  })
  }
  
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
    // .then((respose) => )
  }

// adding the DEPARTMENT
 function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter in a title for the department:",
      name: "department",
      validate: async (input) => {
        if (input == "" || (/[0-9]/g).test(input)) {
          return "Please enter a valid name";
        }
        return true;
      },
    },
  ]);
  
}

// adding a ROLE
async function addRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the title of the role",
      name: "title",
      validate: async (input) => {
        if (input == ""|| (/[0-9]/g).test(input)) {
          return "Please enter a valid name";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter the salary for the role",
      name: "salary",
      validate: async (input) => {
        if (input == "" 
        // || (/[0-9]/g).test(input)
        )
         {
          return "Please enter a valid number";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter the department the department the role falls under",
      name: "department",
      validate: async (input) => {
        if (input == ""|| (/[0-9]/g).test(input)) {
          return "Please enter a valid department";
        }
        return true;
      },
    },
  ]);
}

// // adding an EMPLOYEE
async function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the employee's first name",
      name: "firstName",
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
      name: "lastName",
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
      name: "role",
      validate: async (input) => {
        if (input == ""|| (/[0-9]/g).test(input)) {
          return "Please enter a valid role";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Enter the employee's manager",
      name: "managerName"
    },
  ]);
}
// updating an EMPOLYEE
async function updateEmployee() {
    inquirer.prompt([
      {
        type: "input",
        message: "Enter the employee's first name",
        name: "firstName",
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
        name: "lastName",
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
        name: "role",
        validate: async (input) => {
            if (input == ""|| (/[0-9]/g).test(input)) {
              return "Please enter a valid role";
            }
            return true;
          },
      },
      {
        type: "input",
        message: "Enter the employee's manager",
        name: "manager",
        validate: async (input) => {
            if (input == "") {
              return "Please enter a valid name";
            }
            return true;
          },
      },
    ]);
  }




