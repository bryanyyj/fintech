import pool from '../services/db.js';

export const insertProfileData = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO user_financial_profiles (
            user_id, monthly_income, age_group, occupation, num_dependents, city,
            rent_mortgage, utilities, insurance, loan_payments, other_fixed,
            total_fixed, disposable_income,
            spend_food, spend_transport, spend_entertainment,
            spend_shopping, spend_travel, spend_health, spend_education,
            rank_food, rank_transport, rank_entertainment,
            rank_shopping, rank_travel, rank_health, rank_education,
            goal_type, target_amount, timeline_months, risk_tolerance, current_savings
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const VALUES = Object.values(data);
    pool.query(SQLSTATEMENT, VALUES, callback);

}
