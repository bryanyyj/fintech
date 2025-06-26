import pool from '../services/db.js';

export const getSpending = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT * FROM user_financial_profiles
        WHERE user_id = ?;
    `;
    
    const VALUES = [data.userId]
    pool.query(SQLSTATEMENT, VALUES, callback);
}

export const insertBudget = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO budgets (user_id, year, month, budget_amount)
    VALUES (?, ?, ?, ?);
    `;
    const VALUES = [data.userId, data.year, data.month, data.budget_amount];

    pool.query(SQLSTATMENT, VALUES, callback);
}


export const insertTransaction = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO budgets (user_id, amount, category_id, description, transaction_date)
    VALUES (?, ?, ?, ?, ?);
    `;
    const VALUES = [data.userId, data.amount, data.category_id, data.description, data.transaction_date];

    pool.query(SQLSTATMENT, VALUES, callback);
}
