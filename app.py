from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os
import requests

app = Flask(__name__)

# Enable CORS for specific origin
CORS(app, support_credentials=True)

# Set your Forefront API key as an environment variable
os.environ["FOREFRONT_API_KEY"] = 'sk-3F8hOidonfgjdBZ5eT8kBOccewlBndNc'

@app.route('/generate', methods=['POST'])
@cross_origin(supports_credentials=True)
def generate():
    data = request.json
    messages = data['messages']
    temperature = data['temperature']
    max_new_tokens = data['max_new_tokens']
    repeat_penalty = data.get('repeat_penalty', None)  # Optional parameter

    # Set up the headers with the Forefront API key
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {os.environ["FOREFRONT_API_KEY"]}'
    }

    # Forefront API URL
    url = "https://api.forefront.ai/v1/chat/completions"

    # Payload for the Forefront API
    payload = {
        "model": "forefront/dolphin-2.6-mistral-7b-dpo-chatml",  # Replace with the actual model string
        "messages": messages,
        "temperature": temperature,
        "max_new_tokens": max_new_tokens
    }

    # Include repeat_penalty in payload if provided
    if repeat_penalty is not None:
        payload['repeat_penalty'] = repeat_penalty

    # Make the POST request to the Forefront API
    response = requests.post(url, json=payload, headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        # Return the generated text as a JSON response
        return jsonify(response.json())
    else:
        # Handle errors
        return jsonify({"error": "Failed to generate text", "details": response.text}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
