-- Create database
CREATE DATABASE IF NOT EXISTS university_db;
USE university_db;

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);