const mysql = require("mysql2");
const db = require("./db/connection");
const inquirer = require("inquirer");
const cyan = "\x1b[36m";

function mainMenu() {
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
          "Remove a department",
          "Remove a role",
          "Remove an employee",
          // "Update an employee",
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

        case "Remove a department":
          removeDept();
          break;

        case "Remove a role":
          removeRole();
          break;

        case "Remove an employee":
          removeEmployee();
          break;

        case "Update an employee":
          updateEmployee();
          break;

        case "I would like to go home":
          break;
      }
    });
}
mainMenu();

async function viewDepartments() {
  const department = await db.query("SELECT * FROM department");
  console.table(department);
  mainMenu();
}

async function viewRoles() {
  // Joined the role and department tables
  const role = await db.query(
    "SELECT role.*, department.name, department.id FROM role LEFT JOIN department ON role.department_id = department.id"
  );
  console.table(role);
  mainMenu();
}

async function viewEmployees() {
  // Joined the  role and employees tables
  const employee = await db.query(
    "SELECT employee.*, role.title, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id"
  );
  console.table(employee);
  mainMenu();
}

async function addDepartment() {
  const departmentAnswers = await inquirer
    .prompt([
      {
        type: "input",
        message: "Enter in a title for the department:",
        name: "name",
      },
    ])
    .then(async function (data) {
      let departmentName = data.name;
      const departmentAddQuery = await db.query(
        "INSERT INTO department SET ?",
        {
          name: departmentName,
        }
      );
    });

  mainMenu();
}

async function addRole() {
  const departments = await db.query("SELECT * FROM department");
  const departmentChoices = departments.map((department) => {
    return {
      value: department.id,
      name: department.name,
    };
  });

  const answersRole = await inquirer
    .prompt([
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
      },
    ])

    .then(async function (data) {
      let { department_id, title, salary } = data;
      const roleQuery = await db.query("INSERT INTO role SET ?", {
        department_id: data.department_id,
        title: data.title,
        salary: data.salary,
      });
    });

  mainMenu();
}

async function addEmployee() {
  const roles = await db.query("SELECT * FROM role");
  const roleCoices = roles.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });
  const managerAdd = await db.query("SELECT * FROM employee");
  const addManager = managerAdd.map((manager) => {
    return {
      name: manager.last_name,
      value: manager.id,
    };
  });
  const answersAddEmp = await inquirer
    .prompt([
      {
        type: "list",
        name: "title",
        message: "Choose a role:",
        choices: roleCoices,
      },
      {
        type: "input",
        message: "Enter the employee's first name:",
        name: "first_name",
      },
      {
        type: "input",
        message: "Enter the employee's last name:",
        name: "last_name",
      },
      {
        type: "list",
        message: "Choose a manager by last name:",
        name: "manager_id",
        choices: addManager,
      },
    ])
    .then(async function (data) {
      let { first_name, last_name, title, manager_id } = data;
      const employeeAddQuery = await db.query("INSERT INTO employee SET ?", {
        first_name: data.first_name,
        last_name: data.last_name,
        role_id: data.title,
        manager_id: data.manager_id,
      });
    });
  mainMenu();
}

async function removeDept() {
  const departmentDelete = await db.query("SELECT * FROM department");
  const departmentDeleteChoices = departmentDelete.map((departments) => {
    return {
      name: departments.name,
      value: departments.id,
    };
  });
  const deleteDept = await inquirer
    .prompt([
      {
        type: "list",
        name: "id",
        message: "Which department do you want to remove?",
        choices: departmentDeleteChoices,
      },
    ])
    .then(async function (data) {
      console.log(data);
      let { id } = data;
      const departmentDeleteQuery = await db.query(
        "DELETE FROM department WHERE ?",
        {
          id: data.id,
        }
      );
    });
  mainMenu();
}

async function removeRole() {
  const roleDelete = await db.query("SELECT * FROM role");
  const roleDeleteChoices = roleDelete.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });
  const deleteRole = await inquirer
    .prompt([
      {
        type: "list",
        name: "id",
        message: "Choose a role to remove:",
        choices: roleDeleteChoices,
      },
    ])
    .then(async function (data) {
      console.log(data);
      let { id } = data;
      const roleDeleteQuery = await db.query("DELETE FROM role WHERE ?", {
        id: data.id,
      });
    });
  mainMenu();
}

async function removeEmployee() {
  const employeeDelete = await db.query("SELECT * FROM employee");
  const employeeDeleteChoices = employeeDelete.map((employee) => {
    return {
      name: employee.id,
      value: employee.id,
    };
  });
  const deleteEmployee = await inquirer
    .prompt([
      {
        type: "list",
        name: "id",
        message: "Choose an employee by ID that you would like to remove:",
        choices: employeeDeleteChoices,
      },
    ])
    .then(async function (data) {
      console.log(data);
      let { id } = data;
      const employeeDeleteQuery = await db.query(
        "DELETE FROM employee WHERE ?",
        {
          id: data.id,
        }
      );
    });
  mainMenu();
}

// Tried and failed to get this function to work
async function updateEmployee() {
  const employeeUpdate = await db.query(
    "SELECT employee.*, role.title, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id"
  );
  const employeeChoices = employeeUpdate.map((employee) => {
    return {
      name: employee.id,
      value: employee.id,
    };
  });
  const managerUpdate = await db.query(
    "SELECT employee.*, role.title, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id"
  );
  const managerChoices = managerUpdate.map((manager) => {
    return {
      name: manager.last_name,
      value: manager.id,
    };
  });
  const roleUpdate = await db.query(
    "SELECT employee.*, role.title, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id"
  );
  const roleUpdateChoices = roleUpdate.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });
  const employeeUpdateResponse = await inquirer
    .prompt([
      {
        type: "list",
        name: "id",
        message: "Choose an employee by ID:",
        choices: employeeChoices,
      },
      {
        type: "list",
        name: "role_id",
        message: "Choose their role:",
        choices: roleUpdateChoices,
      },
      {
        type: "list",
        message: "Select a new manager by last name:",
        name: "manager_id",
        choices: managerChoices,
      },
    ])
    .then(async function (data) {
      let { id, manager_id, role_id } = data;
      console.log(data);
      const employeeUpdateQuery = await db.query(
        "UPDATE employee SET ? WHERE ? ",
        [
          {
            id: data.id,
          },
          {
            manager_id: data.manager_id,
          },
          {
            role_id: data.role_id,
          },
        ]
      );
    });
  mainMenu();
};


