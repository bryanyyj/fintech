import pool from '../services/db.js';

export const getTransactions = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT * FROM transactions
        WHERE user_id = ?;
    `;
    
    const VALUES = [data.userId]
    pool.query(SQLSTATEMENT, VALUES, callback);
}


export const insertBudget = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO budgets (user_id, year, month, budget_amount, type)
    VALUES (?, ?, ?, ?,?);
    `;
    const VALUES = [data.userId, data.year, data.month, data.budget_amount, data.type];

    pool.query(SQLSTATMENT, VALUES, callback);
}


export const insertTransaction = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO transactions (user_id, amount, category, description, transaction_date)
    VALUES (?, ?, ?, ?, ?);
    `;
    const VALUES = [data.userId, data.amount, data.category, data.description, data.transaction_date];

    pool.query(SQLSTATMENT, VALUES, callback);
}
