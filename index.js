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
          "Update an employee",
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
  // const role = await db.query("SELECT * FROM role")
  const role = await db.query("SELECT role.*, department.name, department.id FROM role LEFT JOIN department ON role.department_id = department.id");
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
      let departmentName = data.name
      const departmentQuery = await db.query('INSERT INTO department SET ?', {
       name: departmentName
      })  
    })

  askFirstQuestion();
}

async function addRole() {
  
  const departments = await db.query("SELECT * FROM department");
  const departmentChoices = departments.map((department) => {
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
      choices: departmentChoices,
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
    const roleQuery = await db.query('INSERT INTO role SET ?', {
    department_id: data.department_id,
    title: data.title,
    salary: data.salary
    })  
  })

  askFirstQuestion();
}

async function addEmployee() {
  const roles = await db.query("SELECT * FROM role");
  const roleCoices = roles.map((role) => {
    return {
      name : role.title,
      value : role.id
    };
  });
  const answersRole = await inquirer.prompt([
    {
      type: "list",
      name: "title",
      message: "Choose a role:",
      choices: roleCoices,
    },
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
      message: "Enter their manager's ID",
      name: "manager_id",
    },
  ])
  .then(async function(data) {
    console.log(data)
    let {first_name, last_name, title, manager_id} = data
    const employeeQuery = await db.query('INSERT INTO employee SET ?', {
    first_name : data.first_name,
    last_name : data.last_name,
    role_id : data.title,
    manager_id : data.manager_id
    })  
  })
  askFirstQuestion()
}

// updating an EMPOLYEE TODO: fix this:
async function updateEmployee() {
  
  const employeeUpdate = await db.query("SELECT * FROM employee");
  const employeeChoices = employeeUpdate.map((employee) => {
    return {
      name : employee.id,
      value: employee.id
    };
   });
  const roleUpdate = await db.query("SELECT * FROM role");
  const roleChoiceUpdate = roleUpdate.map((role) => {
    return { 
      name : role.title,
      value : role.id
    }
  });
  const managerUpdate = await db.query("SELECT * FROM employee");
  const managerChoices = managerUpdate.map((manager) => {
    return {
      name : manager.manager_id,
      value: manager.id
    };
   });
  const responce = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Choose an employee's ID that you would like to update:",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "role_id",
      message: "Choose a role for the employee",
      choices: roleChoiceUpdate,
    },
    {
      type: "input",
      message: "Enter the employee's first name",
      name: "first_name",
    },
    {
      type: "input",
      message: "Enter the employee's last name",
      name: "last_name"
    },
    {
      type: "list",
      name: "manager_id",
      message: "Select from manager IDs",
      choices: managerChoices
    },
  ])
  // const insertResult = db.query( 'UPDATE INTO employees (id, name, ) VALUES (?, ?, ?, ?)'
  .then(async function(data) {
  console.log(data)
  let {id, first_name, last_name, role_id, manager_id} = data
  // const employeeQuery = await db.query('UPDATE employee SET id, first_name, last_name, role_id, manager_id WHERE id, first_name, last_name, role_id, manager_id = ?,?, ?, ?, ?', {
  id: data.id,  
  first_name : data.first_name, 
  last_name : data.last_name,
  role_id : data.role_id,
  manager_id : data.manager_id
  })  
})
console.table(data)
askFirstQuestion()
}

// DELETE FROM employee WHERE id = 2;



