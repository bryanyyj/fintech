import pool from '../services/db.js';

export const getUserById = (userId, callback) => {
  const SQL = 'SELECT * FROM User WHERE user_id = ?';
  pool.query(SQL, [userId], callback);
}; 