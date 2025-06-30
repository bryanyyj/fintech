import * as model from '../models/spendModel.js'

export const getTransactionData = (req, res, next) => {
    const data = {
        userId: req.query.userId
    };
    if (!data.userId) {
        return res.status(404).json({message: "userId is undefined"});
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
    const month_num = now.getMonth() + 1; // JavaScript months are 0-based
    const data = {
        userId: req.body.userId,
        year: year,
        month_num: month_num,
        budget_amount: req.body.budget_amount
    };
    if (!data.userId || !data.budget_amount) {
        return res.status(400).json({ error: "Missing required budget fields." });
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error posting budget data:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Budget saved." });
    };
    model.insertBudget(data, callback);
};

export const getFinancialWellness = (req, res, next) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }
    model.getFinancialWellness(userId, (error, results) => {
        if (error) {
            console.error("Error fetching financial wellness score:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No score found for user" });
        }
        return res.status(200).json(results[0]);
    });
};

export const setFinancialWellness = (req, res, next) => {
    const { userId, score, feedback } = req.body;
    if (!userId || score === undefined || !feedback) {
        return res.status(400).json({ error: "userId, score, and feedback are required" });
    }
    model.setFinancialWellness(userId, score, feedback, (error, results) => {
        if (error) {
            console.error("Error saving financial wellness score:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Score saved." });
    });
};

export const getFinancialWellnessById = (req, res, next) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }
    model.getFinancialWellness(userId, (error, results) => {
        if (error) {
            console.error("Error fetching financial wellness score:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No score found for user" });
        }
        return res.status(200).json(results[0]);
    });
};