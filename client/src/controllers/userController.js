import * as model from '../models/userModel.js';

export const getUserById = (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId parameter' });
  }
  model.getUserById(userId, (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(results[0]);
  });
}; 