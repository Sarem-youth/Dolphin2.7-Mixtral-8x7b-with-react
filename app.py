from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os
import replicate

app = Flask(__name__)

# Enable CORS for specific origin
CORS(app, support_credentials=True)

# Set your API token as an environment variable
os.environ["REPLICATE_API_TOKEN"] = 'YOUR_API_TOKEN'
replicate.api_token = os.environ.get('REPLICATE_API_TOKEN')

@app.route('/generate', methods=['POST'])
@cross_origin(supports_credentials=True)
def generate():
    data = request.json
    currentMessage = data['currentMessage']
    system_prompt = data['system_prompt']
    prompt_template = data['prompt_template']
    max_new_tokens = data['max_new_tokens']
    repeat_penalty = data['repeat_penalty']
    temperature = data['temperature']

    # Call the Replicate API with the collected parameters
    output = replicate.run(
        "kcaverly/dolphin-2.7-mixtral-8x7b-gguf:1450546356d09a24302f96b3dacb301ca529f16254d3f413d630ac75ee11b1e2",
        input={
            "prompt": currentMessage,
            "system_prompt": system_prompt,
            "prompt_template": prompt_template,
            "max_new_tokens": max_new_tokens,
            "repeat_penalty": repeat_penalty,
            "temperature": temperature
        }
    )

    # Iterate over the generator to retrieve the output
    full_output = ''.join([item for item in output])

    # Return the generated text as a JSON response
    return jsonify(full_output)

if __name__ == '__main__':
    app.run(debug=True)
