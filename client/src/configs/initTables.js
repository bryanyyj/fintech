import pool from '../services/db.js';

const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;

CREATE TABLE User (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  password TEXT
);
`

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully:", results);
  }
  process.exit();
});