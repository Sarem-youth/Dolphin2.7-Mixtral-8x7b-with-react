import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatMessages.css';

const ChatMessages = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-messages">
      {messages.map((entry, index) => (
        <div key={index} className={`message ${entry.role}`}>
          <div className="message-content">
            <ReactMarkdown>{entry.response}</ReactMarkdown>
          </div>
        </div>
      ))}
      {isLoading && <p className="loading-text"></p>}
      <div ref={messagesEndRef} />
    </div>
  );
};
export default ChatMessages;