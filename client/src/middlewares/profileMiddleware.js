export const profile = (req, res, next) => {
  try {
    const form = req.body;

    // Ensure required fields are present
    if (!form || Object.keys(form).length === 0) {
      return res.status(400).json({ error: "Missing form data" });
    }

    const total_fixed = 
      parseFloat(form.rent || 0) +
      parseFloat(form.utilities || 0) +
      parseFloat(form.insurance || 0) +
      parseFloat(form.loan || 0) +
      parseFloat(form.otherFixed || 0);

    const disposable_income = parseFloat(form.income || 0) - total_fixed;

    // Rank priorities
    const ranking = {};
    (form.spendingPriorities || []).forEach((item, idx) => {
      const rank = idx + 1;
      if (item.includes('Food')) ranking.rank_food = rank;
      else if (item.includes('Transport')) ranking.rank_transport = rank;
      else if (item.includes('Entertainment')) ranking.rank_entertainment = rank;
      else if (item.includes('Shopping')) ranking.rank_shopping = rank;
      else if (item.includes('Travel')) ranking.rank_travel = rank;
      else if (item.includes('Health')) ranking.rank_health = rank;
      else if (item.includes('Education')) ranking.rank_education = rank;
    });

    const profileData = {
      user_id: form.user_id,
      monthly_income: form.income,
      age_group: form.age,
      occupation: form.occupation,
      num_dependents: form.dependents,
      city: form.location,

      rent_mortgage: form.rent,
      utilities: form.utilities,
      insurance: form.insurance,
      loan_payments: form.loan,
      other_fixed: form.otherFixed,
      total_fixed,
      disposable_income,

      spend_food: form.food,
      spend_transport: form.transport,
      spend_entertainment: form.entertainment,
      spend_shopping: form.shopping,
      spend_travel: form.travel,
      spend_health: form.health,
      spend_education: form.education,

      ...ranking,

      goal_type: form.goal,
      target_amount: form.goalAmount,
      timeline_months: form.timeline,
      risk_tolerance: form.risk,
      current_savings: form.savings
    };

    res.locals.profileData = profileData;
    next();
  } catch (err) {
    console.error('❌ Error in profile middleware:', err);
    res.status(500).json({ error: 'Failed to process profile data' });
  }
};