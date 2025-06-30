// controller/forgotPassword.js
import crypto from 'crypto';
import db from '../services/db.js';
import dotenv from 'dotenv';
dotenv.config();

import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const emailSender = (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const token = crypto.randomBytes(32).toString('hex');
  const resetLink = `http://localhost:5173/password?token=${token}`;

  // Save token + expiry in DB
  db.query(
    'UPDATE user SET reset_token = ?, token_expiry = NOW() + INTERVAL 1 HOUR WHERE email = ?',
    [token, email],
    (err, result) => {
      if (err || result.affectedRows === 0)
        return res.status(400).json({ error: 'User not found' });

      const msg = {
        to: email,
        from: process.env.SENDGRID_SENDER, // must match verified sender
        subject: 'Reset your SmartSpend password',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`,
      };

      sgMail
        .send(msg)
        .then(() => res.status(200).json({ message: 'Reset link sent' }))
        .catch((error) => {
          console.error('SendGrid error:', error);
          res.status(500).json({ error: 'Failed to send email' });
        });
    }
  );
};