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