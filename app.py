from flask import Flask, render_template, request, session
from dotenv import load_dotenv
import os
import google.generativeai as genai
import random


# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.urandom(24)  # Required for session handling

# Configure the Generative AI model using API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize chat history in session if it doesn't exist
def init_session():
    if 'history' not in session:
        session['history'] = []

# Define function to get Gemini response
def get_gemini_response(question, prompt):
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content([prompt[0], question])
    return response.text

# Define the initial prompt
prompt = [
    """You are Gem-EI, an expert in sentiment analysis. You have to understand the emotions of the person you are conversing with.
    The person might be feeling low and depressed; you have to encourage them and engage in positive conversations so that they feel better.
    Handle the user like a friend and always be there for them. Encourage positivity and give peaceful solutions.
    """
]

# Function to generate random pastel colors
def get_random_pastel_color():
    r = lambda: random.randint(128, 255)
    return f'rgb({r()},{r()},{r()})'

# Route for home page
@app.route("/", methods=["GET", "POST"])
def index():
    init_session()
    if request.method == "POST":
        question = request.form.get("message")
        if question:
            response = get_gemini_response(question, prompt)
            # Insert new conversation at the beginning of the chat history
            session['history'].insert(0, {
                "user": question,
                "gem": response,
                "user_color": get_random_pastel_color(),
                "gem_color": get_random_pastel_color(),
            })
            # Keep only the latest 10 messages
            session['history'] = session['history'][:10]

    return render_template("index.html", history=session.get("history", []))

# Register the jsonify routes Blueprint


# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
