DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department(
    dept_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (dept_id)
);

CREATE TABLE role(
    role_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    dept_id INT,
    PRIMARY KEY (role_id),
    FOREIGN KEY (dept_id)
    REFERENCES department(dept_id)
    );

CREATE TABLE employee(
    employ_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    employ_role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (employ_id),
    FOREIGN KEY (employ_role_id) REFERENCES role(role_id),
    FOREIGN KEY (manager_id) REFERENCES employee(employ_id)
    );


