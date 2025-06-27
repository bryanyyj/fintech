import pool from '../services/db.js';

const SQLSTATEMENT = `
DROP TABLE IF EXISTS user_financial_profiles;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS budget_tracking;
DROP TABLE IF EXISTS user_profile;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS User;

CREATE TABLE User (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  password TEXT
);

CREATE TABLE user_financial_profiles (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,

    monthly_income DECIMAL(10,2),
    age_group VARCHAR(10),
    occupation VARCHAR(100),
    num_dependents TINYINT,
    city VARCHAR(100),

    rent_mortgage DECIMAL(10,2),
    utilities DECIMAL(10,2),
    insurance DECIMAL(10,2),
    loan_payments DECIMAL(10,2),
    other_fixed DECIMAL(10,2),
    total_fixed DECIMAL(10,2), -- optional
    disposable_income DECIMAL(10,2), -- optional

    spend_food DECIMAL(10,2),
    spend_transport DECIMAL(10,2),
    spend_entertainment DECIMAL(10,2),
    spend_shopping DECIMAL(10,2),
    spend_travel DECIMAL(10,2),
    spend_health DECIMAL(10,2),
    spend_education DECIMAL(10,2),

    rank_food TINYINT,
    rank_transport TINYINT,
    rank_entertainment TINYINT,
    rank_shopping TINYINT,
    rank_travel TINYINT,
    rank_health TINYINT,
    rank_education TINYINT,

    goal_type VARCHAR(50),
    target_amount DECIMAL(10,2),
    timeline_months INT,
    risk_tolerance ENUM('Conservative', 'Moderate', 'Aggressive'),
    current_savings DECIMAL(10,2),

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id)

);

CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10,2) NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    transaction_date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE budgets (
    budget_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    year YEAR NOT NULL,
    month_num TINYINT NOT NULL,
    budget_amount DECIMAL(10,2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_user_month (user_id, year, month_num),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
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