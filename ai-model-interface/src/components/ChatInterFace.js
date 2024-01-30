import React, { useState } from 'react';
import axios from 'axios';
import './ChatInterFace.css'; // Ensure you have this CSS file
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import SettingsModal from './SettingsModal';

const ChatInterface = () => {
  const [systemPrompt, setSystemPrompt] = useState('You are Dolphin, ');
  const [maxNewTokens, setMaxNewTokens] = useState(320);
  const [temperature, setTemperature] = useState(0.7);
  const [responses, setResponses] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const getConcatenatedResponses = () => {
    let concatenatedResponses = [
      {
        role: "system",
        content: systemPrompt
      },
      ...responses.map(response => ({
        role: response.role,
        content: response.response
      })),
      {
        role: "user",
        content: currentMessage
      }
    ];
    return concatenatedResponses;
  }

  const handleSendMessage = async () => {
    // First, add the user's message to the responses
    setResponses(responses => [...responses, { role: 'user', response: currentMessage }]);
    setCurrentMessage('');
    try {
      const response = await axios.post('/generate', {
        currentMessage: getConcatenatedResponses(),
        max_new_tokens: maxNewTokens,
        temperature
      }, {
        baseURL: 'http://localhost:5000',
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
  
      // Then, add the assistant's response to the responses
      if (response.data.choices && response.data.choices.length > 0) {
        setResponses(responses => [...responses, { role: 'assistant', response: response.data.choices[0].message.content }]);
      }
    } catch (error) {
      // console.error('Error generating response:', error);
    }
  
    // Clear the input after sending
    setCurrentMessage('');
  }
  

  const handleSettingsChange = (name, value) => {
    switch (name) {
      case 'system_prompt':
        setSystemPrompt(value);
        break;
      case 'max_new_tokens':
        setMaxNewTokens(Number(value));
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
          max_new_tokens: maxNewTokens,
          temperature
        }}
        updateSettings={handleSettingsChange}
        closeModal={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
};     

export default ChatInterface;
