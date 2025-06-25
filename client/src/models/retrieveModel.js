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
