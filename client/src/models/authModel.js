import pool from '../services/db.js';

export const selectEmail = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT * FROM User
        WHERE email = ?;
    `;
    
    const VALUES = [data.email]
    pool.query(SQLSTATEMENT, VALUES, callback);
}


export const checkEmailExist = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE email = ?;
    `;

    const VALUES = [data.email]
    pool.query(SQLSTATEMENT, VALUES, callback);
}

export const insertSingle = (data, callback) =>
{
    const SQLSTATEMENT = `
    INSERT INTO User (full_name, email, password)
    VALUES (?,?,?)
    `;

    const VALUES = [data.full_name, data.email, data.password]
    pool.query(SQLSTATEMENT, VALUES, callback);

}