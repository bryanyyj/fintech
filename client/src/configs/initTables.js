import pool from '../services/db.js';

const SQLSTATEMENT = `
DROP TABLE IF EXISTS User_Profile;
DROP TABLE IF EXISTS Budget_Tracking;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS categories;

CREATE TABLE User (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  password TEXT
);

CREATE TABLE User_Profile (
  user_id INT,
  monthly_income DECIMAL(10,2) NOT NULL,
  monthly_spending_total DECIMAL(10,2) NOT NULL,
  age_range VARCHAR(20) NOT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  category_name TEXT
);

CREATE TABLE Budget_Tracking (
  user_spending_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  amount_spent DECIMAL(10,2) NOT NULL,
  description TEXT,
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  month_year VARCHAR(7) GENERATED ALWAYS AS (DATE_FORMAT(date_created, '%Y-%m')) STORED,
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

INSERT INTO categories (category_name) VALUES
('Housing'),
('Food'),
('Transport'),
('Utilities'),
('Entertainment'),
('Others');
`

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully:", results);
  }
  process.exit();
});