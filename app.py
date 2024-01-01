from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os
import replicate

app = Flask(__name__)

# Enable CORS for specific origin
CORS(app, support_credentials=True)

# Set your API token as an environment variable
os.environ["REPLICATE_API_TOKEN"] = 'r8_cFA3isLlz9R8rJmL9xbdLgZ3vTeeYeG4Mf6ND'
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
        "kcaverly/dolphin-2.6-mistral-7b-gguf:cea782d4397606ce22b6b82ad9743a839d77b28a453c4e7e561d1f03cfc3dbe7",
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
