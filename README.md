# AI Model Interface

This project is a user-friendly interface for interacting with AI models. It uses the Replicate API to communicate with the models.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Python 3.7 or higher
- Node.js 12.0 or higher
- NPM 6.0 or higher

### Installation

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Set your Replicate API token as an environment variable in the [`app.py`](app.py) file. Replace `'YOUR_API_TOKEN'` with your actual Replicate API token.
5. Navigate to the [`ai-model-interface`](ai-model-interface) directory.
6. Install the required Node.js dependencies by running `npm install`.

### Running the Application

1. Start the Python server by running `python app.py` in the root directory.
2. In a new terminal window, navigate to the [`ai-model-interface`](ai-model-interface) directory and start the React application by running `npm start`.
3. Open your web browser and navigate to `http://localhost:3000` to interact with the AI model interface.

## Testing

To run the tests for the React application, navigate to the [`ai-model-interface`](ai-model-interface) directory and run `npm test`.

## Project Structure

The project has the following structure:
ai-model-interface/
├── .gitignore
├── package.json
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── components/
│   │   ├── ChatInput.css
│   │   ├── ChatInput.js
│   │   ├── ChatInterFace.css
│   │   ├── ChatInterFace.js
│   │   ├── ChatMessages.css
│   │   ├── ChatMessages.js
│   │   ├── SettingsModal.css
│   │   └── SettingsModal.js
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   └── setupTests.js
└── app.py

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
