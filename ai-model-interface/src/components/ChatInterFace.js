import React, { useState } from 'react';
import axios from 'axios';
import './ChatInterFace.css'; // Ensure you have this CSS file
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import SettingsModal from './SettingsModal';

const ChatInterface = () => {
  const [systemPrompt, setSystemPrompt] = useState('You are Dolphin, ');
  const [promptTemplate, setPromptTemplate] = useState('<|im_start|>system {system_prompt}<|im_end|> <|im_start|>user {prompt}<|im_end|> <|im_start|>assistant');
  const [maxNewTokens, setMaxNewTokens] = useState(-1);
  const [repeatPenalty, setRepeatPenalty] = useState(1.1);
  const [temperature, setTemperature] = useState(0.7);
  const [responses, setResponses] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const getConcatenatedResponses = () => {
    let concatenatedResponses = responses.map(response => `${response.role}: ${response.response}`).join('\n');
    concatenatedResponses += `\nuser: ${currentMessage}`;
    return concatenatedResponses;
  }

  const handleSendMessage = async () => {
    // First, add the user's message to the responses
    setResponses(responses => [...responses, { role: 'user', response: currentMessage }]);
    setCurrentMessage('');
    try {
      const response = await axios.post('/generate', {
        currentMessage: getConcatenatedResponses(),
        system_prompt: systemPrompt,
        prompt_template: promptTemplate,
        max_new_tokens: maxNewTokens,
        repeat_penalty: repeatPenalty,
        temperature
      }, {
        baseURL: 'https://expert-space-succotash-gjjjp999rr43pgxv-5000.app.github.dev/',
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*'}
      });
  
      // Then, add the assistant's response to the responses
      setResponses(responses => [...responses, { role: 'assistant', response: response.data }]);
    } catch (error) {
      console.error('Error generating response:', error);
    }
  
    // Clear the input after sending
    setCurrentMessage('');
  }
  

  const handleSettingsChange = (name, value) => {
    switch (name) {
      case 'system_prompt':
        setSystemPrompt(value);
        break;
      case 'prompt_template':
        setPromptTemplate(value);
        break;
      case 'max_new_tokens':
        setMaxNewTokens(Number(value));
        break;
      case 'repeat_penalty':
        setRepeatPenalty(Number(value));
        break;
      case 'temperature':
        setTemperature(Number(value));
        break;
      default:
        console.error('Invalid setting name:', name);
    }
  }


  return (
    <div className="container">
      <h1>AI Model Interaction</h1>
      <ChatMessages messages={responses} />
      <ChatInput
        onSendMessage={handleSendMessage}
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
      />
      <button onClick={() => setIsSettingsModalOpen(true)}>Settings</button>
      <SettingsModal
        isOpen={isSettingsModalOpen}
        settings={{
          system_prompt: systemPrompt,
          prompt_template: promptTemplate,
          max_new_tokens: maxNewTokens,
          repeat_penalty: repeatPenalty,
          temperature
        }}
        updateSettings={handleSettingsChange}
        closeModal={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
};     

export default ChatInterface;
