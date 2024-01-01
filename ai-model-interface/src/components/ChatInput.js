import React from 'react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, currentMessage, setCurrentMessage }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        className="chat-input"
        placeholder="Type a message..."
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className="send-button" onClick={onSendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
