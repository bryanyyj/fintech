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

export const updateProfile = (profile, callback) =>
{
    const SQLSTATEMENT = `
        UPDATE user_financial_profiles
        SET
            monthly_income = ?,
            age_group = ?,
            occupation = ?,
            num_dependents = ?,
            city = ?,
            rent_mortgage = ?,
            utilities = ?,
            insurance = ?,
            loan_payments = ?,
            other_fixed = ?,
            total_fixed = ?,
            disposable_income = ?,
            spend_food = ?,
            spend_transport = ?,
            spend_entertainment = ?,
            spend_shopping = ?,
            spend_travel = ?,
            spend_health = ?,
            spend_education = ?,
            rank_food = ?,
            rank_transport = ?,
            rank_entertainment = ?,
            rank_shopping = ?,
            rank_travel = ?,
            rank_health = ?,
            rank_education = ?,
            goal_type = ?,
            target_amount = ?,
            timeline_months = ?,
            risk_tolerance = ?,
            current_savings = ?
        WHERE user_id = ?;

    `;

    const VALUES = [
        profile.monthly_income,
        profile.age_group,
        profile.occupation,
        profile.num_dependents,
        profile.city,
        profile.rent_mortgage,
        profile.utilities,
        profile.insurance,
        profile.loan_payments,
        profile.other_fixed,
        profile.total_fixed,
        profile.disposable_income,
        profile.spend_food,
        profile.spend_transport,
        profile.spend_entertainment,
        profile.spend_shopping,
        profile.spend_travel,
        profile.spend_health,
        profile.spend_education,
        profile.rank_food,
        profile.rank_transport,
        profile.rank_entertainment,
        profile.rank_shopping,
        profile.rank_travel,
        profile.rank_health,
        profile.rank_education,
        profile.goal_type,
        profile.target_amount,
        profile.timeline_months,
        profile.risk_tolerance,
        profile.current_savings,
        profile.user_id // move to end
        ];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

export const getProfile = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT * FROM user_financial_profiles
        WHERE user_id = ?
    `;

    const VALUES = [data.userId]
    pool.query(SQLSTATEMENT, VALUES, callback);

}