
import * as model from '../models/spendModel.js'

export const getTransactionData = (req, res, next) => {
    const data = {
        userId: req.query.userId
    };

    if (data.userId == undefined) {
        return res.status(404).json({message: "userId is undefined"})
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error fetching transaction data:", error);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No spending data found for user" });
        }

        return res.status(200).json(results);
    };

    model.getTransactions(data, callback);
};

export const postTransaction = (req, res, next) => {

    const data = {
        userId: req.query.userId,
        amount: req.body.amount,
        category: req.body.category,
        description: req.body.description,
        transaction_date: req.body.date
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error posting transaction data:", error);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(201).json(data);
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