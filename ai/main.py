from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ollama
from util import remove_think_tags
from typing import List, Optional
import re

MODEL = "deepseek-r1:latest"
SYSTEM_PROMPT = (
    "You are a professional wealth advisor and financial coach. "
    "Your mission is to help users make wise, responsible, and personalized financial decisions. "
    "Always consider the user's best interests, long-term financial health, and risk tolerance. "
    "For every question or scenario, provide:\n"
    "- A clear, concise assessment of the decision or situation.\n"
    "- A score from 1 to 10 (with 10 being the wisest financial choice), and explain your reasoning.\n"
    "- Actionable tips or alternatives, if appropriate.\n"
    "- Friendly, supportive, and non-judgmental language.\n"
    "If the user's input is unclear, ask clarifying questions before giving advice.\n"
    "ALWAYS keep your answer short, concise, and to the point. Do NOT write long paragraphs or lists.\n"
)
app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev only; restrict in prod!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class FinancialWellnessRequest(BaseModel):
    transactions: List[dict]
    mode: Optional[str] = "concise"  # 'concise' or 'detailed'
    profile: Optional[dict] = None

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    prompt = f"{SYSTEM_PROMPT}\nUser: {req.message}\nAdvisor:"
    result = ollama.generate(model=MODEL, prompt=prompt)
    response = result["response"]
    cleaned_response = remove_think_tags(response)
    return {"response": cleaned_response}

@app.post("/api/ai/financial-wellness")
async def financial_wellness_endpoint(req: FinancialWellnessRequest):
    import json

    profile_str = ""
    if req.profile:
        profile_fields = [
            'monthly_income', 'age_group', 'occupation', 'num_dependents',
            'rent_mortgage', 'utilities', 'insurance', 'loan_payments',
            'total_fixed', 'disposable_income',
            'rank_food', 'rank_transport', 'rank_entertainment', 'rank_shopping', 'rank_travel', 'rank_health', 'rank_education',
            'goal_type', 'target_amount', 'timeline_months', 'risk_tolerance', 'current_savings'
        ]
        summary = {k: v for k, v in req.profile.items() if k in profile_fields}
        profile_str = f"User Profile: {summary}\n"

    # Concise prompt
    concise_prompt = (
        "You are a financial wellness AI. Given the user's transaction history and profile below, "
        "analyze their financial wellness and return a JSON with a 'score' (0-100) and a short 'feedback' string. "
        "Be concise and supportive.\n"
        f"{profile_str}Transactions: {req.transactions}\n"
        "Respond ONLY with a JSON object like: {\"score\": 78, \"feedback\": \"Your finances are improving!\"}"
    )
    concise_result = ollama.generate(model=MODEL, prompt=concise_prompt)
    concise_response = concise_result["response"]
    try:
        match = re.search(r'\{.*\}', concise_response, re.DOTALL)
        if match:
            concise_data = json.loads(match.group(0))
            score = concise_data.get("score")
            concise_feedback = concise_data.get("feedback")
        else:
            score = None
            concise_feedback = "AI did not return a valid score."
    except Exception:
        score = None
        concise_feedback = "AI could not process your data."

    # Detailed prompt
    detailed_prompt = (
        "You are a financial wellness AI. Given the user's transaction history and profile below, "
        "analyze their financial wellness and return a JSON with a 'score' (0-100) and a 'feedback' string. "
        "The feedback should be DETAILED and THOROUGH. Include:\n"
        "- Observations about spending and saving habits\n"
        "- Notable trends or changes in financial behavior\n"
        "- Any risks, red flags, or opportunities you notice\n"
        "- Actionable, specific advice for improvement\n"
        "- Encouragement and next steps\n"
        "Be friendly, supportive, and non-judgmental, but provide as much useful information as possible.\n"   
        "Analyze the following transactions and profile and provide a detailed financial wellness feedback. "
        "Keep your response concise—no more than 5-7 sentences or about 500 words. "
        "Avoid excessive detail, and focus on the most important insights and actionable advice.\n\n"
        f"{profile_str}Transactions: {req.transactions}\n"
        "Respond ONLY with a JSON object like: {\"score\": 78, \"feedback\": \"[detailed review here]\"}"
    )
    detailed_result = ollama.generate(model=MODEL, prompt=detailed_prompt)
    detailed_response = detailed_result["response"]
    try:
        match = re.search(r'\{.*\}', detailed_response, re.DOTALL)
        if match:
            detailed_data = json.loads(match.group(0))
            detailed_feedback = detailed_data.get("feedback")
            # If detailed_feedback is empty or None, fallback
            if not detailed_feedback:
                detailed_feedback = concise_feedback
    except Exception:
        detailed_feedback = concise_feedback

    return {
        "score": score,
        "concise": concise_feedback,
        "detailed": detailed_feedback
    }