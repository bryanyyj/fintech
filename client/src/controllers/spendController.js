import * as model from '../models/retrieveModel.js'

export const getSpendingData = (req, res, next) => {
    const data = {
        userId: req.body.userId
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error fetching spending data:", error);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No spending data found for user" });
        }

        const row = results[0]; // Assume most recent or only entry
        const spendingData = {
            spend_food: row.spend_food,
            spend_transport: row.spend_transport,
            spend_entertainment: row.spend_entertainment,
            spend_shopping: row.spend_shopping,
            spend_travel: row.spend_travel,
            spend_health: row.spend_health,
            spend_education: row.spend_education
        };

        return res.status(200).json(spendingData);
    };

    model.getSpending(data, callback);
};

export const postTransaction = (req, res, next) => {

    const data = {
        userId: req.body.userId,
        amount: req.body.amount,
        category_id: req.body.category_id,
        description: req.body.description,
        transaction_date: req.body.transaction_date
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error posting transaction data:", error);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(200).json();
    };

    model.insertTransaction(data, callback);
}

export const postBudget = (req, res, next) => {

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // JavaScript months are 0-based

    const data = {
        userId: req.body.userId,
        year: year,
        month_num: month,
        budget_amount: req.body.budget_amount
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error posting budget data:", error);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(200).json();
    };

    model.insertBudget(data, callback);
}