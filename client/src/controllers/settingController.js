import bcrypt from 'bcrypt';
import db from '../services/db.js'; // adjust path as needed

export const updatePassword = (req, res) => {
  const { user_id, currentPassword, newPassword } = req.body;

  if (!user_id || !currentPassword || !newPassword) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const getUserQuery = `SELECT password FROM user WHERE user_id = ?`;

  db.query(getUserQuery, [user_id], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });
    if (results.length === 0) return res.status(404).json({ error: "User not found." });

    const storedHash = results[0].password;
    const isMatch = await bcrypt.compare(currentPassword, storedHash);

    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect." });
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    const updateQuery = `UPDATE user SET password = ? WHERE user_id = ?`;
    db.query(updateQuery, [newHash, user_id], (err) => {
      if (err) return res.status(500).json({ error: "Password update failed." });
      res.status(200).json({ message: "Password updated successfully." });
    });
  });
};
