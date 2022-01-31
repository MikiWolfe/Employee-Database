DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department(
    id INT NOT NULL,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30),
    department VARCHAR(30),
    salary DECIMAL
    );

CREATE TABLE employee(
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    title VARCHAR(30),
    department VARCHAR(30),
    salary DECIMAL,
    manager VARCHAR(30)
);


