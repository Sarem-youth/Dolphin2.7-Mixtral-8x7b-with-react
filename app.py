from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os
import requests

app = Flask(__name__)

# Enable CORS for specific origin
CORS(app)

# Set your Forefront API key as an environment variable
os.environ["FOREFRONT_API_KEY"] = 'Your_ForeFront_API_Key'

@app.route('/generate', methods=['POST'])
@cross_origin(supports_credentials=True)
def generate():
    try:
        data = request.json
        messages = data['currentMessage']
        temperature = data['temperature']
        max_tokens = data['max_new_tokens']  # Optional parameter

        # Set up the headers with the Forefront API key
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {os.environ["FOREFRONT_API_KEY"]}'
        }        

        # Payload for the Forefront API
        payload = {
            "model": "forefront/dolphin-2.6-mistral-7b-dpo-chatml",  # Replace with the actual model string
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature
        }

        # Forefront API URL
        url = "https://api.forefront.ai/v1/chat/completions"

        # Make the POST request to the Forefront API
        response = requests.post(url, json=payload, headers=headers)
        return response.json()
       
    except Exception as e:
        app.logger.error(f"Error in /generate: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
