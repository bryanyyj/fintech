import pool from '../services/db.js';

export const getTransactions = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT * FROM transactions
        WHERE user_id = ?;
    `;
    
    const VALUES = [data.userId]
    
    pool.query(SQLSTATEMENT, VALUES, (error, results, fields) => {
        callback(error, results, fields);
    });
}


export const insertBudget = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO budgets (user_id, year, month_num, budget_amount)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE budget_amount = VALUES(budget_amount);
    `;
    const VALUES = [data.userId, data.year, data.month_num, data.budget_amount];

    pool.query(SQLSTATEMENT, VALUES, callback);
}


export const insertTransaction = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO transactions (user_id, amount, category, description, transaction_date, type)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
    const VALUES = [data.userId, data.amount, data.category, data.description, data.transaction_date, data.type];
    
    pool.query(SQLSTATEMENT, VALUES, callback);
}

export const getFinancialWellness = (userId, callback) => {
    const SQLSTATEMENT = `
        SELECT score, feedback FROM user_financial_wellness WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1;
    `;
    pool.query(SQLSTATEMENT, [userId], callback);
};

export const setFinancialWellness = (userId, score, feedback, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO user_financial_wellness (user_id, score, feedback)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE score = VALUES(score), feedback = VALUES(feedback), updated_at = CURRENT_TIMESTAMP;
    `;
    pool.query(SQLSTATEMENT, [userId, score, feedback], callback);
};
