const mysql = require("mysql2");
const db = require("./db/connection");
const inquirer = require("inquirer");
const cyan = "\x1b[36m";
// const magenta = "\x1b[35m";
// const green = "\x1b[32m";

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

        case "Update an employee":
          updateEmployee();
          break;

        case "I would like to go home":
          break;
      }
    });
}
askFirstQuestion();

async function viewDepartments() {
  const department = await db.query("SELECT * FROM department");
  console.table(department);
  askFirstQuestion();
}

async function viewRoles() {
  const role = await db.query("SELECT * FROM role");
  console.table(role);
  askFirstQuestion();
}

async function viewEmployees() {
  // Joined the  role and employees tables 
  const employee = await db.query("SELECT employee.*, role.title, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id");
  console.table(employee);
  askFirstQuestion();
}

async function addDepartment() {
  const departmentAnswers = await
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter in a title for the department:",
        name: "name",

      },
    ])
    .then(async function(data) {
      console.log(data);
       let departmentName = data.name
      const departmentQuery = await db.query('INSERT INTO department SET ?', {
       name: departmentName
      })  
    })

  askFirstQuestion();
}

async function addRole() {
  
  const department = await db.query("SELECT * FROM department");
  const roleChoices = department.map((department) => {
    return {
        value : department.id,
        name : department.name
    };
  });

  const answersRole = await inquirer.prompt([
    {
      type: "list",
      name: "department_id",
      message: "Choose a department:",
      choices: roleChoices,
    },
    {
            type: "input",
            message: "Enter the title of the role",
            name: "title",
          },
          {
            type: "input",
            message: "Enter the salary for the role",
            name: "salary",
          }
  ])

  .then(async function(data) {
    let {department_id, title, salary} = data
    console.log(data);
    const roleQuery = await db.query('INSERT INTO role SET ?', {
    department_id: data.department_id,
     title: data.title,
     salary: data.salary
    })  
  })

  askFirstQuestion();
}
async function addEmployee() {
  const roles = await db.query("SELECT * FROM department");
  const choices = roles.map((role) => {
    return {
        value : role.id,
        name : role.name
    };
  });
  const answersRole = await inquirer.prompt([
    {
      type: "list",
      name: "role_id",
      message: "Choose a role:",
      choices: choices,
    },
  ])

  const employeesAnswers = await 
   inquirer
   .prompt([
    {
      type: "input",
      message: "Enter the employee's first name",
      name: "first_name",
      
    },
    {
      type: "input",
      message: "Enter the employee's last name",
      name: "last_name",
     
    },
    {
      type: "input",
      message: "Enter the employee's role ID",
      name: "role_id",
     
    },
    {
      type: "input",
      message: "Enter their manager's ID",
      name: "mmanager_id",
    },
  ])
  .then(async function(data) {
    let {first_name, last_name, role_id, manager_id} = data
    const employeeQuery = await db.query('INSERT INTO employee SET ?', {
    first_name : data.first_name,
    last_name : data.last_name,
    role_id : data.role_id,
    manager_id : data.manager_id
    })  
  })
  askFirstQuestion()
}

// updating an EMPOLYEE TODO: fix this:
async function updateEmployee() {
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
  const responce = await inquirer.prompt([
    {
      type: "list",
      name: "employee.id",
      message: "Choose an employee's ID that you would like to update:",
      choices: choices,
    },
  ]);
  console.log(responce);
 // const insertResult = db.query( 'UPDATE INTO employees (id, name, ) VALUES (?, ?, ?, ?)'
  // [
  //  role.id,
  //  role.title,
  //  role.department_id,
  //  role.salary
  // // ]
  // )
  const respo = await db
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







