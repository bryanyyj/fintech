// controllers/decisionController.js
import axios from 'axios';

export const analyzeDecision = async (req, res) => {
  const { decision_text, income, monthly_spent, categories } = req.body;

  try {
    const response = await axios.post('http://localhost:8000/score-decision', {
      decision_text,
      income,
      monthly_spent,
      categories
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error contacting FastAPI:", error.message);
    res.status(500).json({ error: "Failed to analyze decision" });
  }
};