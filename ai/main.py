import ollama
from util import remove_think_tags


MODEL = "deepseek-r1:latest"
PROMPT = "Hello! Tell me about yourself."


# Generate it in one shot.
result = ollama.generate(model=MODEL, prompt=PROMPT)
response = result["response"]

cleaned_response = remove_think_tags(response)
print(cleaned_response)