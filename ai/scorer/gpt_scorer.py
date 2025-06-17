# ai/scorer/gpt_scorer.py

import os
from openai import OpenAI
from dotenv import load_dotenv

# Load .env from the parent folder of scorer/
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(os.path.dirname(BASE_DIR), ".env")
load_dotenv(dotenv_path=ENV_PATH)

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("❌ OPENAI_API_KEY not set in environment!")

print("✅ Loaded OPENAI_API_KEY from .env")

client = OpenAI(api_key=api_key)

async def get_decision_score(text: str, monthly_spent: float, income: float, categories: dict = None):
    # Score heuristics for fallback or LLM guidance
    savings_rate = max(0, income - monthly_spent) / income if income > 0 else 0
    high_spend_flag = monthly_spent / income > 0.9
    risky_categories = [k for k, v in (categories or {}).items() if v > 0.3 * income]

    # Compose prompt with injected user context
    prompt = f"""
    You are an intelligent financial advisor who gives users feedback on the financial wisdom of their decisions.

    User's decision:
    "{text}"

    Context:
    - Monthly Income: ${income}
    - Monthly Spending: ${monthly_spent}
    - Spending by Category: {categories if categories else "Not provided"}
    - Savings rate: {round(savings_rate * 100, 2)}%
    - Flags: {'High spending alert' if high_spend_flag else 'Spending within safe range'}

    Analyze this information to decide:
    - Is the decision wise given the user's current financial behavior?
    - What are the risks or better alternatives?

    Respond in JSON format:
    {{
        "score": integer (1–10),
        "reason": string,
        "tip": string
    }}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # upgraded model for better reasoning and language
            messages=[
                {"role": "system", "content": "You are a helpful financial advisor AI."},
                {"role": "user", "content": prompt}
            ]
        )
        return eval(response.choices[0].message.content.strip())
    except Exception as e:
        return {
            "error": str(e),
            "fallback_score": 3 if high_spend_flag else 7,
            "fallback_tip": "Try to lower expenses before making new purchases."
        }

##test